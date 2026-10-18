// Botão "Copiar" dos blocos de comando em /comandos/.
for (const bloco of document.querySelectorAll(".cmd")) {
  const pre = bloco.querySelector("pre");
  const botao = bloco.querySelector("button");
  if (!pre || !botao) continue;
  botao.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(pre.textContent.trim());
      botao.textContent = "Copiado";
      botao.classList.add("copiado");
    } catch {
      const faixa = document.createRange();
      faixa.selectNodeContents(pre);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(faixa);
      botao.textContent = "Ctrl+C";
    }
    setTimeout(() => {
      botao.textContent = "Copiar";
      botao.classList.remove("copiado");
    }, 1800);
  });
}
