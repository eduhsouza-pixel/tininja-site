# Revisão editorial — Eduardo e Lightcopy

Rodada de 24/10/2026, branch `artigos-seo`. B01–B07 preparados localmente; nada publicado. Os briefs em `/workspace/seo-aeo/` foram apenas lidos. B08 não foi escrito, listado no hub ou incluído no sitemap: continua fora até decisão do Eduardo.

## Itens que permanecem para revisão

| Item do brief | Tratamento nesta entrega | Revisão solicitada |
| --- | --- | --- |
| B07: “dia a dia” e “trilha” — A CONFIRMAR | Apresentados explicitamente como proposta editorial, sem atribuição a uma definição oficial de ocupação; comentários `<!-- REVISAR: Eduardo -->` antes dessas seções. | Eduardo: validar atribuições, ordem e exercícios. Lightcopy: conferir clareza e tom. |
| B07: demais orientações editoriais | Introdução, laboratório, documentação, erros, próximos passos e FAQ também marcados com o comentário de revisão. Comandos e endereçamento apoiados na documentação Microsoft. | Validar as fronteiras entre suporte, infraestrutura e desenvolvimento, sem tratá-las como universais. |
| PPPoE e IP estático — A CONFIRMAR | B04 explica apenas os nomes e remete aos dados da operadora e ao manual. FAQ 3841 lida, mas é exemplo de fabricante. | Conferir a formulação; não acrescentar procedimento universal nem inferir o tipo de conexão. |
| WPA2/WPA3 — A CONFIRMAR | Sem receita de modo, cifra ou combinação; B04 manda seguir a recomendação atual do fabricante e verificar compatibilidade. | Só detalhar com documentação aplicável ao equipamento; não transportar recomendações antigas da CISA para uma regra atual. |
| Roteador da operadora + próprio | B03/B04 descrevem possibilidade de cascata; mudança de modo depende da operadora e dos manuais. | Validar ressalvas; não transformar modo de ponte em obrigação universal. |
| B06: visitantes, segmentação e regras mínimas | Separação por necessidade e roteiro de registro apresentados como orientação editorial. Não se promete isolamento apenas por SSID/VLAN; manda configurar e testar. | Eduardo: validar cenário e limites. Lightcopy: preservar as ressalvas. |
| B05: encaminhamento manual | Alternativa somente quando a dependência é abertura de portas, mediante documentação do serviço; não substitui toda descoberta/interação UPnP. | Validar a distinção e manter ausência de portas/modelos inventados. |

## Fontes antes pendentes, agora acessíveis por curl

Todas as 28 URLs dos briefs B01–B07 (incluindo pendências) retornaram HTTP 200 em 24/10/2026. O corpo foi extraído para texto; PDFs por `pdftotext`. Foram lidos os trechos usados, não apenas o status HTTP. As páginas Cisco e NIC.br contêm conteúdo fora de `<main>`; a extração do documento completo confirmou as seções técnicas.

| Fonte / condição anterior | Resultado e uso |
| --- | --- |
| [Cisco: DHCP](https://www.cisco.com/c/pt_br/support/docs/ip/dynamic-address-allocation-resolution/27470-100.html), antes dependente de WebFetch | Texto acessível: broadcast/relay, negociação e teste estático. B01/B02 remetem ao manual; `ip helper-address` é identificação de sintaxe de fabricante, não receita universal. |
| [Cisco: VLAN](https://www.cisco.com/c/en/us/td/docs/switches/lan/c9000/lyr2-fwd/vlan/vlan-configuration-guide/configure-vlan.html), antes dependente de WebFetch | Texto acessível: domínio de broadcast, associação a sub-rede, access/trunk, VLAN nativa, lista permitida e roteamento. Apenas conceitos em B02/B06; sem modelo recomendado ou CLI de configuração. |
| [Cisco: roteador](https://www.cisco.com/c/pt_br/solutions/small-business/resource-center/networking/how-to-set-up-router.html), antes dependente de WebFetch | Texto acessível: portas, documentação, gateway integrado, credenciais e firmware. B03/B04 mantêm condicionais e remetem ao fabricante/operadora. |
| [Cisco: checklist](https://www.cisco.com/c/pt_br/solutions/small-business/resource-center/security/network-security-checklist.html), antes dependente de WebFetch | Texto acessível: firewall, acessos e segmentação; apoio em B06, cuja base é NIST/NIC.br. Também apoia a distinção VLAN/VPN na FAQ B02. Marketing e estatísticas da página não reproduzidos. |
| [TP-Link FAQ 3841](https://www.tp-link.com/br/support/faq/3841/) — A CONFIRMAR | Texto acessível: IP dinâmico, PPPoE e IP estático. Uso cauteloso em B04, sem inferir prevalência, prazo de instalação ou procedimento universal. Não fundamenta uma prescrição WPA2/WPA3. |
| [CERT.br: ransomware](https://cert.br/docs/ransomware/proteger/) — A CONFIRMAR | Trechos de backup, restauração e segmentação acessíveis. Fonte omitida dos artigos nesta rodada; B06 usa NIST/NIC.br e mantém sua proposta de segmentação identificada como editorial. |
| [CISA: pequenas empresas](https://www.cisa.gov/cyber-guidance-small-businesses) — A CONFIRMAR | Texto acessível, com orientações por responsabilidade. Fonte omitida dos artigos; não usada para ampliar afirmações do checklist. |
| [CISA: Home Network Security](https://www.cisa.gov/news-events/news/home-network-security) | Texto acessível, com aviso de arquivo. Toda menção nos artigos indica conteúdo arquivado de fevereiro de 2021; uso limitado a firmware, serviços, firewall, administração remota e UPnP. |
| [MTE: Guia Brasileiro de Ocupações](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/estatisticas-trabalho/guia-brasileiro-de-ocupacoes) | Página introdutória acessível; painéis não lidos. Não usada para afirmar atribuições, trilha ou remuneração em B07. |

As demais fontes usadas estão no bloco “Fontes oficiais” de cada artigo: RFC 2131/3927/1918, IANA, Microsoft Learn, FAQs TP-Link 2392/2394/4624, NETGEAR 27199, Canadian Centre for Cyber Security, UPnP Device Architecture 2.0, NIST SP 1300 em português e NIC.br hardening. Não foram acrescentadas fontes fora do conjunto dos briefs B01–B07; fontes desse conjunto foram cruzadas quando sustentam outro artigo (DHCP em B04, VLAN em B06, link-local em B03).

## Ajustes de precisão frente às respostas-alvo

- B01: T1 tem padrão de metade da concessão, mas é configurável (RFC 2131 §4.4.5); 169.254 é pista de autoconfiguração, não diagnóstico definitivo; dois servidores podem existir em redundância planejada.
- B02: VLAN e sub-rede não são sinônimos; trunk admite exceções de marcação, como VLAN nativa.
- B03: gateway é ponto de partida em redes simples, não garantia de painel; endereço privado não é acessível **diretamente** pela internet pública; reset fica por último.
- B04: não exige desativar universalmente o roteamento da operadora; depende da instalação e do manual.
- B05: encaminhamento manual não substitui todas as funções UPnP.
- B06: visitantes exigem isolamento configurado e testado; aplicação de firmware deve ser planejada, não uma alteração automática sem contexto.
- B07: atribuições e trilha são editoriais; ping testa respostas ICMP, e tracert não demonstra sozinho disponibilidade de todos os serviços.

Cada FAQ visível tem 5–6 perguntas e resposta de uma frase, espelhada no JSON-LD. CTAs finais de todos os artigos apontam somente à lista de espera em `/fundadora/`; os CTAs secundários opcionais foram omitidos. Os links de navegação global do site foram preservados.

## Conferência local

Conteúdo editorial por artigo (inclui título, introdução, seções e FAQ; exclui sumário, autoria, fontes e leitura relacionada): B01 1.254; B02 1.229; B03 1.164; B04 1.221; B05 1.242; B06 1.273; B07 1.288 palavras. Mesmo incluindo sumário e referências, cada `<article>` fica entre 900 e 1.500 palavras.

Capturas e relatório de validação ficam fora do repositório, em `/workspace/screens-artigos/`. Este arquivo e o README são excluídos do artefato público pelo workflow; nenhuma execução de publicação foi solicitada.
