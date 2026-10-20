/* núcleo de cálculo (testado por test.js) */
var Net=(function(){
function pIP(s){s=String(s).trim();var m=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(s);if(!m)return null;var n=0;for(var i=1;i<5;i++){if(m[i].length>1&&m[i][0]==='0')return null;var o=+m[i];if(o>255)return null;n=n*256+o}return n>>>0}
function fIP(n){n>>>=0;return[n>>>24,n>>>16&255,n>>>8&255,n&255].join('.')}
function mask(p){return p===0?0:(0xFFFFFFFF<<(32-p))>>>0}
function m2p(s){var n=pIP(s);if(n===null)return -1;var p=0;while(p<32&&(n>>>(31-p)&1))p++;return mask(p)===n?p:-2}
function parse(ipS,mS){var e=function(t){return{error:t}};ipS=String(ipS||'').trim();mS=String(mS==null?'':mS).trim();
 var sp=ipS.split(/\s*\/\s*|\s+/);if(sp.length>2)return e('Formato não reconhecido. Use, por exemplo, 192.168.1.10/24.');
 if(sp.length===2){ipS=sp[0];mS=sp[1]}
 if(!ipS)return e('Digite um endereço IPv4, por exemplo 192.168.1.10/24.');
 var ip=pIP(ipS);if(ip===null)return e('Endereço IPv4 inválido: use 4 números de 0 a 255 separados por ponto (sem zeros à esquerda).');
 if(mS==='')return e('Informe o prefixo (/24) ou a máscara (255.255.255.0).');
 var p;if(/^\d{1,2}$/.test(mS)){p=+mS;if(p>32)return e('O prefixo vai de /0 a /32.')}
 else{p=m2p(mS);if(p===-1)return e('Máscara inválida. Exemplo: 255.255.255.0 ou /24.');if(p===-2)return e('Máscara não contígua: os bits 1 precisam vir todos à esquerda (ex.: 255.255.255.0).')}
 return{ip:ip,p:p}}
function special(n){var R=[[0,8,'Rede "este host" (RFC 1122)','esp'],[0x0A000000,8,'Privado (RFC 1918)','priv'],[0x64400000,10,'CGNAT, espaço compartilhado (RFC 6598)','esp'],[0x7F000000,8,'Loopback (RFC 1122)','esp'],[0xA9FE0000,16,'Link-local/APIPA (RFC 3927)','esp'],[0xAC100000,12,'Privado (RFC 1918)','priv'],[0xC0000200,24,'Documentação TEST-NET-1 (RFC 5737)','esp'],[0xC0A80000,16,'Privado (RFC 1918)','priv'],[0xC6120000,15,'Testes de desempenho (RFC 2544)','esp'],[0xC6336400,24,'Documentação TEST-NET-2 (RFC 5737)','esp'],[0xCB007100,24,'Documentação TEST-NET-3 (RFC 5737)','esp'],[0xE0000000,4,'Multicast (RFC 5771)','esp'],[0xFFFFFFFF,32,'Broadcast limitado (RFC 919)','esp'],[0xF0000000,4,'Reservado (RFC 1112)','esp']];
 for(var i=0;i<R.length;i++)if(((n&mask(R[i][1]))>>>0)===R[i][0])return{label:R[i][2],kind:R[i][3]};return{label:'Público',kind:'pub'}}
function cls(n){var a=n>>>24;return a<128?'A':a<192?'B':a<224?'C':a<240?'D (multicast)':'E (reservada)'}
function calc(ip,p){var m=mask(p),net=(ip&m)>>>0,bc=(net|~m)>>>0,total=Math.pow(2,32-p),first,last,usable;
 if(p===32){first=last=net;usable=1}else if(p===31){first=net;last=bc;usable=2}else{first=net+1;last=bc-1;usable=total-2}
 return{ip:ip,prefix:p,network:net,broadcast:bc,mask:m,wildcard:(~m)>>>0,first:first>>>0,last:last>>>0,usable:usable,total:total,cls:cls(ip),type:special(ip)}}
function bin(n){var s=(n>>>0).toString(2);return('00000000000000000000000000000000'+s).slice(-32)}
function hostsToPrefix(h){if(h<1)return -1;if(h===1)return 32;if(h===2)return 30;for(var p=30;p>=0;p--)if(Math.pow(2,32-p)-2>=h)return p;return -1}
/* reqs: [{name,hosts}] ; usa /30 para 2 hosts (convencional), /32 para 1 */
function vlsm(base,p,reqs){var start=(base&mask(p))>>>0,end=start+Math.pow(2,32-p),cur=start,out=[],err=null;
 var list=reqs.map(function(r,i){return{name:r.name,hosts:r.hosts,i:i,pre:hostsToPrefix(r.hosts)}});
 list.sort(function(a,b){return a.pre-b.pre||a.i-b.i});
 for(var k=0;k<list.length;k++){var r=list[k];if(r.pre<0||r.pre<p){err='"'+r.name+'" ('+r.hosts+' hosts) não cabe na rede /'+p+'.';break}
  var sz=Math.pow(2,32-r.pre);if(cur+sz>end){err='Espaço esgotado: "'+r.name+'" ('+r.hosts+' hosts) não cabe no que sobrou da rede.';break}
  var c=calc(cur>>>0,r.pre);c.name=r.name;c.need=r.hosts;out.push(c);cur+=sz}
 return{rows:out,error:err,used:cur-start,size:end-start}}
function equal(base,p,n){if(!(n>=1))return{error:'Informe quantas sub-redes (1 ou mais).'};var b=Math.ceil(Math.log2(n)-1e-9);var np=p+b;if(np>32)return{error:'Não dá para dividir uma /'+p+' em '+n+' sub-redes.'};if(Math.pow(2,b)>4096)return{error:'Máximo de 4096 sub-redes por vez.'};
 var start=(base&mask(p))>>>0,sz=Math.pow(2,32-np),rows=[];for(var i=0;i<Math.pow(2,b);i++)rows.push(calc((start+i*sz)>>>0,np));return{rows:rows,prefix:np,count:rows.length}}
/* IPv6 básico */
function p6(s){s=String(s).trim().toLowerCase();if(!/^[0-9a-f:.]+$/.test(s))return null;var v4=null;var m=/^(.*:)(\d+\.\d+\.\d+\.\d+)$/.exec(s);if(m){v4=pIP(m[2]);if(v4===null)return null;s=m[1]+(v4>>>16).toString(16)+':'+(v4&65535).toString(16)}
 var dc=s.split('::');if(dc.length>2)return null;var h=dc[0]?dc[0].split(':'):[],t=dc.length>1&&dc[1]?dc[1].split(':'):[];
 if(dc.length===1&&h.length!==8)return null;if(dc.length===2&&h.length+t.length>7)return null;var g=h.concat(dc.length===2?Array(8-h.length-t.length).fill('0'):[],t);
 var n=0n;for(var i=0;i<8;i++){if(!/^[0-9a-f]{1,4}$/.test(g[i]))return null;n=(n<<16n)|BigInt(parseInt(g[i],16))}return n}
function f6full(n){var a=[];for(var i=7;i>=0;i--)a.push(((n>>BigInt(i*16))&0xffffn).toString(16).padStart(4,'0'));return a.join(':')}
function f6(n){var g=f6full(n).split(':').map(function(x){return parseInt(x,16).toString(16)});var bs=-1,bl=0,cs=-1,cl=0;for(var i=0;i<8;i++){if(g[i]==='0'){if(cs<0)cs=i;cl++;if(cl>bl){bl=cl;bs=cs}}else{cs=-1;cl=0}}
 if(bl<2)return g.join(':');return g.slice(0,bs).join(':')+'::'+g.slice(bs+bl).join(':')}
function calc6(str){var sp=String(str).trim().split('/');if(sp.length>2)return{error:'Formato IPv6 inválido.'};var n=p6(sp[0]);if(n===null)return{error:'Endereço IPv6 inválido. Exemplo: 2001:db8::1/64.'};var p=sp.length===2?(/^\d{1,3}$/.test(sp[1])?+sp[1]:-1):128;if(p<0||p>128)return{error:'O prefixo IPv6 vai de /0 a /128.'};
 var hb=BigInt(128-p),all=(1n<<128n)-1n,m=hb===128n?0n:(all>>hb)<<hb,net=n&m,last=net|(all^m);
 return{prefix:p,address:f6(n),full:f6full(n),network:f6(net),last:f6(last),total:(1n<<hb),n64:p<=64?(1n<<BigInt(64-p)).toString():null}}
return{pIP:pIP,fIP:fIP,mask:mask,m2p:m2p,parse:parse,calc:calc,bin:bin,special:special,hostsToPrefix:hostsToPrefix,vlsm:vlsm,equal:equal,p6:p6,f6:f6,f6full:f6full,calc6:calc6}})();
if(typeof module!=='undefined')module.exports=Net;
