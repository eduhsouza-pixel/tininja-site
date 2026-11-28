/**
 * TI Ninja — ponte formulário -> E-goi para a inscrição da aula de 26/11/2026.
 *
 * Destino: Lista 1 ("TI Ninja · e-mails do Eduardo"). Aplica só a tag
 * aula-26-11 (tag_id 4). NÃO aplica a tag quanto-cobrar (tag_id 5).
 * Com o gatilho da Boas-vindas trocado para "Tag adicionada: quanto-cobrar",
 * quem se inscreve só na aula não recebe o guia.
 *
 * v2 (15/11/2026): igual à versão no ar, mais a pesquisa da página de
 * obrigado (acao=pesquisa). A inscrição não mudou.
 *
 * v3 (16/11/2026): depois da inscrição gravada e da tag aplicada, envia o
 * evento Lead à API de Conversões da Meta (servidor → Meta), para a Meta
 * contar quem se inscreveu sem ter aceitado os cookies. Regras:
 *   - NÃO envia se a pessoa clicou em "Recusar" no aviso de cookies
 *     (a página manda consentimento=nao);
 *   - e-mail, telefone e primeiro nome vão em SHA-256, nunca em texto;
 *   - usa o mesmo event_id do fbq('track','Lead') da página, então a Meta
 *     descarta o duplicado de quem aceitou os cookies;
 *   - falha na Meta nunca derruba a inscrição (só vai para o log);
 *   - sem META_CAPI_TOKEN nas propriedades, a v3 se comporta como a v2.
 * Propriedades novas (só o Eduardo cola, no editor do Apps Script):
 *   META_CAPI_TOKEN       = token gerado no Gerenciador de Eventos → pixel
 *                           839957353977860 → Configurações → API de Conversões
 *   META_PIXEL_ID         = 839957353977860 (opcional, é o padrão)
 *   META_TEST_EVENT_CODE  = código da aba "Testar eventos" (só durante o teste;
 *                           APAGAR depois, senão os eventos não contam)
 * Para ligar a v3: colar este arquivo no lugar do Code.gs, salvar,
 * Implantar → Gerenciar implantações → lápis → Nova versão → Implantar
 * (a URL /exec não muda). Antes de implantar, rodar testarCapi() no editor
 * com META_TEST_EVENT_CODE preenchido e ver o evento na aba "Testar eventos".
 *
 * Para ligar a v2 (só o Eduardo, logado na conta Google dona da ponte):
 *   1. script.google.com → projeto tininja-egoi-bridge-aula → Code.gs:
 *      colar este arquivo inteiro no lugar do atual e salvar.
 *   2. Na barra de cima, escolher a função configurarCamposPesquisa e
 *      clicar em Executar (uma vez). Ela cria na Lista 1 os campos extras
 *      aula_faz_hoje, aula_trava, aula_em_2027 e aula_ultimo_problema
 *      (se ainda não existirem) e grava os ids nas propriedades do script.
 *   3. Implantar → Gerenciar implantações → lápis na implantação atual →
 *      Versão: "Nova versão" → Implantar. A URL /exec continua a mesma,
 *      então o site não muda.
 *      Na primeira execução o Google pede autorização. A v2 pede um escopo
 *      novo, "Enviar e-mail como você" (https://www.googleapis.com/auth/script.send_mail),
 *      por causa do e-mail de confirmação; os outros (UrlFetch, propriedades)
 *      já estavam autorizados.
 *   4. Teste: responder a pesquisa no obrigado depois de se inscrever com o
 *      próprio e-mail; os 4 campos aparecem no contato, na Lista 1.
 *      O e-mail de confirmação chega uma vez só. Para testar de novo com o
 *      mesmo endereço, editar EMAIL_RESET em resetConfirmacaoTeste() e executar.
 *
 * E-mail de confirmação (v2): depois de gravar o contato e aplicar a tag,
 * envia pelo MailApp (conta Google dona do script) o texto validado pelo
 * Lightcopy (/workspace/lightcopy/email-confirmacao-aula.md). Remetente
 * exibido "Eduardo Honorato · TI Ninja", resposta para eduardo@tininja.net.
 * Uma vez por e-mail: marca "conf_<sha256 do e-mail>" nas propriedades.
 * Cota do MailApp: 100 destinatários/dia em conta Gmail comum,
 * 1.500/dia em Google Workspace. Passando da cota, a inscrição continua
 * funcionando e só o e-mail deixa de sair (fica no log de execuções).
 *
 * A chave da API NUNCA fica neste arquivo. Propriedades do script:
 *   EGOI_API_KEY              = chave da API E-goi (já usada pela ponte atual)
 *   EGOI_LIST_ID              = 1  (Lista 1 — "TI Ninja · e-mails do Eduardo")
 *   EGOI_TAG_AULA             = 4  (tag "aula-26-11", já existe na conta)
 *   EGOI_FIELD_OPTIN          = 2  (campo extra "optin" da Lista 1)
 *   EGOI_FIELD_OPTIN_WHATSAPP = 3  (campo extra "optin_whatsapp" da Lista 1)
 *   EGOI_FIELD_AULA_FAZ_HOJE, EGOI_FIELD_AULA_TRAVA, EGOI_FIELD_AULA_EM_2027,
 *   EGOI_FIELD_AULA_ULTIMO_PROBLEMA = gravadas por configurarCamposPesquisa()
 *
 * Pesquisa (acao=pesquisa): recebe pesquisa_email (NUNCA "email"), faz_hoje,
 * faz_hoje_outro, trava ("a|b"), trava_outro, em_2027, em_2027_outro,
 * ultimo_problema, origem e website (honeypot). Localiza o contato da Lista 1
 * pelo e-mail e grava as respostas nos campos extras. Não cria contato, não
 * mexe em nome, celular, optin nem tags. Sem contato achado: { ok:false }.
 *
 * A página em /aula/ envia POST application/x-www-form-urlencoded
 * (fetch, mode: cors, credentials: omit, body = URLSearchParams).
 * Espera HTTP 2xx com JSON { ok: true } e, só então, redireciona
 * no navegador para https://tininja.net/aula/obrigado/.
 * Este script devolve exatamente isso. Não usar redirect HTTP:
 * o Apps Script não deixa definir Location / CORS, e o JS da
 * página só avança quando lê data.ok === true.
 *
 * Comportamento:
 *   - grava a inscrição mesmo se a caixa de conteúdos (optin) estiver
 *     desmarcada — o link e os lembretes da aula não dependem dela;
 *   - WhatsApp vai no campo nativo cellphone (formato 55-DDDNÚMERO);
 *   - optin e optin_whatsapp são campos extras separados (sim/nao);
 *     preencher o número não implica consentimento de marketing no
 *     WhatsApp — optin_whatsapp só fica "sim" se o pedido trouxer isso
 *     de forma explícita (o formulário atual não tem essa caixa);
 *   - aplica a tag aula-26-11 em contato novo E em contato que já
 *     existia (o 409 não pode ser tratado como sucesso vazio);
 *   - ignora honeypot "website";
 *   - aceita origem, utm_*.
 */

var EGOI_BASE = 'https://api.egoiapp.com';
var DEFAULT_LIST_ID = 1;
var DEFAULT_TAG_AULA = 4;
var DEFAULT_FIELD_OPTIN = 2;
var DEFAULT_FIELD_OPTIN_WHATSAPP = 3;
var HONEYPOT = 'website';
var OBRIGADO_URL = 'https://tininja.net/aula/obrigado/';

function doPost(e) {
  try {
    var data = parseRequest_(e);
    if (str_(data[HONEYPOT])) return json_({ ok: true });
    if (str_(data.acao) === 'pesquisa') return pesquisa_(data);

    var nome = str_(data.nome).slice(0, 120);
    var email = str_(data.email).toLowerCase().slice(0, 160);
    var optin = yes_(data.optin);
    var optinWhatsapp = yes_(data.optin_whatsapp);
    var cell = formatCellphone_(str_(data.whatsapp));

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'email' });

    var props = PropertiesService.getScriptProperties();
    var key = props.getProperty('EGOI_API_KEY');
    if (!key) throw new Error('EGOI_API_KEY não configurada');

    var listId = parseInt(props.getProperty('EGOI_LIST_ID') || DEFAULT_LIST_ID, 10);
    var tagId = parseInt(props.getProperty('EGOI_TAG_AULA') || DEFAULT_TAG_AULA, 10);
    var fieldOptin = parseInt(props.getProperty('EGOI_FIELD_OPTIN') || DEFAULT_FIELD_OPTIN, 10);
    var fieldOptinWhatsapp = parseInt(props.getProperty('EGOI_FIELD_OPTIN_WHATSAPP') || DEFAULT_FIELD_OPTIN_WHATSAPP, 10);

    if (listId !== 1 || !tagId || !fieldOptin || !fieldOptinWhatsapp) {
      console.error('Propriedades da ponte da aula ausentes ou EGOI_LIST_ID diferente de 1');
      return json_({ ok: false, error: 'config' });
    }

    var base = { status: 'active', email: email, language: 'br' };
    if (nome) base.first_name = nome;
    if (cell) base.cellphone = cell;

    var utm = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
      var v = str_(data[k]).slice(0, 200);
      if (v) utm[k] = v;
    });

    var extra = [
      { field_id: fieldOptin, value: optin ? 'sim' : 'nao' },
      { field_id: fieldOptinWhatsapp, value: optinWhatsapp ? 'sim' : 'nao' }
    ];

    var payload = { base: base, extra: extra };
    if (Object.keys(utm).length) payload.utm = utm;

    var res = egoi_(key, 'post', '/lists/' + listId + '/contacts', payload);
    var contactId = readContactId_(res);

    if (res.code === 409) {
      // E-mail ou celular já existe nesta lista. Tenta de novo sem celular;
      // depois localiza o contato pelo e-mail, atualiza e aplica a tag da aula.
      if (payload.base.cellphone) {
        delete payload.base.cellphone;
        res = egoi_(key, 'post', '/lists/' + listId + '/contacts', payload);
        contactId = readContactId_(res);
      }
      if (res.code === 409) {
        var found = findContactIdByEmail_(key, listId, email);
        if (!found) {
          console.error('E-goi 409 sem contato localizado para aplicar a tag');
          return json_({ ok: false, error: 'upstream' });
        }
        contactId = found;
        var patchBase = {};
        if (nome) patchBase.first_name = nome;
        if (cell) patchBase.cellphone = cell;
        var patched = egoi_(key, 'patch', '/lists/' + listId + '/contacts/' + contactId, {
          base: patchBase,
          extra: extra
        });
        if (patched.code === 409 && patchBase.cellphone) {
          delete patchBase.cellphone;
          patched = egoi_(key, 'patch', '/lists/' + listId + '/contacts/' + contactId, {
            base: patchBase,
            extra: extra
          });
        }
        if (patched.code >= 400 && patched.code !== 409) {
          console.error('E-goi patch ' + patched.code + ': ' + String(patched.body).slice(0, 500));
        }
      }
    }

    if (!((res.code >= 200 && res.code < 300) || res.code === 409)) {
      console.error('E-goi ' + res.code + ': ' + String(res.body).slice(0, 500));
      return json_({ ok: false, error: 'upstream' });
    }

    if (!contactId) contactId = findContactIdByEmail_(key, listId, email);

    if (tagId && contactId) {
      var tagged = egoi_(key, 'post', '/lists/' + listId + '/contacts/actions/attach-tag', {
        tag_id: tagId,
        contacts: [String(contactId)]
      });
      if (tagged.code >= 400) {
        console.error('E-goi tag ' + tagged.code + ': ' + String(tagged.body).slice(0, 500));
        return json_({ ok: false, error: 'upstream' });
      }
    } else {
      console.error('Inscrição gravada, mas sem contact_id para aplicar a tag');
      return json_({ ok: false, error: 'upstream' });
    }

    // Lead na API de Conversões da Meta (v3). Falha nunca derruba a inscrição.
    try {
      enviarLeadCapi_(data, email, nome, cell);
    } catch (errCapi) {
      console.error('CAPI: ' + (errCapi && errCapi.message));
    }

    // E-mail de confirmação (v2): só depois do contato e da tag; uma vez por e-mail.
    // Falha no envio nunca derruba a resposta da inscrição.
    try {
      enviarConfirmacao_(email, nome);
    } catch (errMail) {
      console.error('Confirmação: ' + (errMail && errMail.message));
    }

    return json_({ ok: true });
  } catch (err) {
    console.error('doPost: ' + (err && err.message));
    return json_({ ok: false, error: 'server' });
  }
}

function doGet() {
  return json_({ ok: true, service: 'tininja-egoi-bridge-aula', obrigado: OBRIGADO_URL });
}

function findContactIdByEmail_(key, listId, email) {
  // 1) Busca restrita à lista (o /contacts/search antigo com ?email= não é o da API v3).
  var res = egoi_(key, 'get', '/lists/' + listId + '/contacts?email=' + encodeURIComponent(email) + '&limit=10');
  var id = readContactIdFromSearch_(res, listId);
  if (id) return id;

  // 2) Busca na conta inteira, filtrando pelo list_id da aula.
  res = egoi_(key, 'get', '/contacts/search?type=email&contact=' + encodeURIComponent(email));
  return readContactIdFromSearch_(res, listId);
}

function readContactIdFromSearch_(res, listId) {
  if (!res || res.code < 200 || res.code >= 300 || !res.body) return '';
  try {
    var body = JSON.parse(res.body);
    var items = body.items || body.contacts || (Array.isArray(body) ? body : []);
    var i;
    for (i = 0; i < items.length; i++) {
      var it = items[i] || {};
      var itemList = it.list_id || (it.base && it.base.list_id);
      if (itemList && String(itemList) !== String(listId)) continue;
      var id = it.contact_id || it.base_id || it.id ||
        (it.base && (it.base.contact_id || it.base.base_id || it.base.id));
      if (id) return String(id);
    }
  } catch (ignore) {}
  return '';
}

function readContactId_(res) {
  if (!res || !res.body) return '';
  try {
    var body = typeof res.body === 'string' ? JSON.parse(res.body) : res.body;
    return String(body.contact_id || body.base_id || (body.base && body.base.contact_id) || body.id || '');
  } catch (ignore) {
    return '';
  }
}

function egoi_(key, method, path, payload) {
  var opts = {
    method: method,
    headers: { Apikey: key, Accept: 'application/json' },
    muteHttpExceptions: true
  };
  if (payload != null && method !== 'get') {
    opts.contentType = 'application/json';
    opts.payload = JSON.stringify(payload);
  }
  var resp = UrlFetchApp.fetch(EGOI_BASE + path, opts);
  return { code: resp.getResponseCode(), body: resp.getContentText() };
}

function formatCellphone_(raw) {
  var d = String(raw || '').replace(/\D/g, '');
  if (!d) return '';
  d = d.replace(/^0+/, '');
  if ((d.length === 12 || d.length === 13) && d.indexOf('55') === 0) d = d.slice(2);
  if (d.length !== 10 && d.length !== 11) return '';
  return '55-' + d;
}

function parseRequest_(e) {
  var out = {};
  if (!e) return out;
  var p = e.parameter || {};
  Object.keys(p).forEach(function (k) { out[k] = p[k]; });
  var pd = e.postData;
  if (!pd || !pd.contents) return out;
  var type = String(pd.type || '').toLowerCase();
  var body = pd.contents;
  if (type.indexOf('application/json') === 0 || type.indexOf('text/plain') === 0) {
    try {
      var j = JSON.parse(body);
      if (j && typeof j === 'object') Object.keys(j).forEach(function (k) { out[k] = j[k]; });
    } catch (ignore) {}
  } else if (type.indexOf('multipart/form-data') === 0 && !out.email) {
    var m = /boundary=("?)([^";]+)\1/i.exec(pd.type || '');
    if (m) parseMultipart_(body, m[2], out);
  } else if (type.indexOf('application/x-www-form-urlencoded') === 0 && !out.email) {
    body.split('&').forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf('=');
      var k = decodeURIComponent((i < 0 ? pair : pair.slice(0, i)).replace(/\+/g, ' '));
      var v = i < 0 ? '' : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
      if (!(k in out)) out[k] = v;
    });
  }
  return out;
}

function parseMultipart_(body, boundary, out) {
  body.split('--' + boundary).forEach(function (part) {
    var m = /name="([^"]+)"[^\r\n]*\r?\n(?:[^\r\n]+\r?\n)*\r?\n([\s\S]*?)\r?\n?$/.exec(part);
    if (m && !(m[1] in out)) out[m[1]] = m[2];
  });
}

function yes_(v) {
  return /^(sim|on|true|1|yes)$/i.test(str_(v));
}

function str_(v) {
  if (v == null) return '';
  if (Array.isArray(v)) v = v[0];
  return String(v).trim();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ---------- API de Conversões da Meta (v3) ----------

var META_GRAPH = 'https://graph.facebook.com/v21.0/';
var DEFAULT_PIXEL_ID = '839957353977860';

function sha256Hex_(texto) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(texto), Utilities.Charset.UTF_8);
  return bytes.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}

/**
 * Envia o Lead da inscrição. data vem do formulário; a página manda, além dos
 * campos da inscrição: event_id, fbc, fbp, client_ua, page_url e consentimento
 * ("sim", "nao" ou vazio = não respondeu o aviso).
 */
function enviarLeadCapi_(data, email, nome, cell) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('META_CAPI_TOKEN');
  if (!token) return false;                                   // v3 desligada
  if (str_(data.consentimento) === 'nao') return false;       // recusou os cookies
  if (str_(data.tn_teste) === '1') return false;              // modo de teste da página

  var pixel = props.getProperty('META_PIXEL_ID') || DEFAULT_PIXEL_ID;
  var testCode = props.getProperty('META_TEST_EVENT_CODE');

  var user = { em: [sha256Hex_(email)], country: [sha256Hex_('br')] };
  if (cell) user.ph = [sha256Hex_(cell.replace(/\D/g, ''))]; // 55DDDNÚMERO
  var primeiro = String(nome || '').trim().split(/\s+/)[0];
  if (primeiro) user.fn = [sha256Hex_(primeiro.toLowerCase())];
  var ua = str_(data.client_ua).slice(0, 400);
  if (ua) user.client_user_agent = ua;
  var fbc = str_(data.fbc).slice(0, 300);
  if (/^fb\.1\.\d+\./.test(fbc)) user.fbc = fbc;
  var fbp = str_(data.fbp).slice(0, 100);
  if (/^fb\.1\.\d+\./.test(fbp)) user.fbp = fbp;

  var pageUrl = str_(data.page_url).slice(0, 500);
  if (!/^https:\/\/tininja\.net\//.test(pageUrl)) pageUrl = 'https://tininja.net/aula/';

  var evento = {
    event_name: 'Lead',
    event_time: Math.floor(Date.now() / 1000),
    action_source: 'website',
    event_source_url: pageUrl,
    user_data: user,
    custom_data: { content_name: 'aula-26-11' }
  };
  var eventId = str_(data.event_id).slice(0, 64);
  if (eventId) evento.event_id = eventId;

  var body = { data: [evento] };
  if (testCode) body.test_event_code = testCode;

  var resp = UrlFetchApp.fetch(META_GRAPH + pixel + '/events?access_token=' + encodeURIComponent(token), {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(body),
    muteHttpExceptions: true
  });
  var code = resp.getResponseCode();
  if (code >= 300) {
    console.error('CAPI ' + code + ': ' + String(resp.getContentText()).slice(0, 400));
    return false;
  }
  return true;
}

/** Rodar no editor com META_TEST_EVENT_CODE preenchido: manda um Lead de teste. */
function testarCapi() {
  var props = PropertiesService.getScriptProperties();
  if (!props.getProperty('META_TEST_EVENT_CODE')) throw new Error('Preencha META_TEST_EVENT_CODE antes do teste');
  var ok = enviarLeadCapi_({
    event_id: 'teste-' + Date.now(),
    client_ua: 'Mozilla/5.0 (teste da ponte)',
    page_url: 'https://tininja.net/aula/',
    consentimento: ''
  }, 'eduardo@tininja.net', 'Eduardo', '55-19999999999');
  console.log(ok ? 'Lead de teste enviado: confira a aba Testar eventos' : 'Falhou: veja o log acima');
}

// ---------- Pesquisa da página de obrigado (v2) ----------

var CAMPOS_PESQUISA = [
  { prop: 'EGOI_FIELD_AULA_FAZ_HOJE', nome: 'aula_faz_hoje' },
  { prop: 'EGOI_FIELD_AULA_TRAVA', nome: 'aula_trava' },
  { prop: 'EGOI_FIELD_AULA_EM_2027', nome: 'aula_em_2027' },
  { prop: 'EGOI_FIELD_AULA_ULTIMO_PROBLEMA', nome: 'aula_ultimo_problema' }
];

function pesquisa_(data) {
  var email = str_(data.pesquisa_email).toLowerCase().slice(0, 160);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json_({ ok: false, error: 'email' });

  var faz = str_(data.faz_hoje).slice(0, 40);
  var fazOutro = str_(data.faz_hoje_outro).slice(0, 120);
  var trava = values_(data.trava).slice(0, 2).join('|').slice(0, 80);
  var travaOutro = str_(data.trava_outro).slice(0, 160);
  var em = str_(data.em_2027).slice(0, 40);
  var emOutro = str_(data.em_2027_outro).slice(0, 120);
  var problema = str_(data.ultimo_problema).replace(/\s+/g, ' ').slice(0, 1000);
  if (!faz || !trava || !em) return json_({ ok: false, error: 'campos' });

  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('EGOI_API_KEY');
  if (!key) throw new Error('EGOI_API_KEY não configurada');
  var listId = parseInt(props.getProperty('EGOI_LIST_ID') || DEFAULT_LIST_ID, 10);

  var ids = CAMPOS_PESQUISA.map(function (c) { return parseInt(props.getProperty(c.prop) || '0', 10); });
  if (ids.some(function (id) { return !id; })) {
    console.error('Campos da pesquisa sem id: rode configurarCamposPesquisa() uma vez');
    return json_({ ok: false, error: 'config' });
  }

  var contactId = findContactIdByEmail_(key, listId, email);
  if (!contactId) {
    console.error('Pesquisa sem contato na Lista ' + listId);
    return json_({ ok: false, error: 'contato' });
  }

  var valores = [
    faz + (fazOutro ? ': ' + fazOutro : ''),
    trava + (travaOutro ? ': ' + travaOutro : ''),
    em + (emOutro ? ': ' + emOutro : ''),
    problema
  ];
  var extra = [];
  ids.forEach(function (id, i) { if (valores[i]) extra.push({ field_id: id, value: valores[i] }); });

  var res = egoi_(key, 'patch', '/lists/' + listId + '/contacts/' + contactId, { extra: extra });
  if (res.code === 422 && problema.length > 250) {
    // Se o campo de texto tiver limite menor, guarda o começo da resposta.
    extra[extra.length - 1].value = problema.slice(0, 250);
    res = egoi_(key, 'patch', '/lists/' + listId + '/contacts/' + contactId, { extra: extra });
  }
  if (res.code >= 400) {
    console.error('E-goi pesquisa ' + res.code + ': ' + String(res.body).slice(0, 500));
    return json_({ ok: false, error: 'upstream' });
  }
  return json_({ ok: true });
}

/** Rodar UMA vez no editor (Executar). Cria os campos extras da pesquisa e grava os ids. */
function configurarCamposPesquisa() {
  var props = PropertiesService.getScriptProperties();
  var key = props.getProperty('EGOI_API_KEY');
  if (!key) throw new Error('EGOI_API_KEY não configurada');
  var listId = parseInt(props.getProperty('EGOI_LIST_ID') || DEFAULT_LIST_ID, 10);

  var res = egoi_(key, 'get', '/lists/' + listId + '/fields?limit=100');
  var existentes = {};
  try {
    var lista = JSON.parse(res.body);
    (Array.isArray(lista) ? lista : (lista.items || [])).forEach(function (f) {
      if (f && f.type === 'extra') existentes[f.name] = f.field_id;
    });
  } catch (ignore) {}

  CAMPOS_PESQUISA.forEach(function (c) {
    var id = existentes[c.nome];
    if (!id) {
      var criado = egoi_(key, 'post', '/lists/' + listId + '/fields/extra', { name: c.nome, format: 'text' });
      if (criado.code >= 400) throw new Error('Criar ' + c.nome + ': ' + criado.code + ' ' + String(criado.body).slice(0, 300));
      id = JSON.parse(criado.body).field_id;
    }
    props.setProperty(c.prop, String(id));
    console.log(c.nome + ' = ' + id);
  });
}

function values_(v) {
  if (v == null || v === '') return [];
  if (Array.isArray(v)) return v.map(str_).filter(Boolean);
  return String(v).split(/\s*\|\s*|\s*,\s*/).map(str_).filter(Boolean);
}

// ---------- E-mail de confirmação da inscrição (v2) ----------

var CONF_ASSUNTO = 'Inscrição confirmada: quinta, 26/11, às 20h';
var CONF_PREHEADER = 'Salve a data. O link chega por e-mail na manhã do dia 26.';
var CONF_NOME = 'Eduardo Honorato · TI Ninja';
var CONF_REPLY_TO = 'eduardo@tininja.net';
var LINK_GRUPO = 'https://chat.whatsapp.com/G5PKxOwbtc83VNJUoxzjrr';

function chaveConfirmacao_(email) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(email).toLowerCase().trim());
  return 'conf_' + bytes.map(function (b) { return ('0' + (b & 255).toString(16)).slice(-2); }).join('');
}

function enviarConfirmacao_(email, nome) {
  email = String(email || '').toLowerCase().trim();
  if (!email) return false;
  var props = PropertiesService.getScriptProperties();
  var chave = chaveConfirmacao_(email);
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) { console.error('Confirmação: sem lock'); return false; }
  try {
    if (props.getProperty(chave)) return false; // já enviado
    var primeiro = String(nome || '').trim().split(/\s+/)[0] || '';
    var saudacao = primeiro ? 'Oi, ' + primeiro + '.' : 'Oi!';
    MailApp.sendEmail({
      to: email,
      subject: CONF_ASSUNTO,
      name: CONF_NOME,
      replyTo: CONF_REPLY_TO,
      body: textoConfirmacao_(saudacao),
      htmlBody: htmlConfirmacao_(saudacao)
    });
    props.setProperty(chave, new Date().toISOString());
    return true;
  } finally {
    lock.releaseLock();
  }
}

function textoConfirmacao_(saudacao) {
  return [
    saudacao,
    '',
    'Sua inscrição na aula "Se 2027 Apertar, Quem a Empresa Chama?" está confirmada.',
    '',
    'Quinta-feira, 26/11, às 20h (horário de Brasília). Ao vivo e gratuita.',
    '',
    'Na aula, eu monto ao vivo a rede de um escritório, do firewall ao domínio, e mostro o caminho do suporte até o Analista de Infraestrutura e Redes.',
    '',
    'O link da transmissão chega de dois jeitos:',
    '- por e-mail, na manhã do dia 26;',
    '- no grupo do WhatsApp da aula: ' + LINK_GRUPO,
    '',
    'Agora, duas coisas rápidas:',
    '1. Salve a data na sua agenda: quinta, 26/11, às 20h.',
    '2. Responda este e-mail com um "ok" ou adicione eduardo@tininja.net aos seus contatos. Assim o e-mail com o link não cai no spam.',
    '',
    'Até quinta,',
    'Eduardo Honorato',
    'TI Ninja'
  ].join('\n');
}

function htmlConfirmacao_(saudacao) {
  var esc = function (t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var p = 'margin:0 0 16px;';
  return '' +
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">' + esc(CONF_PREHEADER) + '</div>' +
    '<div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.55;color:#16181d;max-width:560px;">' +
    '<p style="' + p + '">' + esc(saudacao) + '</p>' +
    '<p style="' + p + '">Sua inscrição na aula &quot;Se 2027 Apertar, Quem a Empresa Chama?&quot; está confirmada.</p>' +
    '<p style="' + p + '"><strong>Quinta-feira, 26/11, às 20h (horário de Brasília).</strong> Ao vivo e gratuita.</p>' +
    '<p style="' + p + '">Na aula, eu monto ao vivo a rede de um escritório, do firewall ao domínio, e mostro o caminho do suporte até o Analista de Infraestrutura e Redes.</p>' +
    '<p style="margin:0 0 8px;">O link da transmissão chega de dois jeitos:</p>' +
    '<ul style="margin:0 0 16px;padding-left:22px;">' +
    '<li>por e-mail, na manhã do dia 26;</li>' +
    '<li>no grupo do WhatsApp da aula: <a href="' + LINK_GRUPO + '" style="color:#1f55b3;font-weight:bold;">' + LINK_GRUPO + '</a></li>' +
    '</ul>' +
    '<p style="margin:0 0 8px;">Agora, duas coisas rápidas:</p>' +
    '<ol style="margin:0 0 16px;padding-left:22px;">' +
    '<li>Salve a data na sua agenda: quinta, 26/11, às 20h.</li>' +
    '<li>Responda este e-mail com um &quot;ok&quot; ou adicione <a href="mailto:eduardo@tininja.net" style="color:#1f55b3;">eduardo@tininja.net</a> aos seus contatos. Assim o e-mail com o link não cai no spam.</li>' +
    '</ol>' +
    '<p style="margin:0;">Até quinta,<br>Eduardo Honorato<br>TI Ninja</p>' +
    '</div>';
}

/** Limpa a marca de "confirmação já enviada" de um e-mail. Uso: resetConfirmacao('nome@exemplo.com'). */
function resetConfirmacao(email) {
  var chave = chaveConfirmacao_(email);
  PropertiesService.getScriptProperties().deleteProperty(chave);
  console.log('Marca de confirmação apagada para ' + String(email).toLowerCase().trim());
}

/** Atalho para o botão Executar do editor (ele não passa argumentos). */
function resetConfirmacaoTeste() {
  var EMAIL_RESET = 'eduhsouza@gmail.com';
  resetConfirmacao(EMAIL_RESET);
}
