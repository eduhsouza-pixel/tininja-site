/** Texto aprovado da Turma Fundadora. Trocar só estas strings. */
export const FUNDADORA_COPY = {
  tag: "FUNDAMENTOS DE REDE",
  headline: "A Turma Fundadora abre em 26/10",
  subhead: "Curso de diagnóstico de rede. Endereço, máscara, gateway, DNS e DHCP, com método.",
  line: "Quem estiver na lista recebe o convite primeiro, no dia 26/10.",
  aboveButton: "Ao entrar na lista, você recebe o convite da Turma Fundadora no dia 26/10. Só isso.",
  smallPrint: "Lista gratuita. Sem compromisso de compra.",
  submit: "Entrar na lista",
  thanksTitle: "Pronto, seu nome está na lista de espera da Turma Fundadora do Fundamentos de Rede.",
  thanksBody: "No dia 26/10, a partir das 20h, o convite chega primeiro pra quem está nesta lista, com todos os detalhes.",
  thanksNote: "Estar na lista não reserva vaga e não obriga a comprar. Se mudar de ideia, é só clicar em descadastrar no e-mail.",
  // Acréscimos de 20/10 (decisões do Eduardo). Sem valor, percentual, vaga ou prazo novo.
  premise: "Rede que funciona pela metade quase nunca é cabo ruim. É endereço, máscara, gateway, DNS ou DHCP errado, e quem aprende a ler isso acha a falha antes de trocar peça.",
  who: "Quem ensina é o Eduardo, técnico de suporte que hoje toca o próprio MSP.",
  invite: "No dia 26/10 abre a Turma Fundadora do Fundamentos de Rede, a primeira etapa do NOC (Ninja Official Curriculum). Quem entrar como fundador tem uma condição especial e acesso ao BOT Ninja, o assistente de IA para tirar dúvidas do curso e técnicas.",
  proofIntro: "Quer ver o método antes?",
  proofVideo: "O vídeo da sub-rede: a impressora que atende metade do escritório",
  proofCalc: "A calculadora de sub-rede",
  waiting: "Enquanto o convite não chega:",
};

export function applyFundadoraCopy(doc = document) {
  const root = doc.querySelector("[data-fundadora-copy]");
  if (!root) return;
  for (const [key, value] of Object.entries(FUNDADORA_COPY)) {
    const el = root.querySelector(`[data-copy="${key}"]`);
    if (el) el.textContent = value;
  }
}
