const CALC = "https://tininja.net/minha-hora/";
const SHEET = "https://docs.google.com/spreadsheets/d/1T56l2xeBYylC_3cJQ-Hs3r6veyafsEjzD5A6wfoIFFw/copy";
const PLACEHOLDER = "[LINK DA PLANILHA]";

/**
 * Tira notas de produção e troca só o placeholder da planilha.
 * O resto do texto do autor permanece.
 */
export function prepareEbookMarkdown(source) {
  let text = String(source).replace(/\r\n/g, "\n");
  const notesAt = text.indexOf("> **Notas de produção");
  const afterNotes = notesAt === -1 ? -1 : text.indexOf("\n---\n", notesAt);
  if (notesAt === -1 || afterNotes === -1) {
    throw new Error("Bloco de notas de produção não encontrado.");
  }
  text = text.slice(0, notesAt) + text.slice(afterNotes + "\n---\n".length);

  const fillAt = text.indexOf("\n## O que o Eduardo precisa preencher");
  if (fillAt === -1) throw new Error("Seção de pendências não encontrada.");
  text = text.slice(0, fillAt).replace(/\n---\n---\s*$/g, "\n");

  if (!text.includes(PLACEHOLDER)) throw new Error("Placeholder da planilha não encontrado.");
  text = text.replace(
    PLACEHOLDER,
    `[${CALC}](${CALC}) (a cópia no Google Sheets: [${SHEET}](${SHEET}))`,
  );

  text = text.replace(
    /^# Quanto cobrar TI 2026\n## O método pra chegar no seu preço, do custo da hora até a proposta de uma página\n\n\*Eduardo Honorato · TI Ninja\*\n+/,
    "",
  );

  if (
    text.includes("Notas de produção")
    || text.includes("O que o Eduardo precisa preencher")
    || text.includes(PLACEHOLDER)
  ) {
    throw new Error("O texto do PDF ainda tem nota de produção ou o placeholder.");
  }
  if (!text.includes(CALC) || !text.includes(SHEET)) {
    throw new Error("Os dois links do guia não entraram no texto.");
  }
  return `${text.trim()}\n`;
}

export const ebookLinks = { calc: CALC, sheet: SHEET };
