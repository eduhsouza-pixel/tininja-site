# TI Ninja

Site estático de [tininja.net](https://tininja.net/). HTML, CSS e JavaScript na raiz do repositório. Não há backend nem passo de build.

## Como publicar

O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publica no GitHub Pages a partir da branch `main`. Ele copia só o que o visitante precisa (`index.html`, `404.html`, `minha-hora/`, `quanto-cobrar/`, `comandos/`, `politica-de-privacidade/`, `lp/` se existir, `assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest`, `CNAME`). `ebook-src/` e `scripts/` ficam de fora.

No repositório: Settings → Pages → Build and deployment → **GitHub Actions**.

O arquivo `CNAME` contém `tininja.net`. Os links canônicos e o Open Graph já usam `https://tininja.net/`. O DNS no provedor do domínio (apontando para o GitHub Pages) continua sendo um passo fora do repositório.

Para ver localmente, na raiz:

```bash
python3 -m http.server 4173
```

Abra `http://127.0.0.1:4173/`.

## Páginas

| Caminho | O que é |
| --- | --- |
| `/` | Home |
| `/minha-hora/` | Calculadora “Quanto vale a sua hora” |
| `/quanto-cobrar/` | Captura do guia gratuito “Quanto cobrar em TI em 2026” |
| `/quanto-cobrar/obrigado/` | Download do PDF, calculadora e canais. `noindex`, fora do sitemap |
| `/comandos/` | Índice dos comandos mostrados nos vídeos |
| `/comandos/<tema>/` | Comandos de um vídeo, com botão de copiar (`assets/js/comandos.js`) e fontes oficiais |
| `/politica-de-privacidade/` | Política de privacidade. Os trechos `[CPF ou CNPJ]`, `[endereço completo]` e `[e-mail de contato/privacidade]` continuam em destaque até o Eduardo preencher |
| `/404.html` | Página não encontrada |
| `/lp/<nome>/` | Landing pages novas |

A calculadora roda no navegador.

- Custo da hora = (custos fixos + retirada) / horas faturáveis
- Preço mínimo = custo / (1 − impostos − margem), com os percentuais somados abaixo de 100% e horas maiores que zero

Conferência, o exemplo fictício do guia: custos fixos R$ 1.000, retirada R$ 3.000, 80 horas faturáveis, imposto 10% e margem 10% → custo R$ 50,00 e preço mínimo R$ 62,50. O teste está em `tests/hora.test.mjs` (`node --test tests/hora.test.mjs`).

O formulário de `/quanto-cobrar/` posta na URL de `LEAD_ENDPOINT` em `assets/js/site.js` (o `/exec` do Google Apps Script). O POST usa `URLSearchParams` (pedido CORS simples, sem header customizado), `mode: "cors"` e `credentials: "omit"`. O script responde HTTP 200 com `{ok:true}` ou `{ok:false,error}`. A página só abre `/quanto-cobrar/obrigado/` se `response.ok` e o JSON tem `ok === true`. Caso contrário, mostra o erro e fica na página. Se a constante ficar vazia, o envio é bloqueado e não há redirecionamento.

Campos: `nome`, `email`, `whatsapp` (opcional), `optin` (opcional, não é condição para o guia), `optin_whatsapp` (opcional) e os ocultos `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, lidos da URL, além do honeypot `website` (fora da tela). Sem `optin`, a página abre o obrigado e não envia nada. O número de WhatsApp só entra no POST se `optin` e `optin_whatsapp` estiverem marcados. O teste em `tests/hora.test.mjs` confere a URL `/exec` e essa regra.

Abaixo do formulário, a aula “Quanto cobrar em TI: a conta que ninguém te ensinou” fica numa capa clicável. O iframe do `youtube-nocookie` só entra depois do clique. A mesma aula está em `/quanto-cobrar/obrigado/`, abaixo do download.

O PDF público é `assets/ebook/quanto-cobrar-ti-2026.pdf`. O texto-fonte, com as notas que não entram no PDF, está em `ebook-src/quanto-cobrar-ti-2026.md`. O script troca apenas `[LINK DA PLANILHA]` pelo link da calculadora e pela cópia da planilha. Para gerar de novo:

```bash
npm install --prefix /tmp/ebook-tools marked
node scripts/build-ebook.mjs
```

## Landing page nova

Crie a pasta e um `index.html`:

```bash
mkdir -p lp/nome-da-campanha
```

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Nome da campanha — TI Ninja</title>
  <meta name="description" content="Uma frase verdadeira sobre esta página.">
  <link rel="canonical" href="https://tininja.net/lp/nome-da-campanha/">
  <link rel="stylesheet" href="/assets/css/site.css">
</head>
<body>
  <header class="fascia">
    <div class="tubo" aria-hidden="true"></div>
    <a class="marca" href="/"><img src="/assets/img/logo-nav.webp" alt="TI Ninja" width="480" height="154"></a>
  </header>
  <main id="conteudo" class="aviso">
    <h1>Título da campanha</h1>
    <p>Texto em português do Brasil. Sem número, depoimento ou preço inventado.</p>
    <a class="placa placa-lima" href="/minha-hora/">Calcular minha hora</a>
  </main>
</body>
</html>
```

O endereço público fica `/lp/nome-da-campanha/`. Inclua a URL no `sitemap.xml`. Reaproveite `assets/css/site.css` e, se a página tiver a calculadora, `assets/js/site.js` com um `<form data-calc>`.

## Imagens

As fotos de pessoa são ilustrações enviadas para o site, não banco de imagens. Cada uma sai em WebP (640, 960 e 1280) e um JPG de reserva em 1280. O hero não usa lazy-load. As outras usam.

| Slot | Arquivos |
| --- | --- |
| Hero da home | `assets/img/hero-640.webp`, `hero-960.webp`, `hero-1280.webp`, `hero-1280.jpg` |
| Seção de redes | `assets/img/rede-*` |
| Seção de MSP | `assets/img/msp-*` |
| Calculadora e Open Graph dela | `assets/img/calculadora-*` |

Para trocar uma foto, gere de novo esses quatro arquivos com o mesmo nome (largura máxima 1280, que é a resolução original). Logos mestres ficam em `brand/` (cor para fundo escuro, versão clara para fundo claro). O favicon sai do logo colorido.

## Marca

Cores amostradas do logo: verde-limão `#92C417`, roxo `#44335C`, sobre o escuro `#100E12`.

Fontes auto-hospedadas, licença OFL: Darker Grotesque e Atkinson Hyperlegible (`assets/fonts/`).

## O que não entra no site

Não publicar número de aluno, faturamento, depoimento, nome de cliente, empresa ou fabricante, preço de curso ou garantia sem fonte. Se uma seção depender disso, deixe um comentário HTML `TODO` em vez de inventar o dado.
