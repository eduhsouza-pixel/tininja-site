#!/usr/bin/env python3
"""Menu e rodapé únicos do site.

O site não tem build: cada página carrega o próprio HTML. Este script grava o mesmo
cabeçalho e o mesmo rodapé em todas elas, entre os marcadores
<!-- nav:inicio --> ... <!-- nav:fim --> e <!-- rodape:inicio --> ... <!-- rodape:fim -->.

    python3 scripts/layout.py          # aplica
    python3 scripts/layout.py --check  # só confere (sai com 1 se alguma página divergir)

Depois de aplicar, rode também `python3 calculadora-sub-rede/src/build.py`
(a página da sub-rede é gerada a partir do template).
"""
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent

# (caminho do link, rótulo). A ordem é a do menu.
MENU = [
    ("/", "Início"),
    ("/calculadora-sub-rede/", "Sub-rede"),
    ("/minha-hora/", "Minha hora"),
    ("/quanto-cobrar/", "E-book"),
    ("/fundadora/", "Curso"),
]

RODAPE_LINKS = MENU + [("/comandos/", "Comandos dos vídeos")]

# Página → URL publicada (para marcar aria-current).
PAGINAS = {
    "index.html": "/",
    "404.html": None,
    "minha-hora/index.html": "/minha-hora/",
    "quanto-cobrar/index.html": "/quanto-cobrar/",
    "quanto-cobrar/obrigado/index.html": None,
    "fundadora/index.html": "/fundadora/",
    "fundadora/obrigado/index.html": None,
    "comandos/index.html": "/comandos/",
    "comandos/firewall-do-windows/index.html": None,
    "politica-de-privacidade/index.html": None,
    "calculadora-sub-rede/src/template.html": "/calculadora-sub-rede/",
}


def link(href, rotulo, atual):
    cur = ' aria-current="page"' if href == atual else ""
    return f'<a href="{href}"{cur}>{rotulo}</a>'


def cabecalho(atual):
    itens = "\n".join(f"      {link(h, r, atual)}" for h, r in MENU)
    return f"""<!-- nav:inicio -->
  <header class="fascia">
    <a class="marca" href="/">
      <img src="/assets/img/marca.svg" alt="" width="64" height="64">
      TI Ninja
    </a>
    <nav aria-label="Principal">
{itens}
    </nav>
  </header>
  <!-- nav:fim -->"""


def rodape(atual):
    itens = "\n".join(f"      {link(h, r, atual)}" for h, r in RODAPE_LINKS)
    return f"""<!-- rodape:inicio -->
  <footer class="rodape">
    <div class="rodape-marca">
      <a class="marca" href="/">
        <img src="/assets/img/marca.svg" alt="" width="64" height="64">
        TI Ninja
      </a>
      <p>TI Ninja · Campinas/SP</p>
    </div>
    <nav aria-label="No rodapé">
{itens}
    </nav>
    <nav aria-label="Redes">
      <a href="https://www.youtube.com/@tininjaconsult">YouTube</a>
      <a href="https://www.instagram.com/consult.tininja/">Instagram</a>
    </nav>
    <p><a href="/politica-de-privacidade/">Política de Privacidade</a> · DIGITAL RAPIDO COMERCIO E SERVICOS LTDA · CNPJ 10.491.185/0001-38 · <a href="mailto:contato@tininja.net">contato@tininja.net</a></p>
    <p>© 2026 TI Ninja</p>
  </footer>
  <!-- rodape:fim -->"""


def trocar(html, ini, fim, bloco, legado):
    """Troca o trecho entre marcadores; na primeira vez, troca o elemento legado."""
    marcado = re.compile(re.escape(ini) + r".*?" + re.escape(fim), re.S)
    if marcado.search(html):
        return marcado.sub(lambda _: bloco, html, count=1)
    antigo = re.compile(legado, re.S)
    if not antigo.search(html):
        raise SystemExit(f"não achei {legado!r}")
    return antigo.sub(lambda _: bloco, html, count=1)


def aplicar(caminho, atual):
    html = caminho.read_text(encoding="utf-8")
    novo = trocar(html, "<!-- nav:inicio -->", "<!-- nav:fim -->", cabecalho(atual),
                  r'<header class="fascia">.*?</header>')
    novo = trocar(novo, "<!-- rodape:inicio -->", "<!-- rodape:fim -->", rodape(atual),
                  r'<footer class="rodape">.*?</footer>')
    return html, novo


def main():
    so_conferir = "--check" in sys.argv
    divergentes = []
    for rel, atual in PAGINAS.items():
        caminho = RAIZ / rel
        html, novo = aplicar(caminho, atual)
        if html != novo:
            divergentes.append(rel)
            if not so_conferir:
                caminho.write_text(novo, encoding="utf-8")
    if so_conferir and divergentes:
        print("menu/rodapé fora do padrão em:", *divergentes, sep="\n  ")
        sys.exit(1)
    print("ok" if not divergentes else "atualizado: " + ", ".join(divergentes))


if __name__ == "__main__":
    main()
