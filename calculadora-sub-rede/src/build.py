import re, json, html
from pathlib import Path

src = Path(__file__).resolve().parent
t = (src / "template.html").read_text()
core = (src / "core.js").read_text().replace("if(typeof module", "if(0&&typeof module")
faq = re.findall(r"<details><summary>(.*?)</summary><p>(.*?)</p></details>", t)
strip = lambda s: html.unescape(re.sub("<sup>(.*?)</sup>", r"^\1", s))
ld = {"@context": "https://schema.org", "@graph": [
{"@type": "WebApplication", "name": "Calculadora de Sub-rede TI Ninja", "url": "https://tininja.net/calculadora-sub-rede/", "applicationCategory": "UtilitiesApplication", "operatingSystem": "Any", "browserRequirements": "Requer JavaScript", "inLanguage": "pt-BR", "description": "Calculadora de sub-rede IPv4 e IPv6 com CIDR, máscara, wildcard, binário e divisão VLSM.", "offers": {"@type": "Offer", "price": "0", "priceCurrency": "BRL"}, "author": {"@type": "Person", "name": "Eduardo Honorato", "sameAs": ["https://www.youtube.com/@tininjaconsult"]}},
{"@type": "BreadcrumbList", "itemListElement": [{"@type": "ListItem", "position": 1, "name": "Início", "item": "https://tininja.net/"}, {"@type": "ListItem", "position": 2, "name": "Calculadora de sub-rede", "item": "https://tininja.net/calculadora-sub-rede/"}]},
{"@type": "FAQPage", "mainEntity": [{"@type": "Question", "name": strip(q), "acceptedAnswer": {"@type": "Answer", "text": strip(a)}} for q, a in faq]}]}
out = t.replace("JSONLD", json.dumps(ld, ensure_ascii=False, separators=(",", ":"))).replace("/*CORE*/", core)
dest = src.parent / "index.html"
dest.write_text(out)
print(len(out.encode()) / 1024, "KB", len(faq), "FAQ", "->", dest)
