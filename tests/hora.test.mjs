import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { computeHour, parsePt, readUtms, LEAD_ENDPOINT, buildLeadParams, pickVariant, applyVariant, AB_KEY } from "../assets/js/site.js";
import { prepareEbookMarkdown } from "../scripts/ebook-text.mjs";
import { FUNDADORA_COPY } from "../fundadora/copy.js";

test("exemplo fictício do guia: CF 1000, R 5000, H 80, I 10, M 10", () => {
  const result = computeHour({ cf: 1000, r: 5000, h: 80, i: 10, m: 10 });
  assert.equal(result.ok, true);
  assert.equal(result.custo, 75);
  assert.equal(result.preco, 93.75);
  assert.equal(result.faturamento, 7500);
  assert.equal(result.impostos, 750);
  assert.equal(result.margem, 750);
  assert.equal(result.cobertura, 6000);
});

test("a soma pode estar toda em CF", () => {
  const result = computeHour({ cf: 8000, r: 0, h: 160, i: 15, m: 5 });
  assert.equal(result.custo, 50);
  assert.equal(result.preco, 62.5);
});

test("rejeita hora zero e percentual que estoura", () => {
  assert.equal(computeHour({ cf: 1, r: 1, h: 0, i: 10, m: 10 }).error, "horas");
  assert.equal(computeHour({ cf: 1, r: 1, h: 10, i: 60, m: 40 }).error, "percentual");
  assert.equal(computeHour({ cf: 1, r: 1, h: 10, i: 100, m: 0 }).error, "percentual");
});

test("leitura pt-BR", () => {
  assert.equal(parsePt("3.000,00"), 3000);
  assert.equal(parsePt("8.000"), 8000);
  assert.equal(parsePt("10,5"), 10.5);
  assert.equal(parsePt("1.500"), 1500);
  assert.equal(parsePt("1.5"), 1.5);
  assert.equal(parsePt("R$ 62,50"), 62.5);
  assert.ok(Number.isNaN(parsePt("")));
  assert.ok(Number.isNaN(parsePt("abc")));
});

test("whatsapp só entra com optin e optin_whatsapp", () => {
  const entries = [
    ["nome", "Ana"],
    ["email", "ana@exemplo.com"],
    ["whatsapp", "11999998888"],
    ["optin", "sim"],
    ["utm_source", "instagram"],
    ["website", ""],
  ];
  const both = buildLeadParams(entries, { optin: true, optinWhatsapp: true });
  assert.equal(both.get("whatsapp"), "11999998888");
  assert.equal(both.get("email"), "ana@exemplo.com");
  assert.equal(both.get("utm_source"), "instagram");
  const emailOnly = buildLeadParams(entries, { optin: true, optinWhatsapp: false });
  assert.equal(emailOnly.has("whatsapp"), false);
  assert.equal(emailOnly.get("optin"), "sim");
  const neither = buildLeadParams(entries, { optin: false, optinWhatsapp: true });
  assert.equal(neither.has("whatsapp"), false);
  const blank = buildLeadParams([["whatsapp", "   "]], { optin: true, optinWhatsapp: true });
  assert.equal(blank.has("whatsapp"), false);
});

test("lista de espera manda o número só com optin_whatsapp e separa os campos", () => {
  const entries = [
    ["nome", "Ana"],
    ["email", "ana@exemplo.com"],
    ["whatsapp", "11999998888"],
    ["fundadora_espera", "sim"],
    ["utm_source", "instagram"],
    ["utm_medium", "bio"],
    ["utm_campaign", "fundadora"],
    ["utm_content", "story"],
    ["website", ""],
  ];
  const soWhatsapp = buildLeadParams(entries, { optin: false, optinWhatsapp: true, whatsappNeedsOptin: false });
  assert.equal(soWhatsapp.get("whatsapp"), "11999998888");
  assert.equal(soWhatsapp.get("fundadora_espera"), "sim");
  assert.equal(soWhatsapp.has("optin"), false);
  assert.equal(soWhatsapp.get("utm_campaign"), "fundadora");
  const semCaixa = buildLeadParams(entries, { optin: false, optinWhatsapp: false, whatsappNeedsOptin: false });
  assert.equal(semCaixa.has("whatsapp"), false);
  assert.equal(semCaixa.get("email"), "ana@exemplo.com");
  assert.equal(semCaixa.get("fundadora_espera"), "sim");
});

test("textos da Turma Fundadora saem do bloco único", () => {
  const pagina = readFileSync(new URL("../fundadora/index.html", import.meta.url), "utf8");
  const obrigado = readFileSync(new URL("../fundadora/obrigado/index.html", import.meta.url), "utf8");
  for (const text of [FUNDADORA_COPY.tag, FUNDADORA_COPY.headline, FUNDADORA_COPY.subhead, FUNDADORA_COPY.line, FUNDADORA_COPY.aboveButton, FUNDADORA_COPY.smallPrint, FUNDADORA_COPY.submit]) {
    assert.equal(pagina.includes(text), true, text);
  }
  assert.equal(pagina.includes('name="fundadora_espera" value="sim"'), true);
  assert.equal(pagina.includes('name="tag"'), false);
  assert.equal(pagina.includes("R$ 97"), false);
  assert.equal(pagina.includes("cupom"), false);
  assert.equal(obrigado.includes(FUNDADORA_COPY.thanksTitle), true);
  assert.equal(obrigado.includes(FUNDADORA_COPY.thanksBody), true);
  assert.equal(obrigado.includes(FUNDADORA_COPY.thanksNote), true);
  assert.equal(obrigado.includes('content="noindex, nofollow"'), true);
});

test("UTMs da landing e endpoint do Apps Script", () => {
  assert.equal(
    LEAD_ENDPOINT,
    "https://script.google.com/macros/s/AKfycbwOkdrVslLmQnNrqWqHSnyYxSZsDGhCeW2IMaAEdvDmyCx8_2nDo9YHRCIztUZUyRM/exec",
  );
  const utm = readUtms("?utm_source=instagram&utm_medium=reel&utm_campaign=dhcp&utm_content=169&utm_term=ignora");
  assert.deepEqual(utm, {
    utm_source: "instagram",
    utm_medium: "reel",
    utm_campaign: "dhcp",
    utm_content: "169",
  });
  assert.equal(readUtms("").utm_source, "");
});

test("PDF do guia troca só o link da planilha", () => {
  const raw = readFileSync(new URL("../ebook-src/quanto-cobrar-ti-2026.md", import.meta.url), "utf8");
  const text = prepareEbookMarkdown(raw);
  assert.equal(text.includes("Notas de produção"), false);
  assert.equal(text.includes("O que o Eduardo precisa preencher"), false);
  assert.equal(text.includes("[LINK DA PLANILHA]"), false);
  assert.equal(text.includes("https://tininja.net/minha-hora/"), true);
  assert.equal(text.includes("https://docs.google.com/spreadsheets/d/1T56l2xeBYylC_3cJQ-Hs3r6veyafsEjzD5A6wfoIFFw/copy"), true);
  assert.equal(text.includes("eu travei"), true);
  assert.equal(text.includes("EXEMPLO FICTÍCIO"), true);
});

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return { data, getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = String(v); } };
}

test("A/B do H1: o sorteio respeita o valor guardado", () => {
  assert.equal(AB_KEY, "tininja_ab_h1");
  assert.equal(pickVariant(fakeStorage({ tininja_ab_h1: "B" }), () => 0), "B");
  assert.equal(pickVariant(fakeStorage({ tininja_ab_h1: "A" }), () => 0.99), "A");
  const novo = fakeStorage();
  assert.equal(pickVariant(novo, () => 0.2), "A");
  assert.equal(novo.data.tininja_ab_h1, "A");
  assert.equal(pickVariant(novo, () => 0.9), "A");
  const outro = fakeStorage();
  assert.equal(pickVariant(outro, () => 0.5), "B");
  assert.equal(outro.data.tininja_ab_h1, "B");
  assert.equal(pickVariant(fakeStorage({ tininja_ab_h1: "lixo" }), () => 0.9), "B");
});

test("A/B do H1: sem storage ou com storage que falha, sorteia sem guardar", () => {
  assert.equal(pickVariant(null, () => 0.9), "B");
  const quebrado = { getItem() { throw new Error("bloqueado"); }, setItem() { throw new Error("bloqueado"); } };
  assert.equal(pickVariant(quebrado, () => 0.1), "A");
  assert.equal(pickVariant(quebrado, () => 0.7), "B");
});

test("A/B do H1: só a variante B troca o texto", () => {
  const mk = () => {
    const h1 = { text: "A", getAttribute: (n) => (n === "data-b" ? "B texto" : null), set textContent(v) { this.text = v; } };
    return { h1, doc: { querySelector: () => h1 } };
  };
  const a = mk();
  applyVariant(a.doc, "A");
  assert.equal(a.h1.text, "A");
  const b = mk();
  applyVariant(b.doc, "B");
  assert.equal(b.h1.text, "B texto");
  assert.equal(applyVariant({ querySelector: () => null }, "B"), null);
});

test("A/B do H1: o POST leva variante e as regras de optin não mudam", () => {
  const entries = [["nome", "Ana"], ["email", "ana@exemplo.com"], ["whatsapp", "11999998888"], ["optin", "sim"]];
  assert.equal(buildLeadParams(entries, { optin: true, optinWhatsapp: true, variante: "B" }).get("variante"), "B");
  assert.equal(buildLeadParams(entries, { optin: true, optinWhatsapp: true, variante: "A" }).get("variante"), "A");
  assert.equal(buildLeadParams(entries, { optin: true, optinWhatsapp: true }).has("variante"), false);
  assert.equal(buildLeadParams(entries, { optin: true, optinWhatsapp: true, variante: "x" }).has("variante"), false);
  const soEmail = buildLeadParams(entries, { optin: true, optinWhatsapp: false, variante: "B" });
  assert.equal(soEmail.has("whatsapp"), false);
  assert.equal(soEmail.get("variante"), "B");
  const semOptin = buildLeadParams(entries, { optin: false, optinWhatsapp: true, variante: "B" });
  assert.equal(semOptin.has("whatsapp"), false);
  const comWhats = buildLeadParams(entries, { optin: true, optinWhatsapp: true, variante: "B" });
  assert.equal(comWhats.get("whatsapp"), "11999998888");
  assert.equal(comWhats.get("email"), "ana@exemplo.com");
});

test("página de captura marca o H1 com A no HTML e B em data-b", () => {
  const html = readFileSync(new URL("../quanto-cobrar/index.html", import.meta.url), "utf8");
  assert.equal(html.includes('data-ab="h1"'), true);
  assert.equal(html.includes("Você resolve o DHCP, o DNS e o gateway do cliente... e cobra quanto por isso?</h1>"), true);
  assert.equal(html.includes('data-b="Resolver o DHCP, o DNS e o gateway do cliente vale dinheiro. Só falta a conta."'), true);
});
