# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Multi-superfície na web sob o domínio `tininja.net`:
- **Site institucional, ferramentas gratuitas e Landing Pages (`tininja.net`):** HTML, CSS e JavaScript estáticos sem build step (`scripts/layout.py` sincroniza cabeçalho e rodapé no site; LPs em `/lp/<nome>/` usam `assets/css/site.css` + estilos locais), hospedado na Locaweb atrás do Cloudflare.
- **Fórum dos alunos (`comunidade.tininja.net`):** Discourse com tema customizado (`common/common.scss`, `settings.yml`, inicializador/componentes `.gjs` e esquema de cores claro/escuro).
- **Plataforma de autoavaliação e certificados (`avaliacao.tininja.net`):** FastAPI + templates Jinja2 + CSS próprio (`src/autoavaliacao/static/css/app.css`), rodando em Docker na VPS Hostinger.

## Users

Técnicos de suporte de TI no Brasil (25–45 anos, renda atual entre R$ 2.000 e R$ 4.500), que atendem chamados de usuário final/balcão e querem migrar para administração de redes e infraestrutura em empresas — por duas saídas válidas: CLT (analista de infraestrutura/redes) ou autônomo/MSP com contrato mensal recorrente. Costumam acessar no celular, em campo ou fora do expediente.

## Product Purpose

O ecossistema TI Ninja conduz o técnico do conteúdo gratuito até a prática guiada e comprovação de domínio em 4 superfícies integradas:
1. **Site (`tininja.net`):** apresentar o caminho do suporte até infra/MSP e entregar ferramentas gratuitas reais (calculadora "Quanto vale a sua hora", calculadora de sub-rede, guia "Quanto cobrar em TI em 2026", artigos e comandos).
2. **Landing pages (`/lp/*`):** converter visitantes no modelo VTSD para *Fundamentos de Rede* (R$ 197), *Proxmox na Prática* (R$ 97) e *Assistente TI Ninja* (R$ 9,90).
3. **Fórum (`comunidade.tininja.net`):** organizar dúvidas de aula e casos reais na *Bancada técnica* por assunto (Redes TCP/IP, Windows Server/AD, Hyper-V/Proxmox, OPNsense) para que conhecimento útil não se perca na rolagem.
4. **Autoavaliação (`avaliacao.tininja.net`):** validar aprendizado real por módulo (sem entregar resposta pronta quando erra, apontando exatamente qual aula rever) e emitir certificado em PDF verificável por código `TN-XXXX-XXXX` e QR Code.

## Positioning

Quem ensina é Eduardo Honorato (Campinas/SP), técnico que saiu do suporte e hoje opera seu próprio MSP, ensinando método de diagnóstico em rede e infraestrutura (Hyper-V, OPNsense, Windows Server/AD, Proxmox) sempre com base na documentação oficial do fabricante (Microsoft Learn, OPNsense, Proxmox) e precificação por resultado/recorrência. Não é escola de certificação Cisco/CCNA e não recomenda VMware como caminho principal.

## Operating Context

- **Site e LPs:** Landing pages VTSD não possuem links de saída no cabeçalho para preservar conversão; passam UTMs, `src`, `sck` e `fbclid` para o checkout da Hotmart e disparam Pixel mediante consentimento de cookies.
- **Fórum Discourse:** configurado com `login_required`, faixa superior de retorno para `tininja.net`, banner de boas-vindas para usuários logados com atalhos para Apresente-se, Bancada técnica e Regras. Qualquer evolução visual deve funcionar dentro das fronteiras do sistema de temas do Discourse (`common.scss`, color schemes, `settings.yml`, outlets de plugin Glimmer `.gjs`).
- **Autoavaliação:** acesso sem senha com código de 6 dígitos ou link mágico enviado ao e-mail da compra Hotmart, modos claro e escuro nativos, barra fixa de progresso durante a prova, resultado com mapa clicável de questões e bloco de revisão direcionada para a Hotmart, e verificação pública de certificado em `/verificar`.

## Capabilities and Constraints

- **Ofertas e valores reais vigentes (nunca inventar preços, bônus ou condições):**
  - *Fundamentos de Rede:* R$ 197 à vista ou 12x de R$ 20,37, acesso de 1 ano pela Hotmart, 7 dias de garantia; inclui Módulo 0 (Método), Módulo 1 (Redes e TCP/IP), Bônus de Virtualização, PDFs por aula, laboratório no VirtualBox, autoavaliação, certificado PDF, agente de IA na área de membros, fórum e grupo Exclusivo Alunos no WhatsApp. Não exibir carga horária nem contagem total de aulas na LP.
  - *Proxmox na Prática:* R$ 97 à vista ou até 12x, 5 módulos, acesso de 1 ano, 7 dias de garantia, apostila em PDF por aula, laboratório em VirtualBox.
  - *Assistente TI Ninja:* R$ 9,90 pagamento único (upsell consultor em chat treinado no curso, aceita arquivos de até 15 MB no navegador).
- **Ferramentas gratuitas:** Calculadora da hora (`Custo = (CF + R) / H`, `Preço mínimo = Custo / (1 - I - M)`, exemplo padrão R$ 75,00 custo e R$ 93,75 mínimo) e Calculadora de sub-rede.
- **Proibição estrita de invenção:** nunca fabricar números de alunos, faturamento, depoimentos, nomes de clientes/empresas ou escassez falsa. Comentários públicos do YouTube e Instagram já publicados nas LPs são dados reais autorizados pelo fundador.

## Brand Commitments

- **Nome e pronúncia:** TI Ninja (pronuncia-se "T I Ninja"). Fundador: Eduardo Honorato (Campinas/SP).
- **Identidade obrigatória preservada:** nome TI Ninja e o símbolo do conector RJ45 visto de frente formando a máscara ninja com os 8 fios (`assets/img/marca.svg`).
- **Restrição estética explícita do fundador:** rejeitou enfaticamente fundo escuro com roxo em 20/10/2026 ("de mau gosto"). Direções novas não podem usar tema escuro com roxo, gradientes roxos genéricos nem glassmorphism decorativo.
- **Voz:** português do Brasil direto, técnico para técnico, sem promessa fácil de renda nem jargão de guru.
- **Canais oficiais:** YouTube `https://www.youtube.com/@tininjaconsult` e Instagram `https://www.instagram.com/consult.tininja/`.
- **Rodapé institucional:** DIGITAL RAPIDO COMERCIO E SERVICOS LTDA · CNPJ 10.491.185/0001-38 · `contato@tininja.net`.

## Evidence on Hand

- Provas de produto e interface reais em `assets/img/`: `curso-dentro-pdf-960.webp`, `curso-dentro-lab-960.webp`, `curso-dentro-agente-960.webp`, `px-ws2025-4gb-960.webp`, `autoavaliacao-video-960.webp`, `curso-eduardo-560.webp`, `rede-1280.webp`, `msp-1280.webp`, `marca.svg`.
- Depoimentos reais e públicos já presentes nas LPs (`@ricardo_silva_ns`, `@joselio.samy`, `@jr.g0mes`, `@rafaellfariass`, `@silvioluizsilva`, `@projetoutah`, `@FernandoFelipetto`, `@marlonprates-m365`).
- Categorias reais do Discourse (`Avisos`, `Apresente-se`, `Dúvidas do curso`, `Bancada técnica`, `Links e materiais`) e modelo de tópico técnico.
- Banco real de questões por módulo e sistema de verificação pública `TN-XXXX-XXXX` da plataforma de autoavaliação.

## Product Principles

- **Evidência acima de promessa:** mostrar a conta, o sintoma, o teste e a documentação oficial antes de pedir ação.
- **Respeito ao modo da superfície:** páginas de vendas e home persuadem com clareza; ferramentas e autoavaliação priorizam precisão operacional; artigos e fórum priorizam leitura e resolução técnica.
- **Coerência ponta a ponta:** o técnico que descobre o canal no YouTube/Instagram, calcula sua hora no site, compra na LP, tira dúvida no fórum e emite certificado na autoavaliação deve sentir que está na mesma casa profissional.

## Accessibility & Inclusion

Experiência mobile-first obrigatória (técnicos acessam pelo celular em campo ou à noite), contraste WCAG AA (mínimo 4.5:1 para texto normal, 3:1 para títulos grandes e controles), foco visível consistente, suporte integral a acentuação em português (Latin/Latin-Ext) e respeito a `prefers-reduced-motion`.
