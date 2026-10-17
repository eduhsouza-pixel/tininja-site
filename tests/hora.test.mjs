import assert from "node:assert/strict";
import test from "node:test";
import { computeHour, parsePt } from "../assets/js/site.js";

test("exemplo do brief: CF+R = 8000, H = 160, I+M = 20%", () => {
  const result = computeHour({ cf: 3000, r: 5000, h: 160, i: 10, m: 10 });
  assert.equal(result.ok, true);
  assert.equal(result.custo, 50);
  assert.equal(result.preco, 62.5);
  assert.equal(result.faturamento, 10000);
  assert.equal(result.impostos, 1000);
  assert.equal(result.margem, 1000);
  assert.equal(result.cobertura, 8000);
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
