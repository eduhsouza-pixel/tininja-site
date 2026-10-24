# Artigos da TI Ninja

HTML estático, sem build e sem JavaScript de execução nas páginas editoriais. O modelo reutilizável é [`o-que-e-dhcp/index.html`](o-que-e-dhcp/index.html): copie o arquivo completo, incluindo metadados, sumário, caixas, FAQ, fontes, leitura relacionada e CTA. Não há uma página de modelo vazia publicada ou indexável.

## Design e voz

Use `assets/css/site.css`, a marca SVG e as fontes Almarai locais. A implementação atual e as páginas de `/comandos/` são a referência T568B: fundo branco, tinta escura, fascia, placas e rodapé com as oito cores dos fios. `DESIGN.md` e a seção antiga de marca no README principal ainda descrevem o tema anterior; não reintroduza esse tema nos artigos. As regras editoriais de `PRODUCT.md` continuam valendo.

As novas classes têm escopo `.artigos`/`.artigo`; caixas de dica e cuidado reutilizam `.cuidado`, comandos usam `.cmd`, fontes usam `.fontes`, divisões usam `.passo` e botões usam `.placa`. A grade usa os tokens existentes, sem paleta ou biblioteca nova. O guia mantém a referência marrom; a placa do curso usa o laranja existente.

Escreva em português do Brasil, de técnico para técnico. Use sempre **Analista de Infraestrutura e Redes**. Explique conceitos, sem vender um fabricante, sem promessas de renda e sem inventar depoimentos, números comerciais ou preços. Endereços de laboratório devem ser identificados como exemplos didáticos. Não cite OPNsense/pfSense em artigos de conceito. A formação NOC (Ninja Official Curriculum) só entra na ponte final.

## Duplicar o modelo

1. Crie `artigos/<slug>/` e copie `artigos/o-que-e-dhcp/index.html` para `index.html`. Use slug curto, minúsculo e com hífens.
2. Troque H1, lede, texto, categoria, autoria se necessário e datas **reais**. Não atualize a data de um artigo apenas porque o menu mudou. Os pilotos usam 24/10/2026 como data editorial desta entrega; antes de uma publicação em outra data, revise as datas visíveis, metadados e sitemap juntos.
3. Troque `title`, description, canonical, todos os metadados Open Graph/Twitter e o JSON-LD. A URL sempre é `https://tininja.net/artigos/<slug>/`, com barra final. A imagem social atual é a marca existente, apropriada ao cartão `summary`; não invente uma imagem ou use URL inexistente.
4. No JSON-LD, atualize `Article` (incluindo `@id`, `mainEntityOfPage`, `headline`, `articleSection`, `datePublished` e `dateModified`), `BreadcrumbList` (nome e URL da última migalha) e `FAQPage`. Cada pergunta e resposta deve ser **idêntica** à respectiva dupla `summary`/`p` no FAQ visível. Não crie perguntas só para o buscador. O hub também descreve sua coleção com `CollectionPage`.
5. Mantenha um único H1. Use H2 para seções e H3 para subdivisões. Cada seção recebe um `id` único e um link no sumário. Migalhas e sumário têm seus próprios nomes acessíveis; FAQ usa `details`/`summary` nativos.
6. Use `.cuidado` com o rótulo textual “Dica” ou “Cuidado”; não dependa só da cor. Tabelas precisam de `caption`, cabeçalhos e `scope`. Imagens adicionais precisam de `alt`, largura e altura. Evite imagem se ela não ajudar a explicar.
7. Abra e leia as fontes oficiais. Confira também a resposta HTTP com `curl -fL --max-time 30 -o /tmp/fonte.html -w '%{http_code}\n' 'URL'`. HTTP 200 sozinho não basta: confira se o corpo contém a documentação, e não uma página de bloqueio. Ligue cada afirmação técnica à fonte que a sustenta e registre a data de consulta no bloco “Fontes oficiais”.
8. Atualize “Leia também” e os links contextuais para `/calculadora-sub-rede/` e `/comandos/` quando úteis. Preserve o CTA final para `/quanto-cobrar/` e `/fundadora/`, sem dependências ou rastreadores novos.

## Adicionar ao hub e integrar

- Duplique um `<li>` da `.lista-comandos` em `artigos/index.html` para listar o artigo. Não há cadastro em JavaScript.
- Acrescente o link no `.artigo-card` da categoria correspondente. As quatro categorias já existem; remova o aviso de categoria vazia quando entrar o primeiro artigo de Carreira em redes. Links para ferramentas são recursos complementares, não artigos inexistentes.
- Acrescente a URL em `CollectionPage.hasPart` no JSON-LD do hub. Revise a data do hub após modificar seu conteúdo editorial.
- Acrescente `<url>`, `<loc>` e `<lastmod>` em `sitemap.xml`. Nunca acrescente páginas de obrigado ou um modelo vazio.
- Rode `python3 scripts/layout.py` e `python3 calculadora-sub-rede/src/build.py`. O script descobre automaticamente `artigos/**/index.html`; não é preciso cadastrar cada artigo. Só o hub marca “Artigos” com `aria-current="page"`; os artigos têm a própria migalha atual.
- O workflow copia `artigos/` para o artefato e remove este README. Não são necessários builds nem configuração de publicação por artigo. Executar o script da calculadora aqui apenas mantém seu HTML já versionado sincronizado.

## Conferência antes do commit

```bash
python3 scripts/layout.py --check
node --test tests/hora.test.mjs
(cd calculadora-sub-rede/src && node test.js)
python3 -m http.server 4173
```

Abra o hub e o novo artigo em `http://127.0.0.1:4173/`, no celular (390px) e desktop. Teste navegação por teclado, sumário, FAQ e CTAs. Confira que a fascia não cobre o título ao seguir uma âncora, que tabelas e comandos não provocam rolagem horizontal da página e que o texto funciona sem JS.

No console do navegador, valide os dados estruturados com:

```js
[...document.querySelectorAll('script[type="application/ld+json"]')]
  .map(node => JSON.parse(node.textContent));
```

Confira também links internos (incluindo fragmentos e recursos locais), ordem dos headings, imagens com dimensões e correspondência das respostas do FAQ. Nos pilotos, mantenha de 800 a 1.400 palavras por artigo. As capturas desta entrega ficam fora do repositório, em `/workspace/screens-artigos/`.

JSON válido não garante exibição especial no Google; o conteúdo visível é a referência editorial. A entrega local não publica as páginas: commits são feitos em `artigos-seo`, sem push.

## Fontes conferidas nesta rodada

Todas as URLs citadas nos pilotos responderam HTTP 200 via `curl -fL` em 24/10/2026, com conteúdo lido:

- RFC Editor / IETF: RFC 2131 (negociação e concessão), RFC 2132 (opções), RFC 1918 (endereços privados).
- Microsoft Learn: visão geral de DHCP, `ipconfig` e APIPA.
- TP-Link: FAQ 87, conexão e acesso ao painel. A fonte documenta um fabricante; os passos dos artigos deixam explícito que o endereço e as telas dependem do modelo.
- Governo de Massachusetts: troca de senha padrão e desativação da administração remota.
- Centro Canadense de Segurança Cibernética: UPnP, encaminhamento automático de portas, desativação e possíveis dependências.
