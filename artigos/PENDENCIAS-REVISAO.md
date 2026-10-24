# Revisão editorial — Eduardo e Lightcopy

Rodada de 24/10/2026, branch `artigos-seo`. B01–B07 preparados localmente; nada publicado. Os briefs em `/workspace/seo-aeo/` foram apenas lidos. B08 não foi escrito, listado no hub ou incluído no sitemap: continua fora até decisão do Eduardo.

## Itens que permanecem para revisão

| Item do brief | Tratamento nesta entrega | Revisão solicitada |
| --- | --- | --- |
| B07: “dia a dia” e “trilha” — A CONFIRMAR | Texto público reescrito com respostas diretas e limites de contexto, sem atribuição a uma definição oficial de ocupação; preservados os comentários `<!-- REVISAR: Eduardo -->` antes dessas seções. | Eduardo: validar atribuições, ordem e exercícios. Lightcopy: conferir clareza e tom. |
| B07: demais orientações editoriais | Introdução, laboratório, documentação, erros, próximos passos e FAQ também marcados com o comentário de revisão. Comandos e endereçamento apoiados na documentação Microsoft. | Validar as fronteiras entre suporte, infraestrutura e desenvolvimento, sem tratá-las como universais. |
| PPPoE e IP estático — A CONFIRMAR | B04 explica apenas os nomes e remete aos dados da operadora e ao manual. FAQ 3841 lida, mas é exemplo de fabricante. | Conferir a formulação; não acrescentar procedimento universal nem inferir o tipo de conexão. |
| WPA2/WPA3 — A CONFIRMAR | Sem receita de modo, cifra ou combinação; B04 manda seguir a recomendação atual do fabricante e verificar compatibilidade. | Só detalhar com documentação aplicável ao equipamento; não transportar recomendações antigas da CISA para uma regra atual. |
| B04: faixas de LAN em cascata — A CONFIRMAR | Incluída a exigência de sub-redes diferentes e sem sobreposição quando os dois equipamentos roteiam, com WAN do segundo ligada à LAN do primeiro; exemplo de conflito com 192.168.1.0/24 nas duas LANs. A ressalva exclui o modo ponto de acesso. | Eduardo: confirmar a formulação e o cenário; não transformar a regra em instrução universal para qualquer modo. |
| Roteador da operadora + próprio | B03/B04 descrevem possibilidade de cascata; mudança de modo depende da operadora e dos manuais. | Validar ressalvas; não transformar modo de ponte em obrigação universal. |
| B06: visitantes, segmentação e regras mínimas | Separação por necessidade e roteiro de registro apresentados como instruções diretas, sem linguagem de bastidor. Não se promete isolamento apenas por SSID/VLAN; manda configurar e testar. | Eduardo: validar cenário e limites. Lightcopy: preservar as ressalvas. |
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
| [CERT.br: ransomware](https://cert.br/docs/ransomware/proteger/) — A CONFIRMAR | Trechos de backup, restauração e segmentação acessíveis. Fonte omitida dos artigos nesta rodada; B06 usa NIST/NIC.br e mantém as orientações de segmentação sujeitas à validação do Eduardo neste arquivo. |
| [CISA: pequenas empresas](https://www.cisa.gov/cyber-guidance-small-businesses) — A CONFIRMAR | Texto acessível, com orientações por responsabilidade. Fonte omitida dos artigos; não usada para ampliar afirmações do checklist. |
| [CISA: Home Network Security](https://www.cisa.gov/news-events/news/home-network-security) | Texto acessível, com aviso de arquivo. Toda menção nos artigos indica conteúdo arquivado de fevereiro de 2021; uso limitado a firmware, serviços, firewall, administração remota e UPnP. |
| [MTE: Guia Brasileiro de Ocupações](https://www.gov.br/trabalho-e-emprego/pt-br/acesso-a-informacao/acoes-e-programas/programas-projetos-acoes-obras-e-atividades/estatisticas-trabalho/guia-brasileiro-de-ocupacoes) | Página introdutória acessível; painéis não lidos. Não usada para afirmar atribuições, trilha ou remuneração em B07. |

As demais fontes usadas estão no bloco “Fontes oficiais” de cada artigo: RFC 2131/3927/1918, IANA, Microsoft Learn, FAQs TP-Link 2392/2394/4624, NETGEAR 27199, Canadian Centre for Cyber Security, UPnP Device Architecture 2.0, NIST SP 1300 em português e NIC.br hardening. Na rodada anterior, fontes do conjunto dos briefs B01–B07 foram cruzadas quando sustentam outro artigo (DHCP em B04, VLAN em B06, link-local em B03). Na rodada 3, a [FAQ 1556 do fabricante](https://www.tp-link.com/us/support/faq/1556/), seção sobre alteração do IP da LAN, foi lida e acrescentada às Fontes do B04 para sustentar o conflito entre faixas em cascata; a validação do Eduardo permanece pendente.

## Ajustes de precisão frente às respostas-alvo

- B01: T1 tem padrão de metade da concessão, mas é configurável (RFC 2131 §4.4.5); 169.254 é pista de autoconfiguração, não diagnóstico definitivo; dois servidores podem existir em redundância planejada.
- B02: VLAN e sub-rede não são sinônimos; trunk admite exceções de marcação, como VLAN nativa.
- B03: gateway é ponto de partida em redes simples, não garantia de painel; endereço privado não é acessível **diretamente** pela internet pública; reset fica por último.
- B04: não exige desativar universalmente o roteamento da operadora; depende da instalação e do manual.
- B05: encaminhamento manual não substitui todas as funções UPnP.
- B06: visitantes exigem isolamento configurado e testado; aplicação de firmware deve ser planejada, não uma alteração automática sem contexto.
- B07: atribuições e trilha são editoriais; ping testa respostas ICMP, e tracert não demonstra sozinho disponibilidade de todos os serviços.

Cada FAQ visível dos artigos tem 5–6 perguntas, com respostas diretas espelhadas no JSON-LD. Os sete artigos e o hub usam o CTA evergreen da opção B: “Quer praticar com método? Conheça o Fundamentos de Rede, o curso de entrada da TI Ninja, na página da Turma Fundadora.” Cada bloco tem um único botão para `/fundadora/`, sem afirmar gratuidade da lista, ausência de compromisso de compra, preço, urgência ou data de abertura.

## Rodada 3: revisão Lightcopy

Revisão aplicada a partir de `/workspace/lightcopy/REVISAO_ARTIGOS_SEO.md`, lido integralmente. Títulos curtos sincronizados com metadados, JSON-LD, breadcrumbs, cards, listas e hasPart; H1 do B07 usa “rumo a Analista de Infraestrutura e Redes”. Aberturas com cenas, FAQs diretas, APIPA no B01, topologia física/VLAN 1 no B02, certificado no B03, cascata no B04, precisão do CCCS no B05 e ressalva sobre firewall no B06. Empresas nomeadas apenas nas Fontes; referências no corpo usam descrições neutras. Categoria do hub e articleSection de B03/B04: “Roteador e acesso”.

### Pendências e exceções antes de publicar

- **B07 — BLOQUEANTE:** os **8 comentários `<!-- REVISAR: Eduardo -->` foram preservados por instrução expressa nesta rodada**. Eduardo ainda precisa validar as seções, especialmente “dia a dia” e “trilha”. Os oito comentários precisam sair **antes de publicar, depois dessa validação**; reescrever a copy não resolve a aprovação técnica.
- **B04 — A CONFIRMAR com Eduardo:** validar a orientação de faixas de LAN diferentes e sem sobreposição na cascata em modo roteador, conforme detalhado na tabela acima.
- **Navegação global — fora do escopo:** menu e rodapé de todas as páginas continuam linkando “Minha hora” (`/minha-hora/`) e “E-book” (`/quanto-cobrar/`). Esses links levam a temas de preço/renda e não fazem parte do CTA do corpo. Não foram alterados.
- B08 não foi criado, listado ou incluído no sitemap. Continua dependente da decisão do Eduardo.
- A opção A não foi aplicada: não se verificou gratuidade da lista nem ausência de obrigação de compra. A FAQ do hub remete à página do curso sem depender de ela continuar sendo uma lista.
- As cenas sugeridas de B03 e B05 foram ajustadas para evitar afirmar frequência de falhas sem fonte ou reduzir todo uso de UPnP à abertura de portas. A ressalva de que desativar UPnP não torna a rede imune já existia e foi mantida.

## Conferência local

Rodada 3 aprovada nas verificações locais: 14 testes do site; 403 verificações da calculadora (80 casos); `layout.py --check`; 19 páginas públicas e 56 URLs internas com HTTP 200, incluindo recursos e fragmentos. Nas oito páginas de artigos, HTML, metadados, breadcrumbs e FAQ/JSON-LD conferidos; hub com cards e hasPart sincronizados. Navegação por teclado, sumário, FAQ e CTA verificados a 390px e 1440px, sem overflow da página, erros de JavaScript ou requisições externas durante a leitura. Leitura e FAQ também funcionam com JavaScript desativado. Menu e rodapé comparados com o commit anterior, sem mudanças.

As verificações e as capturas mobile da rodada 3 ficam fora do repositório, em `/workspace/screens-artigos/rodada3-*.png`; relatório em `/workspace/screens-artigos/validacao-rodada3.txt`. Este arquivo e o README são excluídos do artefato público pelo workflow. A entrega permanece local, na branch `artigos-seo`, sem push ou alteração da main.
