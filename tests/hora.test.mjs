import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { computeHour, parsePt, readUtms, LEAD_ENDPOINT } from "../assets/js/site.js";
import { prepareEbookMarkdown } from "../scripts/ebook-text.mjs";

test("exemplo fictício do guia: CF 1000, R 3000, H 80, I 10, M 10", () => {
  const result = computeHour({ cf: 1000, r: 3000, h: 80, i: 10, m: 10 });
  assert.equal(result.ok, true);
  assert.equal(result.custo, 50);
  assert.equal(result.preco, 62.5);
  assert.equal(result.faturamento, 5000);
  assert.equal(result.impostos, 500);
  assert.equal(result.margem, 500);
  assert.equal(result.cobertura, 4000);
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
