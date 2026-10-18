# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: plain static HTML, CSS, and JavaScript served from the repository root on GitHub Pages. The brief allowed a static generator or plain files; plain files were chosen so the site has no build step, stays fast, and maps clean URLs (`/minha-hora/`, `/quanto-cobrar/`, `/lp/<name>/`) to folders.

## Users

Técnicos de suporte de TI no Brasil que querem sair do papel de “apagador de incêndio” e avançar para administração de redes e infraestrutura, e para tocar o próprio negócio de MSP (serviços gerenciados). Eles avaliam o site no celular, muitas vezes fora do expediente.

## Product Purpose

O site da TI Ninja (tininja.net) apresenta o caminho do técnico até a administração de redes e até um MSP próprio, e entrega duas ferramentas gratuitas: a calculadora “Quanto vale a sua hora” e o guia “Quanto cobrar em TI em 2026”. Sucesso é o visitante entender para quem é, o que se aprende, quem é o Eduardo, e agir (calculadora ou o guia).

## Positioning

Quem ensina é um técnico que virou dono de MSP, não uma escola genérica de certificação. O mecanismo visível nesta versão é a conta da hora técnica — custo e preço mínimo — feita na hora, com a mesma lógica de uma planilha que o visitante pode copiar.

## Operating Context

Site estático, sem backend. A captura do guia em `/quanto-cobrar/` posta em `LEAD_ENDPOINT` (`assets/js/site.js`), a URL `/exec` do Apps Script, e só redireciona quando o JSON traz `ok: true`. A página `/quanto-cobrar/obrigado/` é `noindex`. A calculadora roda no navegador. Há um atalho para copiar a planilha no Google Sheets. Conteúdo recente aponta para YouTube e Instagram. Idioma visível: português do Brasil.

## Capabilities and Constraints

- Páginas desta versão: home, `/minha-hora/`, `/quanto-cobrar/` (captura do guia), `/quanto-cobrar/obrigado/` (noindex), 404.
- Novas landing pages entram em `/lp/<name>/`.
- Calculadora: custos fixos mensais (CF), retirada desejada (R), horas faturáveis (H), impostos % (I), margem % (M). Custo da hora = (CF+R)/H. Preço mínimo = custo/(1−I−M). Exige H>0 e I+M<100%.
- Conferência, exemplo fictício do guia: CF R$ 1.000, R R$ 5.000, H 80 horas faturáveis, I 10%, M 10% → custo R$ 75,00 e preço mínimo R$ 93,75.
- Não inventar números, depoimentos, contagem de alunos, faturamento, nomes de clientes, empresas, fabricantes, preços de curso ou garantias. Sem escassez falsa. O que faltaria dado fica em comentário HTML TODO.
- Arquivo `CNAME` com `tininja.net`. O DNS no provedor do domínio ainda é externo.
- Imagens de pessoa são as quatro peças enviadas pelo autor; não usar foto de estoque.

## Brand Commitments

- Nome: TI Ninja. Domínio: tininja.net (`CNAME` no repositório; DNS no provedor).
- Fundador: Eduardo Honorato, Campinas/SP. Começou como técnico, trabalhou numa multinacional (não nomear), hoje toca o próprio MSP (não nomear a empresa nem citar cifras).
- Logos: `uploads` originais; no site, marca colorida em fundo escuro e marca clara onde o fundo pedir.
- Cores amostradas do logo colorido: verde-limão `#92C417`, roxo `#44335C`, sobre fundo escuro próximo do preto.
- YouTube: https://www.youtube.com/@tininjaconsult
- Instagram: https://www.instagram.com/consult.tininja/
- Voz: português do Brasil, direto, de técnico para técnico. Sem promessa de renda.

## Evidence on Hand

- Logos amostrados: verde `#92C417`, roxo `#44335C`.
- Fotos enviadas para os slots: hero (ninja à direita, vazio à esquerda), rede, MSP, calculadora. Todas 16:9, geradas, sem pessoas reais de estoque.
- Planilha: https://docs.google.com/spreadsheets/d/1T56l2xeBYylC_3cJQ-Hs3r6veyafsEjzD5A6wfoIFFw/copy
- Ausências que não podem ser fabricadas: depoimentos, número de alunos, faturamento, nomes de clientes ou fornecedores, preço de curso, garantia de resultado.

## Product Principles

- Mostrar a conta, não o discurso de guru.
- Falar com quem ainda apaga incêndio e quer infraestrutura e recorrência.
- Cada cifra na tela sai de um campo que o visitante preencheu, ou não entra.
- A página gratuita tem que funcionar no celular, no teclado e sem esperar servidor.

## Accessibility & Inclusion

O brief pede acessível, mobile-first e Lighthouse forte (meta 90+). Texto e controles precisam de contraste legível, foco visível, rótulos reais e redução de movimento respeitada.
