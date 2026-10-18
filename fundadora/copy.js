/**
 * Único bloco de texto da Turma Fundadora. A Lightcopy troca só estas strings.
 * Fatos permitidos, e só estes:
 * - Fundamentos de Rede é o curso de entrada da TI Ninja.
 * - Turma Fundadora paga R$ 97 em vez de R$ 197.
 * - 30 vagas, por cupom.
 * - As vendas abrem na live de segunda 26/10 (G0) e vão até 02/11, 23:59.
 * - Se as 30 acabarem antes, a Fundadora fecha e o preço volta a R$ 197.
 * - A lista de espera abre em 18/10.
 */
export const FUNDADORA_COPY = {
  headline: "[LIGHTCOPY] Fundamentos de Rede — Turma Fundadora",
  subhead: "[LIGHTCOPY] Curso de entrada da TI Ninja. A lista de espera abre em 18/10.",
  bullets: [
    "[LIGHTCOPY] Turma Fundadora: R$ 97 em vez de R$ 197.",
    "[LIGHTCOPY] 30 vagas, por cupom.",
    "[LIGHTCOPY] Vendas abrem na live de segunda 26/10 (G0) e vão até 02/11, 23:59. Se as 30 acabarem antes, a Fundadora fecha e o preço volta a R$ 197.",
  ],
  smallPrint: "[LIGHTCOPY] Texto miúdo da oferta.",
  submit: "[LIGHTCOPY] Entrar na lista de espera",
  thanksTitle: "[LIGHTCOPY] Pedido de lista recebido",
  thanksBody: "[LIGHTCOPY] O aviso de abertura da Turma Fundadora chega no e-mail que você deixou.",
};

export function applyFundadoraCopy(doc = document) {
  const root = doc.querySelector("[data-fundadora-copy]");
  if (!root) return;
  const set = (key, value) => {
    const el = root.querySelector(`[data-copy="${key}"]`);
    if (el) el.textContent = value;
  };
  set("headline", FUNDADORA_COPY.headline);
  set("subhead", FUNDADORA_COPY.subhead);
  set("smallPrint", FUNDADORA_COPY.smallPrint);
  set("submit", FUNDADORA_COPY.submit);
  set("thanksTitle", FUNDADORA_COPY.thanksTitle);
  set("thanksBody", FUNDADORA_COPY.thanksBody);
  const list = root.querySelector('[data-copy="bullets"]');
  if (!list) return;
  list.replaceChildren(
    ...FUNDADORA_COPY.bullets.map((text) => {
      const li = doc.createElement("li");
      li.textContent = text;
      return li;
    }),
  );
}
