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
    '.tn-cookies{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#0E223D;color:#FFFFFF;' +
    'border-top:2px solid #E88B00;padding:14px clamp(16px,3.5vw,36px);font:inherit;font-size:0.9375rem;line-height:1.45}' +
    '.tn-cookies-in{max-width:1220px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px 20px;align-items:center}' +
    '.tn-cookies p{margin:0;flex:1 1 22rem;max-width:none;color:#FFFFFF}' +
    '.tn-cookies a{color:#DCEBFA;font-weight:700;text-decoration:underline;text-underline-offset:.2em}' +
    '.tn-cookies-bt{display:flex;gap:10px;flex:0 0 auto}' +
    '.tn-cookies button{font-family:var(--display,"Chakra Petch",sans-serif);font-weight:700;font-size:0.9375rem;min-height:44px;padding:8px 18px;border-radius:2px;cursor:pointer;border:1px solid #C2D4E6}' +
    '.tn-cookies .tn-sim{background:#E88B00;border-color:#B86E00;color:#101722}' +
    '.tn-cookies .tn-nao{background:transparent;color:#FFFFFF}' +
    '.tn-cookies button:focus-visible{outline:2px solid #FFFFFF;outline-offset:2px}';

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
      '<p>Uso o pixel da Meta (Facebook e Instagram) para saber quais anúncios trazem gente para cá. Ele só liga se você aceitar, e dá para mudar a escolha quando quiser. ' +
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
