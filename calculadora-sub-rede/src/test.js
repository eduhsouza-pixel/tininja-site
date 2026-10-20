const N=require('./core.js'),{execFileSync}=require('child_process');
const v4=[['192.168.1.10','24'],['192.168.1.10','255.255.255.0'],['10.0.0.1','8'],['172.16.5.4','12'],['172.31.255.255','16'],['172.32.0.1','16'],['169.254.10.20','16'],['127.0.0.1','8'],['100.64.0.1','10'],['100.127.255.254','10'],['100.128.0.1','10'],['224.0.0.5','4'],['239.255.255.250','32'],['8.8.8.8','32'],['8.8.8.8','0'],['0.0.0.0','0'],['255.255.255.255','32'],['10.0.0.0','31'],['10.0.0.1','31'],['192.0.2.77','30'],['203.0.113.9','29'],['198.51.100.200','28'],['45.10.20.30','27'],['200.200.200.200','26'],['192.168.0.1','25'],['10.20.30.40','23'],['10.20.30.40','22'],['10.20.30.40','255.255.252.0'],['172.20.1.1','255.255.240.0'],['1.2.3.4','255.0.0.0'],['1.2.3.4','128.0.0.0'],['1.2.3.4','1'],['130.1.2.3','255.255.255.252'],['130.1.2.3','255.255.255.254'],['130.1.2.3','255.255.255.255'],['192.168.100.130','255.255.255.192'],['11.0.0.1','9'],['191.255.1.1','17'],['192.168.1.300','24'],['192.168.1','24'],['192.168.1.1','33'],['192.168.1.1','255.0.255.0'],['192.168.1.1','255.255.255.1'],['abc','24'],['192.168.01.1','24'],['10.1.1.1','255.255.0.0.0']];
const v6=['2001:db8::1/64','2001:0db8:0000:0000:0000:0000:0000:0001/48','fe80::1/10','::1/128','::/0','2001:db8:0:0:1:0:0:1/64','2001:db8::ffff:192.0.2.1/96','2001:db8:abcd:12::/56','2001:db8::g/64','1:2:3:4:5:6:7:8:9/64','2001:db8::1/129','2001::db8::1'];
const eq=[['192.168.0.0/24',4],['10.0.0.0/16',3],['172.16.0.0/22',8],['192.168.1.0/24',1],['10.0.0.0/8',256]];
const cases=[...v4.map(([ip,m])=>({t:'v4',ip,m})),...v6.map(s=>({t:'v6',s})),...eq.map(([net,n])=>({t:'eq',net,n}))];
const O=JSON.parse(execFileSync('python3',['oracle.py'],{input:JSON.stringify(cases)}));
let pass=0,fail=0;const ok=(c,msg)=>{c?pass++:(fail++,console.log('FAIL',msg))};
cases.forEach((c,i)=>{const o=O[i];
 if(c.t==='v4'){const r=N.parse(c.ip,c.m);
  if(o.error){ok(r.error,`${c.ip} ${c.m} deveria dar erro`);return}
  if(r.error){ok(false,`${c.ip} ${c.m}: ${r.error}`);return}
  const x=N.calc(r.ip,r.p),F=N.fIP;
  const got={network:F(x.network),broadcast:F(x.broadcast),mask:F(x.mask),wildcard:F(x.wildcard),first:F(x.first),last:F(x.last),usable:x.usable,prefix:x.prefix};
  for(const k in got)ok(got[k]===o[k],`${c.ip}/${c.m} ${k}: ${got[k]} vs ${o[k]}`);
  const k=x.type.kind,L=x.type.label;
  if(o.loopback)ok(/Loopback/.test(L),c.ip+' loopback');
  if(o.multicast)ok(/Multicast/.test(L),c.ip+' multicast');
  if(o.linklocal)ok(/APIPA/.test(L),c.ip+' apipa');
  if(!o.private&&!o.multicast&&!/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(c.ip))ok(k==='pub',c.ip+' público: '+L);
  if(/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(c.ip))ok(k==='priv',c.ip+' privado');
  if(/^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(c.ip))ok(/CGNAT/.test(L),c.ip+' cgnat');
 }else if(c.t==='v6'){const r=N.calc6(c.s);
  if(o.error){ok(r.error,c.s+' deveria dar erro');return}
  if(r.error){ok(false,c.s+': '+r.error);return}
  for(const k of ['address','full','network','last'])ok(r[k]===o[k],`${c.s} ${k}: ${r[k]} vs ${o[k]}`);
 }else{const [a,p]=c.net.split('/');const r=N.equal(N.pIP(a),+p,c.n);ok(r.rows.map(x=>N.fIP(x.network)+'/'+x.prefix).join()===o.join(),c.net+' em '+c.n)}
});
// VLSM: verifica sem sobreposição, alinhamento e tamanho via python
const v=N.vlsm(N.pIP('192.168.10.0'),24,[{name:'Financeiro',hosts:50},{name:'Wi-Fi visitantes',hosts:100},{name:'Câmeras',hosts:20},{name:'Link',hosts:2}]);
ok(!v.error&&v.rows.map(r=>r.name+'='+N.fIP(r.network)+'/'+r.prefix).join()==='Wi-Fi visitantes=192.168.10.0/25,Financeiro=192.168.10.128/26,Câmeras=192.168.10.192/27,Link=192.168.10.224/30','vlsm básico '+JSON.stringify(v.rows.map(r=>N.fIP(r.network)+'/'+r.prefix)));
const vs=v.rows.map(r=>N.fIP(r.network)+'/'+r.prefix);
ok(execFileSync('python3',['-c',`import ipaddress as I,itertools,sys;n=[I.ip_network(x) for x in sys.argv[1:]];b=I.ip_network('192.168.10.0/24');print(all(x.subnet_of(b) for x in n) and not any(a.overlaps(c) for a,c in itertools.combinations(n,2)))`,...vs]).toString().trim()==='True','vlsm sem sobreposição');
ok(N.vlsm(N.pIP('192.168.10.0'),24,[{name:'A',hosts:200},{name:'B',hosts:100}]).error,'vlsm não cabe');
ok(N.vlsm(N.pIP('192.168.10.0'),24,[{name:'A',hosts:300}]).error,'vlsm maior que rede');
ok(N.vlsm(N.pIP('10.0.0.0'),24,[{name:'A',hosts:126},{name:'B',hosts:126}]).rows.length===2,'vlsm encaixe exato');
[[1,32],[2,30],[3,29],[6,29],[7,28],[254,24],[255,23],[1022,22],[16777214,8]].forEach(([h,p])=>ok(N.hostsToPrefix(h)===p,'hostsToPrefix '+h));
ok(N.parse('192.168.1.10/24').p===24&&N.parse(' 10.0.0.1 255.255.0.0 ').p===16,'entrada combinada');
ok(N.equal(N.pIP('10.0.0.0'),30,8).error,'equal impossível');
ok(N.bin(N.pIP('192.168.1.10'))==='11000000101010000000000100001010','binário');
console.log(`${pass} verificações OK, ${fail} falhas (${cases.length+17} casos)`);process.exit(fail?1:0);
