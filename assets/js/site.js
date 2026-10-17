/**
 * Conta da hora técnica.
 * custo = (CF + R) / H
 * preço mínimo = custo / (1 − I − M), com I e M em fração (o campo é %).
 */

export function parsePt(raw) {
  if (raw == null) return Number.NaN;
  let s = String(raw).trim().replace(/\s/g, "").replace(/r\$/gi, "");
  if (!s) return Number.NaN;
  if (s.includes(",")) {
    s = s.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
    s = s.replace(/\./g, "");
  }
  if (!/^-?\d+(\.\d+)?$/.test(s)) return Number.NaN;
  return Number(s);
}

function cents(n) {
  return Math.round(n * 100) / 100;
}

export function computeHour({ cf, r, h, i, m }) {
  const values = [cf, r, h, i, m];
  if (values.some((n) => !Number.isFinite(n))) {
    return { ok: false, error: "vazio" };
  }
  if (cf < 0 || r < 0 || i < 0 || m < 0) {
    return { ok: false, error: "negativo" };
  }
  if (!(h > 0)) {
    return { ok: false, error: "horas" };
  }
  if (i + m >= 100) {
    return { ok: false, error: "percentual" };
  }
  const custo = cents((cf + r) / h);
  const preco = cents(custo / (1 - (i + m) / 100));
  const faturamento = cents(preco * h);
  const impostos = cents(faturamento * (i / 100));
  const margem = cents(faturamento * (m / 100));
  const cobertura = cents(cf + r);
  return { ok: true, custo, preco, faturamento, impostos, margem, cobertura, i, m };
}

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const plain2 = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const plainFlex = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

function formatMoney(n) {
  return money.format(n);
}

const ERRORS = {
  vazio: "Preencha os cinco campos. Onde não houver valor, use zero.",
  negativo: "Não use número negativo. Custo, retirada, imposto e margem entram como zero ou mais.",
  horas: "Horas faturáveis precisam ser maiores que zero. Coloque as horas que você consegue cobrar no mês.",
  percentual: "Imposto mais margem precisa ficar abaixo de 100%. Baixe um dos dois para sobrar preço.",
};

function field(form, name) {
  return form.elements.namedItem(name);
}

function read(form) {
  return {
    cf: parsePt(field(form, "cf").value),
    r: parsePt(field(form, "r").value),
    h: parsePt(field(form, "h").value),
    i: parsePt(field(form, "i").value),
    m: parsePt(field(form, "m").value),
  };
}

function setText(form, key, value) {
  form.querySelectorAll(`[data-out="${key}"]`).forEach((node) => {
    node.textContent = value;
  });
}

function renderBar(form, result) {
  const bar = form.querySelector("[data-bar]");
  if (!bar) return;
  const custo = result.ok ? 100 - result.i - result.m : 0;
  const imposto = result.ok ? result.i : 0;
  const margem = result.ok ? result.m : 0;
  bar.hidden = !result.ok;
  bar.style.setProperty("--fatia-custo", `${custo}%`);
  bar.style.setProperty("--fatia-imposto", `${imposto}%`);
  bar.style.setProperty("--fatia-margem", `${margem}%`);
  bar.setAttribute(
    "aria-label",
    result.ok
      ? `Divisão do preço mínimo: ${plainFlex.format(custo)}% cobre custo e retirada, ${plainFlex.format(imposto)}% é imposto, ${plainFlex.format(margem)}% é margem.`
      : "Sem divisão enquanto a conta estiver inválida."
  );
}

function summary(input, result) {
  return [
    "Quanto vale a sua hora — TI Ninja",
    "",
    `Custo da hora: ${formatMoney(result.custo)}`,
    `Preço mínimo da hora: ${formatMoney(result.preco)}`,
    "",
    "No mês, com essas horas:",
    `Faturamento mínimo: ${formatMoney(result.faturamento)}`,
    `Impostos: ${formatMoney(result.impostos)}`,
    `Margem: ${formatMoney(result.margem)}`,
    `Cobre custos e retirada: ${formatMoney(result.cobertura)}`,
    "",
    `Entradas: CF ${formatMoney(input.cf)}, R ${formatMoney(input.r)}, H ${plainFlex.format(input.h)} h, impostos ${plainFlex.format(input.i)}%, margem ${plainFlex.format(input.m)}%.`,
    "",
    "https://tininja.net/minha-hora/",
  ].join("\n");
}

function mountCalc(form) {
  const error = form.querySelector("[data-error]");
  const copyBtn = form.querySelector("[data-copy]");
  const shareBtn = form.querySelector("[data-share]");
  const status = form.querySelector("[data-status]");
  const price = form.querySelector('[data-out="preco"]');
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;
  let lastPrice = price ? price.textContent : "";
  let first = true;

  const paint = () => {
    const input = read(form);
    const result = computeHour(input);
    const names = ["cf", "r", "h", "i", "m"];
    names.forEach((name) => field(form, name).removeAttribute("aria-invalid"));
    if (!result.ok) {
      if (result.error === "horas") field(form, "h").setAttribute("aria-invalid", "true");
      if (result.error === "percentual") {
        field(form, "i").setAttribute("aria-invalid", "true");
        field(form, "m").setAttribute("aria-invalid", "true");
      }
      if (result.error === "vazio" || result.error === "negativo") {
        names.forEach((name) => {
          const n = input[name];
          if (!Number.isFinite(n) || n < 0) field(form, name).setAttribute("aria-invalid", "true");
        });
      }
      error.hidden = false;
      error.textContent = ERRORS[result.error];
      setText(form, "preco", "—");
      setText(form, "custo", "—");
      setText(form, "faturamento", "—");
      setText(form, "impostos", "—");
      setText(form, "margem-mes", "—");
      setText(form, "cobertura", "—");
      renderBar(form, result);
      if (copyBtn) copyBtn.disabled = true;
      if (shareBtn) shareBtn.disabled = true;
      return;
    }
    error.hidden = true;
    error.textContent = "";
    const precoTxt = formatMoney(result.preco);
    setText(form, "custo", formatMoney(result.custo));
    setText(form, "preco", precoTxt);
    setText(form, "faturamento", formatMoney(result.faturamento));
    setText(form, "impostos", formatMoney(result.impostos));
    setText(form, "margem-mes", formatMoney(result.margem));
    setText(form, "cobertura", formatMoney(result.cobertura));
    renderBar(form, result);
    if (copyBtn) copyBtn.disabled = false;
    if (shareBtn) shareBtn.disabled = false;
    if (!first && motion && price && precoTxt !== lastPrice) {
      price.classList.remove("assenta");
      void price.offsetWidth;
      price.classList.add("assenta");
    }
    lastPrice = precoTxt;
    first = false;
    form._hora = { input, result };
  };

  form.addEventListener("input", paint);
  form.addEventListener("submit", (event) => event.preventDefault());
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", () => {
      const n = parsePt(input.value);
      if (!Number.isFinite(n)) return;
      if (input.dataset.kind === "money") input.value = plain2.format(n);
      else input.value = plainFlex.format(n);
      paint();
    });
  });

  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      if (!form._hora) return;
      const text = summary(form._hora.input, form._hora.result);
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = "Resultado copiado.";
      } catch {
        status.textContent = "Não deu para copiar daqui. Selecione o preço e copie manualmente.";
      }
    });
  }

  if (shareBtn && navigator.share) {
    shareBtn.hidden = false;
    shareBtn.addEventListener("click", async () => {
      if (!form._hora) return;
      const text = summary(form._hora.input, form._hora.result);
      try {
        await navigator.share({ title: "Quanto vale a sua hora", text, url: "https://tininja.net/minha-hora/" });
      } catch (err) {
        if (err && err.name === "AbortError") return;
        status.textContent = "Não deu para abrir o compartilhamento. Use copiar resultado.";
      }
    });
  }

  const dock = form.querySelector(".dock");
  const priceEl = form.querySelector(".preco-valor");
  if (dock && priceEl) {
    const mq = window.matchMedia("(max-width: 899px)");
    const placeDock = () => {
      const rect = priceEl.getBoundingClientRect();
      // Only after the big figure has left upward. While it is still
      // below the fold, the rail would cover the formula note.
      const passed = rect.bottom < 0;
      dock.classList.toggle("ativo", mq.matches && passed);
    };
    placeDock();
    window.addEventListener("scroll", placeDock, { passive: true });
    mq.addEventListener("change", placeDock);
  }

  paint();
}

function mountAviso(doc) {
  const form = doc.querySelector("[data-aviso]");
  if (!form) return;
  const status = form.querySelector("[data-aviso-status]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = form.email.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      form.email.setAttribute("aria-invalid", "true");
      status.textContent = "Escreva um e-mail válido. Nada foi enviado.";
      form.email.focus();
      return;
    }
    form.email.removeAttribute("aria-invalid");
    status.textContent = "Nada foi enviado. A lista ainda não está ligada, e este e-mail não saiu do seu navegador.";
  });
}

export function mount(doc = document) {
  doc.querySelectorAll("[data-calc]").forEach(mountCalc);
  mountAviso(doc);
}

if (typeof document !== "undefined") {
  mount(document);
}
