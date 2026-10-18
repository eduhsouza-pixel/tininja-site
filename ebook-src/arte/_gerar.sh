#!/usr/bin/env bash
# uso: _gerar.sh nome proporcao "cena"  (roda no diretório da arte)
nome=$1; prop=$2; cena=$3
w=${prop%:*}; h=${prop#*:}; [ $h -gt $w ] && ori=PORTRAIT || ori=LANDSCAPE
R=~/dev/tininja-site/assets/img
pedido="Use your built-in image generation tool (not code, not SVG, not Python drawing) to generate exactly one $ori $prop image. The first attached image is Reference Image 1 (style), the second is Reference Image 2 (style and character). Save the final PNG in the current directory as $nome.png and reply with just the saved path.

$(cat _estilo.txt)

SCENE: $cena"
rm -f "$nome.png"
echo "$pedido" | timeout 900 codex exec --skip-git-repo-check -s workspace-write -i $R/hero-1280.jpg -i $R/msp-1280.jpg - > "$nome.codex.log" 2>&1
[ -f "$nome.png" ] && echo "ok $nome" || echo "FALHOU $nome"
