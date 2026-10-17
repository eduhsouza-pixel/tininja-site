# TI Ninja

Site estático de [tininja.net](https://tininja.net/). HTML, CSS e JavaScript na raiz do repositório. Não há backend nem passo de build.

## Como publicar

O workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) publica no GitHub Pages a partir da branch `main`. Ele copia só o que o visitante precisa (`index.html`, `404.html`, `minha-hora/`, `quanto-cobrar/`, `lp/` se existir, `assets/`, `robots.txt`, `sitemap.xml`, `site.webmanifest`).

No repositório: Settings → Pages → Build and deployment → **GitHub Actions**.

Ainda não existe arquivo `CNAME`. O domínio próprio entra depois que o DNS for aprovado. Enquanto isso, os links canônicos e o Open Graph apontam para `https://tininja.net/`.

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
| `/quanto-cobrar/` | E-book “Quanto cobrar em TI em 2026”, em breve, com formulário de e-mail |
| `/404.html` | Página não encontrada |
| `/lp/<nome>/` | Landing pages novas |

A calculadora roda no navegador.

- Custo da hora = (custos fixos + retirada) / horas faturáveis
- Preço mínimo = custo / (1 − impostos − margem), com os percentuais somados abaixo de 100% e horas maiores que zero

Conferência: custos + retirada = R$ 8.000, 160 horas → custo R$ 50,00; imposto + margem = 20% → preço R$ 62,50. O teste está em `tests/hora.test.mjs` (`node --test tests/hora.test.mjs`).

O formulário do e-book não envia a lugar nenhum. O `action` fica marcado com um comentário `TODO` até existir um serviço de e-mail.

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
