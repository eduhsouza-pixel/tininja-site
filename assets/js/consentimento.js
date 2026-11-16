/*
 * Consentimento de cookies do tininja.net (só para o Meta Pixel).
 *
 * Como usar numa página com pixel:
 *   1. No <head>, defina window.tnPixelLigar = function(){ ...snippet do pixel, init, PageView... }
 *      e window.tnEv (que só chama fbq se ele existir).
 *   2. Carregue este arquivo: <script src="/assets/js/consentimento.js" defer></script>
 *
 * Sem aceite, o fbevents.js não é baixado e nenhum evento sai.
 * Aceite e recusa ficam em localStorage ("tn_consentimento" = "sim" | "nao").
 * Qualquer elemento com [data-consentimento-abrir] reabre o aviso
 * (a política de privacidade usa isso para a pessoa mudar a escolha).
 * Modo de teste (?tn_teste=1) continua valendo: tnPixelLigar não liga nada.
 */
(function () {
  var CHAVE = 'tn_consentimento';
  var lido = function () { try { return localStorage.getItem(CHAVE); } catch (e) { return null; } };
  var gravar = function (v) { try { localStorage.setItem(CHAVE, v); localStorage.setItem(CHAVE + '_data', new Date().toISOString()); } catch (e) {} };
  var ligar = function () { if (typeof window.tnPixelLigar === 'function') { try { window.tnPixelLigar(); } catch (e) {} } };

  window.tnConsentimento = function () { return lido(); };

  var css = '' +
    '.tn-cookies{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#16181d;color:#fff;' +
    'border-top:4px solid #f07f1a;padding:0.9rem clamp(1rem,4vw,2.5rem);font:inherit;font-size:0.95rem;line-height:1.45;' +
    'box-shadow:0 -6px 20px rgba(0,0,0,.18)}' +
    '.tn-cookies-in{max-width:72rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:0.7rem 1.2rem;align-items:center}' +
    '.tn-cookies p{margin:0;flex:1 1 22rem;max-width:none;color:#fff}' +
    '.tn-cookies a{color:#fff;font-weight:700;text-decoration:underline;text-underline-offset:.2em}' +
    '.tn-cookies-bt{display:flex;gap:0.6rem;flex:0 0 auto}' +
    '.tn-cookies button{font:inherit;font-weight:700;font-size:0.95rem;min-height:2.75rem;padding:0.5rem 1.1rem;border-radius:6px;cursor:pointer;border:2px solid #fff}' +
    '.tn-cookies .tn-sim{background:#f07f1a;border-color:#f07f1a;color:#16181d}' +
    '.tn-cookies .tn-nao{background:transparent;color:#fff}' +
    '.tn-cookies button:focus-visible{outline:3px solid #2b6cd9;outline-offset:3px}';

  var aviso = null;
  var fechar = function () { if (aviso) { aviso.remove(); aviso = null; } };

  var abrir = function () {
    if (aviso) return;
    if (!document.getElementById('tn-cookies-css')) {
      var st = document.createElement('style');
      st.id = 'tn-cookies-css';
      st.textContent = css;
      document.head.appendChild(st);
    }
    aviso = document.createElement('div');
    aviso.className = 'tn-cookies';
    aviso.setAttribute('role', 'region');
    aviso.setAttribute('aria-label', 'Aviso de cookies');
    aviso.innerHTML =
      '<div class="tn-cookies-in">' +
      '<p>Este site usa o pixel da Meta (Facebook e Instagram) para medir os anúncios. Ele só liga se você aceitar. ' +
      '<a href="/politica-de-privacidade/#cookies">Saiba mais</a></p>' +
      '<div class="tn-cookies-bt">' +
      '<button type="button" class="tn-nao">Recusar</button>' +
      '<button type="button" class="tn-sim">Aceitar</button>' +
      '</div></div>';
    aviso.querySelector('.tn-sim').addEventListener('click', function () { gravar('sim'); fechar(); ligar(); });
    aviso.querySelector('.tn-nao').addEventListener('click', function () {
      var antes = lido();
      gravar('nao');
      fechar();
      // Quem aceitou antes e agora recusa: recarrega para descarregar o pixel desta aba.
      if (antes === 'sim' && window.fbq) location.reload();
    });
    document.body.appendChild(aviso);
  };

  var iniciar = function () {
    document.addEventListener('click', function (e) {
      var alvo = e.target.closest && e.target.closest('[data-consentimento-abrir]');
      if (alvo) { e.preventDefault(); abrir(); }
    });
    var v = lido();
    if (v === 'sim') { ligar(); return; }
    if (v === 'nao') return;
    // Só pergunta onde existe pixel para ligar (páginas sem pixel não mostram o aviso sozinhas).
    if (typeof window.tnPixelLigar === 'function') abrir();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
