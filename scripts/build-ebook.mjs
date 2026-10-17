import { readFileSync, writeFileSync } from "node:fs";
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

function printHtml(body) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <title>Quanto cobrar TI 2026</title>
  <style>
    @font-face {
      font-family: "Darker Grotesque";
      src: url("${font("darker-grotesque-latin-800.woff2")}") format("woff2");
      font-weight: 800;
      font-style: normal;
    }
    @font-face {
      font-family: "Darker Grotesque";
      src: url("${font("darker-grotesque-latin-700.woff2")}") format("woff2");
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: "Atkinson Hyperlegible";
      src: url("${font("atkinson-hyperlegible-latin-400.woff2")}") format("woff2");
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "Atkinson Hyperlegible";
      src: url("${font("atkinson-hyperlegible-latin-700.woff2")}") format("woff2");
      font-weight: 700;
      font-style: normal;
    }
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      background: #f3f0e8;
      color: #1a1520;
      font-family: "Atkinson Hyperlegible", sans-serif;
      font-size: 12pt;
      line-height: 1.48;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    @page {
      size: A4;
      margin: 16mm 16mm 18mm;
      background: #f3f0e8;
      @bottom-left {
        content: "TI Ninja  ·  Quanto cobrar TI 2026";
        font-family: "Atkinson Hyperlegible", sans-serif;
        font-size: 8.5pt;
        color: #5c4a78;
      }
      @bottom-right {
        content: counter(page);
        font-family: "Darker Grotesque", sans-serif;
        font-size: 12pt;
        font-weight: 700;
        color: #44335c;
      }
    }
    @page capa {
      size: A4;
      margin: 0;
      background: #100e12;
      @bottom-left { content: none; }
      @bottom-right { content: none; }
    }
    .cover {
      page: capa;
      break-after: page;
      height: 297mm;
      padding: 18mm 18mm 20mm;
      background: #100e12;
      color: #f3f0e8;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .cover-tubo {
      height: 4px;
      width: 42mm;
      background: #92c417;
      margin-bottom: 10mm;
    }
    .cover img {
      width: 78mm;
      height: auto;
    }
    .cover h1 {
      margin: 0 0 6mm;
      font-family: "Darker Grotesque", sans-serif;
      font-weight: 800;
      font-size: 48pt;
      line-height: 0.9;
      letter-spacing: -0.035em;
      max-width: 11ch;
    }
    .cover p {
      margin: 0;
      max-width: 34ch;
      font-size: 14pt;
      line-height: 1.4;
      color: #d5cce2;
    }
    .cover-author {
      margin: 8mm 0 0;
      padding-top: 5mm;
      border-top: 4px solid #92c417;
      color: #f3f0e8;
      font-family: "Darker Grotesque", sans-serif;
      font-weight: 700;
      font-size: 16pt;
      letter-spacing: -0.02em;
    }
    article { padding: 0; }
    article h2 {
      break-after: avoid;
      font-family: "Darker Grotesque", sans-serif;
      font-weight: 800;
      font-size: 22pt;
      line-height: 1.02;
      letter-spacing: -0.03em;
      color: #44335c;
      margin: 1.15em 0 0.45em;
    }
    article h2:first-of-type { margin-top: 0; }
    article h2.quebra {
      break-before: page;
      margin-top: 0;
    }
    article h3 {
      break-after: avoid;
      font-family: "Darker Grotesque", sans-serif;
      font-weight: 700;
      font-size: 16pt;
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #2a1e3c;
      margin: 1.15em 0 0.3em;
    }
    p { margin: 0 0 0.6em; }
    a { color: #44335c; overflow-wrap: anywhere; }
    strong { font-weight: 700; }
    ul, ol { margin: 0.3em 0 0.8em; padding-left: 1.2em; }
    li { margin: 0.18em 0; }
    blockquote {
      margin: 0.8em 0;
      padding: 0.55em 0.85em;
      border-left: 4px solid #92c417;
      background: #e7e1d4;
    }
    blockquote p:last-child { margin-bottom: 0; }
    hr {
      border: 0;
      border-top: 4px solid #92c417;
      margin: 1.2em 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 0.7em 0 1em;
      font-size: 10.5pt;
      break-inside: avoid;
    }
    th, td {
      border-bottom: 1px solid #cfc6b8;
      padding: 0.32em 0.4em;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #44335c;
      color: #f3f0e8;
      font-family: "Darker Grotesque", sans-serif;
      font-weight: 700;
      font-size: 12pt;
    }
  </style>
</head>
<body>
  <section class="cover">
    <div>
      <div class="cover-tubo"></div>
      <img src="${logo}" alt="TI Ninja" width="1000" height="320">
    </div>
    <div>
      <h1>Quanto cobrar TI 2026</h1>
      <p>O método pra chegar no seu preço, do custo da hora até a proposta de uma página</p>
      <p class="cover-author">Eduardo Honorato · TI Ninja</p>
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
  const body = marked.parse(markdown, { gfm: true, breaks: false })
    .replace(/<h2>((?:Capítulo |Fechando:)[\s\S]*?)<\/h2>/g, '<h2 class="quebra">$1</h2>');
  writeFileSync(htmlPath, printHtml(body));
  const printed = spawnSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
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
