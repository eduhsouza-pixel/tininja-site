---
name: TI Ninja
description: Direção D (Planta de Rede) — papel vegetal quadriculado azul-claro, pranchas brancas nítidas, tinta nanquim, cobalto de engenharia, marcador âmbar e hero com entrada em vídeo do datacenter.
colors:
  papel: "#F4F8FC"
  grade: "#DCE7F3"
  prancha: "#FFFFFF"
  prancha-sutil: "#EEF4FA"
  nanquim: "#0E223D"
  cota: "#334E73"
  cobalto: "#0F4C81"
  cobalto-escuro: "#0A3760"
  cobalto-suave: "#E7F0FA"
  marcador: "#E88B00"
  marcador-hover: "#D27D00"
  marcador-tinta: "#101722"
  marcador-suave: "#FFF4E0"
  enlace-ok: "#156E46"
  enlace-ok-suave: "#EAF6EF"
  enlace-erro: "#B22B27"
  enlace-erro-suave: "#FCECEC"
  linha: "#C2D4E6"
  linha-forte: "#7D9AB7"
  borda-forte: "#0E223D"
typography:
  display:
    fontFamily: '"Chakra Petch", sans-serif'
    fontWeight: "600 / 700"
    h1Size: "clamp(1.95rem, 3.6vw, 3rem)"
    heroH1Size: "clamp(1.95rem, 3.5vw, 3rem)"
    h2Size: "clamp(1.5rem, 2.6vw, 2.15rem)"
    h3Size: "clamp(1.2rem, 2vw, 1.5rem)"
    lineHeight: 1.32
    letterSpacing: "-0.02em"
  body:
    fontFamily: '"Atkinson Hyperlegible", sans-serif'
    fontSize: "16px"
    fontWeight: "400 / 700"
    lineHeight: 1.55
  mono:
    fontFamily: '"JetBrains Mono", monospace'
    fontWeight: "500 / 700"
rounded:
  raio: "2px"
spacing:
  maxLargura: "1220px"
  margem: "clamp(16px, 3.5vw, 36px)"
  measure: "68ch"
  gradeMalha: "24px 24px"
components:
  fascia:
    backgroundColor: "{colors.prancha}"
    borderBottom: "1px solid {colors.linha-forte}"
    padding: "12px max(var(--margem), calc((100% - var(--max-largura)) / 2 + var(--margem)))"
  nav-link:
    textColor: "{colors.nanquim}"
    minHeight: "44px"
    padding: "6px 10px"
  nav-curso:
    backgroundColor: "{colors.marcador}"
    textColor: "{colors.marcador-tinta}"
    border: "1px solid #B86E00"
  button-marcador:
    backgroundColor: "{colors.marcador}"
    hoverBackgroundColor: "{colors.marcador-hover}"
    textColor: "{colors.marcador-tinta}"
    border: "1px solid #B86E00"
    minHeight: "44px"
    rounded: "{rounded.raio}"
  button-cobalto:
    backgroundColor: "{colors.cobalto}"
    hoverBackgroundColor: "{colors.cobalto-escuro}"
    textColor: "#FFFFFF"
    border: "1px solid {colors.cobalto-escuro}"
    minHeight: "44px"
    rounded: "{rounded.raio}"
  button-contorno:
    backgroundColor: "{colors.prancha}"
    hoverBackgroundColor: "{colors.cobalto-suave}"
    textColor: "{colors.nanquim}"
    border: "1px solid {colors.linha-forte}"
    minHeight: "44px"
    rounded: "{rounded.raio}"
  prancha:
    backgroundColor: "{colors.prancha}"
    border: "1px solid {colors.linha-forte}"
    padding: "24px (32px em >= 720px)"
---

# Design System: TI Ninja (Direção D — Planta de Rede)

## Visão geral

**Conceito: "Planta de Rede (Esquema de Topologia & Papel Técnico)"**

O site e as landing pages do TI Ninja são estruturados como uma planta técnica de infraestrutura: fundo externo em papel vegetal azul-claro com malha discreta de `24px`, pranchas brancas sólidas (`#FFFFFF`) para toda área de leitura e cálculo, tinta nanquim azul-marinho (`#0E223D`), azul cobalto de engenharia (`#0F4C81`) e marcador âmbar de revisão (`#E88B00`) sempre com tinta escura (`#101722`) para manter contraste WCAG AA.

Na página inicial, o hero (`section.hero-planta#hero-intro`) abre com vídeo do corredor de datacenter sobreposto por uma camada de planta com recorte animado (`clip-path`) e traçado SVG de rack/topologia que revela a composição final com a cópia principal à esquerda e o cartão interativo da topologia do ecossistema à direita.

## Paleta e tokens canônicos

Todos os tokens oficiais vivem em `:root` de `assets/css/site.css` (`color-scheme: light`):

### Superfícies
- **Papel de planta (`--papel`):** `#F4F8FC` com malha ortogonal de 1px em **Grade (`--grade`):** `#DCE7F3` (`background-size: 24px 24px`) — usado apenas no fundo externo do `body` e na camada do hero (`.hero-planta-camada`).
- **Prancha branca (`--prancha`):** `#FFFFFF` — toda área de leitura, cabeçalho, painéis de formulário/resultado, artigos, tabelas e cartões de topologia têm fundo sólido branco.
- **Prancha sutil (`--prancha-sutil`):** `#EEF4FA` — superfícies secundárias discretas dentro de pranchas (sumários, campos em foco/leitura, tags de revisão).

### Tintas e destaques
- **Nanquim (`--nanquim`):** `#0E223D` — cor principal de títulos, texto corrido e bordas fortes (`--borda-forte`). Contraste medido: 14,97:1 sobre `#F4F8FC` e 15,97:1 sobre `#FFFFFF`.
- **Cota (`--cota`):** `#334E73` — texto secundário, rótulos de apoio, fórmulas e metadados. Contraste medido: 7,94:1 sobre `#F4F8FC`.
- **Cobalto (`--cobalto`):** `#0F4C81` (hover/escuro `--cobalto-escuro`: `#0A3760`, fundo suave `--cobalto-suave`: `#E7F0FA`) — links, conectores, foco de teclado (`outline: 2px solid var(--cobalto)`), seleção de texto (`::selection`) e botão secundário sólido com texto `#FFFFFF` (contraste 8,86:1).
- **Marcador âmbar (`--marcador`):** `#E88B00` (hover `--marcador-hover`: `#D27D00`, suave `--marcador-suave`: `#FFF4E0`) — CTA principal, destaque do link "Curso" no menu e marcadores ativos. **Regra obrigatória de contraste:** fundo âmbar sempre usa texto escuro `--marcador-tinta: #101722` (contraste 6,96:1), nunca texto branco.

### Estados e linhas técnicas
- **Enlace validado (`--enlace-ok`):** `#156E46` (fundo suave `--enlace-ok-suave`: `#EAF6EF`, contraste 6,27:1 com branco).
- **Falha de rota (`--enlace-erro`):** `#B22B27` (fundo suave `--enlace-erro-suave`: `#FCECEC`, contraste 6,43:1 com branco).
- **Linhas (`--linha` / `--linha-forte`):** `#C2D4E6` e `#7D9AB7` — bordas secas de 1px sem sombras borradas.

## Tipografia (OFL local em `/assets/fonts/`)

Todas as fontes são servidas localmente via `@font-face` (`font-display: swap`, subconjuntos `latin` e `latin-ext`), com preloads no `<head>` das páginas HTML:

- **Display (`--display`):** `"Chakra Petch", sans-serif` — pesos `600` e `700`. Usado em títulos (`h1`–`h4`), botões (`.btn`, `.placa`), marca no cabeçalho e controles do hero.
- **Corpo e UI (`--texto`):** `"Atkinson Hyperlegible", sans-serif` — pesos `400` e `700`. Base `16px`, `line-height: 1.55`, medida máxima `--measure: 68ch` e `font-variant-numeric: tabular-nums`.
- **Dados técnicos (`--mono`):** `"JetBrains Mono", monospace` — pesos `500` e `700`. Reservado para valores de rede (`IP`, máscara, `/24`, `VLAN`), comandos, fórmulas, breadcrumbs técnicos e metadados tabulares.

## Cabeçalho, navegação e rodapé

- **Cabeçalho institucional (`.fascia` / `.topo-site`):** barra branca (`#FFFFFF`) com borda inferior `1px solid var(--linha-forte)` (`--linha-forte: #7D9AB7`), não flutuante e sem `backdrop-filter`.
- **Menu gerenciado por `scripts/layout.py`:** `Início`, `Calculadora de hora`, `Quanto cobrar`, `Calculadora de sub-rede`, `Artigos`, `Comunidade` (`https://comunidade.tininja.net/`), `Autoavaliação` (`https://avaliacao.tininja.net/`), `Curso` (`/lp/fundamentos-de-rede/`, destaque âmbar) e `E-book`. Links externos nunca recebem `aria-current="page"`.
- **Responsividade em 390px:** abaixo de `720px`, a navegação ocupa `100%` da largura abaixo da marca separada por `border-top: 1px solid var(--grade)`, quebrando em duas linhas limpas sem scroll horizontal e mantendo alvos de toque com `min-height: 44px`.

## Hero em vídeo do datacenter (`index.html` + `assets/js/hero-intro.js`)

- **Camadas visuais de `section.hero-planta#hero-intro`:**
  1. `.hero-midia`: imagem estática de fallback/quadro final (`/assets/media/hero/hero-final.jpg`) e `<video id="hero-video" muted playsinline preload="metadata" poster="/assets/media/hero/hero-poster.jpg">` com fontes `/assets/media/hero/hero-720.mp4` e `/assets/media/hero/hero-1080.mp4`.
  2. `.hero-planta-camada`: camada de papel vegetal translúcido quadriculado (`rgba(244, 248, 252, 0.93)`) com transição horizontal em `clip-path` (`1100ms var(--sai)`).
  3. `.hero-rack-svg`: desenho vetorial ortogonal de rack e conexões em `--cobalto`, `--cota` e `--marcador` animado via `stroke-dashoffset`.
  4. `.hero-grade`: coluna de cópia real do produto à esquerda e prancha de topologia clicável do ecossistema à direita (Fundamentos de Rede, Sub-rede, Minha hora, E-book).
  5. `#hero-entrar-wrap` / `#btn-intro-entrar` e `.hero-controles`: controles fixos/posicionados com `min-height: 44px` (`Pausar` / `Continuar`, `Pular intro`, `Ver a entrada no datacenter`).
- **Regras de reprodução (`assets/js/hero-intro.js`):**
  - `?intro=1` força a reprodução desde o início; `?intro=0` pula imediatamente para o estado final; `?t=<segundos>` posiciona pausado para inspeção.
  - Em visitas seguintes na mesma sessão (`sessionStorage.tn_intro_vista === "1"`) ou quando `(prefers-reduced-motion: reduce)` está ativo, a intro pula direto para `.intro-concluida`.
  - Se `video.play()` for rejeitado pelo navegador, entra no estado `.intro-aguardando` exibindo `#btn-intro-entrar`.
  - Erros de mídia (`error` no `<video>` ou no último `<source>`) recuam imediatamente para o estado final estático sem bloquear o conteúdo.

## Regras obrigatórias e proibições

- **Pranchas sólidas:** blocos de leitura, artigos, formulários e calculadoras ficam sempre em `#FFFFFF` sólido; a malha quadriculada não pode invadir fundos de texto longo.
- **Geometria e elevação:** cantos quase retos (`--raio: 2px`), bordas secas de `1px` (`--linha`, `--linha-forte`, `--nanquim`) e cruzes de registro (`.cruz-canto`).
- **Proibido:**
  - `kicker-above-heading` (rótulos pequenos em caixa alta acima de títulos/headings — em títulos de LPs ou artigos usar subtítulo natural ou cabeçalho semântico direto).
  - Roxo em qualquer superfície, borda ou texto.
  - Glassmorphism / `backdrop-filter`.
  - Texto em gradiente, glow neon ou sombras borradas decorativas.
  - Botão laranja (`#E88B00`) com texto branco.
  - Alvos clicáveis com altura menor que `44px`.
