# Revisão editorial — Eduardo e Lightcopy

Registro da seção `/artigos/` (7 artigos + hub). Este arquivo e o README são excluídos do artefato público pelo workflow.

## Resolvido em 24/10/2026

- **B07 (carreira em redes):** Eduardo validou as seções “dia a dia” e “trilha”. Os 8 comentários `<!-- REVISAR: Eduardo -->` foram removidos. O texto público não tem rótulo de bastidor nem promessa de renda ou resultado.
- **B04 (cascata de roteadores):** Eduardo validou a regra de faixas de LAN diferentes e sem sobreposição quando os dois equipamentos roteiam (a ressalva do modo ponto de acesso foi mantida).
- **Autorização para publicar:** Eduardo autorizou a publicação em 24/10/2026.
- **Lightcopy, revalidação do commit f9d933e:** sem bloqueantes. Aplicados R1 (nota da seção Fontes: “Links conferidos em 24/10/2026. Guias de fabricante não definem menus universais.”), R2 (categoria “Conceitos de rede” no hub e no `articleSection` de B01 e B02), R3 (fonte “Cisco — checklist de segurança” removida das Fontes do B02, pois o corpo não a cita), R5 (abertura do parágrafo do B01) e R7 (aspas curvas em “Identificar”, no B06).
- **Não aplicados, por decisão:** R4 (parâmetros UTM nos CTAs) e R6 (as datas de 24/10/2026 permanecem, publicação no mesmo dia).

## Pontos que continuam sem fonte neutra

- **PPPoE, IP estático e WPA2/WPA3 (B04):** o artigo só explica os termos e remete à operadora e ao manual do fabricante. Não acrescentar procedimento universal.
- **B06 (visitantes e segmentação) e B05 (encaminhamento manual):** mantidas as ressalvas; não prometer isolamento só por SSID/VLAN nem tratar o encaminhamento manual como substituto de todo uso de UPnP.
- **CTA:** não afirma que a lista da Turma Fundadora é gratuita nem que não obriga a comprar, porque isso não foi verificado.
- **Navegação global:** menu e rodapé continuam linkando “Minha hora” e “E-book” (`/quanto-cobrar/`). Fora do escopo desta entrega.
- **B08 (salário de analista):** não foi escrito, listado nem incluído no sitemap. Segue fora até decisão do Eduardo.

## Fontes

Todas as 28 URLs dos briefs B01–B07 retornaram HTTP 200 em 24/10/2026 e os trechos usados foram lidos. Páginas arquivadas (CISA, fev/2021) são indicadas como tal nos artigos. Páginas de fabricante são tratadas como exemplo, não como regra universal.

## Conferência

14 testes do site, 403 verificações da calculadora, `scripts/layout.py --check`, links internos e correspondência entre FAQ visível e JSON-LD. Detalhes na descrição do Pull Request.
