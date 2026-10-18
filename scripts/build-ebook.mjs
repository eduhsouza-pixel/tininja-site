import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { prepareEbookMarkdown } from "./ebook-text.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = resolve(root, "ebook-src/quanto-cobrar-ti-2026.md");
const pdfPath = resolve(root, "assets/ebook/quanto-cobrar-ti-2026.pdf");
const htmlPath = "/tmp/quanto-cobrar-ti-2026.html";
const chrome = "/usr/bin/google-chrome-stable";

const font = (file) => pathToFileURL(resolve(root, "assets/fonts", file)).href;
const logo = pathToFileURL(resolve(root, "brand/logo-color.png")).href;
// Ilustrações geradas pelo Codex (ebook-src/arte/*.png), exportadas em JPEG para o PDF não pesar.
const art = (name) => {
  const file = resolve(root, "ebook-src/arte", `${name}.jpg`);
  return existsSync(file) ? pathToFileURL(file).href : null;
};

const cap = (t) => t.charAt(0).toUpperCase() + t.slice(1);

const ARTE_DO_TITULO = [
  [/^Abertura/, "abertura"],
  [/^Capítulo (\d)/, (m) => `cap${m[1]}`],
];

/** "Capítulo 2: O custo da sua hora" → abertura de capítulo com arte, rótulo e título. */
function chapterOpeners(html) {
  return html.replace(/<h2>([\s\S]*?)<\/h2>/g, (whole, title) => {
    const plain = title.replace(/<[^>]+>/g, "");
    if (/^Antes de começar/.test(plain)) return `<h2 class="antes">${title}</h2>`;
    if (/^Fechando/.test(plain)) {
      const [, rest] = plain.split(/:\s*/, 2);
      return `<section class="abre fecho"><p class="rotulo">Fechando</p><h2>${cap(rest || plain)}</h2></section>`;
    }
    let name = null;
    for (const [re, value] of ARTE_DO_TITULO) {
      const m = plain.match(re);
      if (m) name = typeof value === "function" ? value(m) : value;
    }
    if (!name) return whole;
    const cut = plain.indexOf(":");
    const label = cut === -1 ? "" : plain.slice(0, cut);
    const heading = cap(cut === -1 ? plain : plain.slice(cut + 1).trim());
    const src = art(name);
    const figure = src ? `<figure class="arte"><img src="${src}" alt=""></figure>` : "";
    return `<section class="abre">${figure}<p class="rotulo">${label}</p><h2>${heading}</h2></section>`;
  });
}

/** Dá uma classe a cada tipo de caixa do texto, pelo conteúdo. */
function classifyBoxes(html) {
  return html
    .replace(/<blockquote>(\s*<h3>📦[\s\S]*?)<\/blockquote>/g, '<blockquote class="exemplo">$1</blockquote>')
    .replace(/<blockquote>(\s*<h3>PROPOSTA DE SERVIÇOS DE TI[\s\S]*?)<\/blockquote>/g, '<blockquote class="proposta">$1</blockquote>')
    .replace(/<blockquote>(\s*<p><strong>Este modelo é uma estrutura[\s\S]*?)<\/blockquote>/g, '<blockquote class="aviso">$1</blockquote>')
    .replace(/<blockquote>(\s*<p>“?"?[\s\S]*?\(comentário[\s\S]*?)<\/blockquote>/g, '<blockquote class="fala">$1</blockquote>')
    .replace(/<blockquote>(\s*<p>"Antes de falar[\s\S]*?)<\/blockquote>/g, '<blockquote class="script">$1</blockquote>')
    .replace(/<table>(\s*<thead>\s*<tr>\s*<th><\/th>\s*<th>Seu número<\/th>)/g, '<table class="planilha">$1')
    .replace(/<h3>📦\s*/g, "<h3>")
    // as linhas horizontais do Markdown eram só respiro entre seções; o layout novo já separa
    .replace(/<hr>\n?/g, "");
}

function tableOfContents(html) {
  const items = [];
  for (const m of html.matchAll(/<section class="abre(?: fecho)?">[\s\S]*?<p class="rotulo">([^<]*)<\/p><h2>([\s\S]*?)<\/h2>/g)) {
    items.push(`<li><span>${m[1]}</span>${m[2]}</li>`);
  }
  return `<nav class="sumario"><p class="rotulo">Neste guia</p><ol>${items.join("")}</ol></nav>`;
}

function printHtml(body) {
  const cover = art("capa");
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Quanto cobrar TI 2026</title>
  <style>
    @font-face { font-family: "Darker Grotesque"; src: url("${font("darker-grotesque-latin-800.woff2")}") format("woff2"); font-weight: 800; }
    @font-face { font-family: "Darker Grotesque"; src: url("${font("darker-grotesque-latin-700.woff2")}") format("woff2"); font-weight: 700; }
    @font-face { font-family: "Darker Grotesque"; src: url("${font("darker-grotesque-latin-500.woff2")}") format("woff2"); font-weight: 500; }
    @font-face { font-family: "Atkinson Hyperlegible"; src: url("${font("atkinson-hyperlegible-latin-400.woff2")}") format("woff2"); font-weight: 400; }
    @font-face { font-family: "Atkinson Hyperlegible"; src: url("${font("atkinson-hyperlegible-latin-700.woff2")}") format("woff2"); font-weight: 700; }
    :root {
      --night: #100e12; --purple: #44335c; --purple-deep: #2a1e3c; --jamb: #5c4a78;
      --lime: #92c417; --lime-ink: #5d7d0f; --paper: #f3f0e8; --paper-2: #e9e3d6; --ink: #1a1520; --dim: #5c4a78;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0; background: var(--paper); color: var(--ink);
      font-family: "Atkinson Hyperlegible", sans-serif; font-size: 11.2pt; line-height: 1.56;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
      hyphens: manual; orphans: 3; widows: 3;
    }
    @page {
      size: A4; margin: 17mm 18mm 19mm; background: var(--paper);
      @bottom-left { content: "Quanto cobrar TI 2026  ·  TI Ninja"; font-family: "Atkinson Hyperlegible", sans-serif; font-size: 8pt; color: #8a7da0; }
      @bottom-right { content: counter(page); font-family: "Darker Grotesque", sans-serif; font-size: 13pt; font-weight: 800; color: var(--purple); }
    }
    @page capa { margin: 0; background: var(--night); @bottom-left { content: none; } @bottom-right { content: none; } }
    @page escura { margin: 0; background: var(--night); @bottom-left { content: none; } @bottom-right { content: none; } }

    /* capa */
    .cover {
      page: capa; break-after: page; position: relative; height: 297mm; overflow: hidden;
      background: var(--night) ${cover ? `url("${cover}") center bottom / cover no-repeat` : ""};
      color: var(--paper);
    }
    .cover::after {
      content: ""; position: absolute; inset: 0;
      background: linear-gradient(180deg, rgba(16,14,18,0.92) 0%, rgba(16,14,18,0.55) 34%, rgba(16,14,18,0) 55%, rgba(16,14,18,0) 78%, rgba(16,14,18,0.85) 100%);
    }
    .cover-in { position: relative; z-index: 1; height: 100%; padding: 18mm 18mm 16mm; display: flex; flex-direction: column; }
    .cover .tubo { height: 4px; width: 46mm; background: var(--lime); margin-bottom: 8mm; }
    .cover .logo { width: 64mm; height: auto; }
    .cover h1 {
      margin: 14mm 0 5mm; font-family: "Darker Grotesque", sans-serif; font-weight: 800;
      font-size: 64pt; line-height: 0.84; letter-spacing: -0.04em; max-width: 7.5ch;
    }
    .cover h1 em { font-style: normal; color: var(--lime); }
    .cover .sub { margin: 0; max-width: 30ch; font-size: 14pt; line-height: 1.35; color: #e4dcef; }
    .cover .autor {
      margin-top: auto; display: flex; justify-content: space-between; align-items: end;
      font-family: "Darker Grotesque", sans-serif; font-weight: 700; font-size: 15pt; letter-spacing: -0.01em;
    }
    .cover .autor span { color: var(--lime); font-size: 12pt; }

    /* sumário + antes de começar */
    .sumario { margin: 0 0 9mm; padding: 0 0 6mm; border-bottom: 4px solid var(--lime); }
    .sumario ol { list-style: none; margin: 3mm 0 0; padding: 0; columns: 1; }
    .sumario li {
      display: grid; grid-template-columns: 26mm 1fr; gap: 3mm; padding: 1.6mm 0; border-bottom: 1px solid #d8d0c2;
      font-family: "Darker Grotesque", sans-serif; font-weight: 700; font-size: 14.5pt; line-height: 1.1; letter-spacing: -0.015em; color: var(--ink);
    }
    .sumario li span { color: var(--lime-ink); font-weight: 800; font-size: 11.5pt; text-transform: uppercase; letter-spacing: 0.04em; padding-top: 1mm; }
    .rotulo {
      margin: 0 0 2mm; font-family: "Darker Grotesque", sans-serif; font-weight: 800; font-size: 11pt;
      text-transform: uppercase; letter-spacing: 0.14em; color: var(--lime-ink);
    }
    h2.antes {
      font-family: "Darker Grotesque", sans-serif; font-weight: 800; font-size: 24pt; line-height: 1; letter-spacing: -0.03em;
      color: var(--purple); margin: 0 0 3mm;
    }

    /* aberturas de capítulo */
    .abre { break-before: page; margin: 0 0 6mm; }
    .abre .arte {
      margin: 0 0 7mm; height: 104mm; border-radius: 3px; overflow: hidden; background: var(--night);
    }
    .abre .arte img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .abre h2 {
      margin: 0; font-family: "Darker Grotesque", sans-serif; font-weight: 800; font-size: 34pt; line-height: 0.92;
      letter-spacing: -0.035em; color: var(--night); max-width: 16ch; text-wrap: balance;
    }
    .abre h2::after { content: ""; display: block; width: 30mm; height: 4px; background: var(--lime); margin-top: 5mm; }
    .abre.fecho { margin-bottom: 7mm; }

    /* corpo */
    article h3 {
      break-after: avoid; font-family: "Darker Grotesque", sans-serif; font-weight: 800; font-size: 17pt; line-height: 1.05;
      letter-spacing: -0.02em; color: var(--purple); margin: 7mm 0 2mm;
    }
    p { margin: 0 0 2.6mm; }
    a { color: var(--purple); text-decoration-color: var(--lime); text-underline-offset: 0.18em; overflow-wrap: anywhere; }
    strong { font-weight: 700; color: #120c18; }
    ul, ol { margin: 1mm 0 3.5mm; padding-left: 5mm; }
    li { margin: 0.9mm 0; }
    li::marker { color: var(--lime-ink); font-weight: 700; }
    code { font-family: ui-monospace, "DejaVu Sans Mono", monospace; font-size: 0.9em; }

    blockquote { margin: 4mm 0; padding: 0; break-inside: avoid; }
    blockquote p:last-child { margin-bottom: 0; }

    /* fala do público (comentário real) */
    blockquote.fala, blockquote.script {
      position: relative; padding: 5mm 6mm 4.5mm 15mm; background: var(--paper-2); border-radius: 3px;
      font-family: "Darker Grotesque", sans-serif; font-weight: 700; font-size: 15pt; line-height: 1.18; letter-spacing: -0.01em; color: var(--purple-deep);
    }
    blockquote.fala::before, blockquote.script::before {
      content: "“"; position: absolute; left: 4mm; top: 0mm; font-family: "Darker Grotesque", sans-serif; font-weight: 800;
      font-size: 46pt; line-height: 1; color: var(--lime);
    }
    blockquote.fala em { display: block; margin-top: 2mm; font-family: "Atkinson Hyperlegible", sans-serif; font-weight: 400; font-style: normal; font-size: 9pt; color: var(--dim); letter-spacing: 0; }
    blockquote.script { background: #ffffff; box-shadow: inset 4px 0 0 var(--lime); }

    /* exemplo fictício */
    blockquote.exemplo {
      break-inside: auto; padding: 6mm 7mm 5mm; background: var(--purple-deep); color: #efe9f6; border-radius: 3px;
    }
    blockquote.exemplo h3 { margin: 0 0 3mm; color: var(--lime); font-size: 18pt; }
    blockquote.exemplo strong { color: #ffffff; }
    blockquote.exemplo table { color: #efe9f6; }
    blockquote.exemplo th { background: #44335c; }
    blockquote.exemplo td { border-bottom-color: #4b3b63; }
    blockquote.exemplo td em { color: #cbbfe0; }
    blockquote.exemplo p:first-of-type { padding: 2.5mm 3.5mm; background: rgba(146,196,23,0.12); border-left: 3px solid var(--lime); }

    /* aviso curto */
    blockquote.aviso { padding: 3mm 4.5mm; border: 1.5px solid var(--purple); border-radius: 3px; font-size: 10.2pt; color: var(--purple-deep); }

    /* proposta de uma página: uma folha branca, inteira numa página */
    blockquote.proposta {
      break-before: page; break-inside: avoid; background: #ffffff; padding: 9mm 10mm 8mm; border-radius: 2px;
      box-shadow: 0 0 0 1px #d6cdbd, 0 6px 0 -2px #e3dccd, 0 12px 0 -5px #d6cdbd;
      font-size: 10.1pt; line-height: 1.45;
    }
    blockquote.proposta h3 {
      margin: 0 0 3mm; padding-bottom: 3mm; border-bottom: 4px solid var(--lime); color: var(--night); font-size: 21pt; letter-spacing: -0.02em;
    }
    blockquote.proposta p { margin: 0 0 1.6mm; }
    blockquote.proposta p strong:first-child { color: var(--purple); }
    blockquote.proposta ul { margin: 0 0 2.6mm; }
    blockquote.proposta li { margin: 0.4mm 0; }

    /* tabelas */
    table { width: 100%; border-collapse: collapse; margin: 3mm 0 4.5mm; font-size: 9.8pt; line-height: 1.38; break-inside: avoid; }
    th, td { border-bottom: 1px solid #d3c9b8; padding: 2mm 2.4mm; text-align: left; vertical-align: top; }
    th { background: var(--purple); color: var(--paper); font-family: "Darker Grotesque", sans-serif; font-weight: 700; font-size: 11.5pt; letter-spacing: 0.01em; }
    tbody tr:nth-child(even) td { background: rgba(68,51,92,0.05); }

    /* planilha 1: formulário para preencher à mão */
    table.planilha { font-size: 11pt; border: 1.5px solid var(--purple); }
    table.planilha th { font-size: 12.5pt; }
    table.planilha td { padding: 3.1mm 3mm; border-bottom: 1px solid #cfc5b4; background: #fff !important; }
    table.planilha td:last-child { width: 46%; color: #c9bfae; border-left: 1px dashed #cfc5b4; }
    table.planilha tr:nth-last-child(-n+2) td { background: rgba(146,196,23,0.10) !important; }

    .fecho + p, .fecho ~ ol { font-size: 11.6pt; }
  </style>
</head>
<body>
  <section class="cover">
    <div class="cover-in">
      <div class="tubo"></div>
      <img class="logo" src="${logo}" alt="TI Ninja" width="1000" height="320">
      <h1>Quanto cobrar <em>TI</em> 2026</h1>
      <p class="sub">O método pra chegar no seu preço, do custo da hora até a proposta de uma página</p>
      <div class="autor">Eduardo Honorato<span>tininja.net</span></div>
    </div>
  </section>
  <article>
${body}
  </article>
</body>
</html>`;
}

async function loadMarked() {
  try {
    return await import("marked");
  } catch {
    return import("/tmp/ebook-tools/node_modules/marked/lib/marked.esm.js");
  }
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const { marked } = await loadMarked();
  const markdown = prepareEbookMarkdown(readFileSync(sourcePath, "utf8"));
  let body = classifyBoxes(chapterOpeners(marked.parse(markdown, { gfm: true, breaks: false })));
  // o sumário entra logo antes de "Antes de começar", na segunda página
  body = body.replace('<h2 class="antes">', `${tableOfContents(body)}<h2 class="antes">`);
  writeFileSync(htmlPath, printHtml(body));
  const printed = spawnSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--allow-file-access-from-files",
    `--print-to-pdf=${pdfPath}`,
    htmlPath,
  ], { encoding: "utf8" });
  if (printed.status !== 0) {
    console.error(printed.stdout);
    console.error(printed.stderr);
    process.exit(printed.status || 1);
  }
  console.log(pdfPath);
}
