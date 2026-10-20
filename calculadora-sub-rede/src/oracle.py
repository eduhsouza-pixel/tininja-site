import sys,json,ipaddress as I
out=[]
for c in json.load(sys.stdin):
  t=c['t']
  if t=='v4':
    try: n=I.ip_interface(c['ip']+'/'+c['m']).network
    except Exception: out.append({'error':True}); continue
    p=n.prefixlen; hs=list(n.hosts()) if n.num_addresses<=4 else None
    if p==32: f=l=n.network_address; u=1
    elif p==31: f,l,u=n.network_address,n.broadcast_address,2
    else: f,l,u=n.network_address+1,n.broadcast_address-1,n.num_addresses-2
    a=I.ip_address(c['ip'].split('/')[0].strip()) if '/' not in c['ip'] else I.ip_address(c['ip'].split('/')[0])
    out.append({'network':str(n.network_address),'broadcast':str(n.broadcast_address),'mask':str(n.netmask),'wildcard':str(n.hostmask),'first':str(f),'last':str(l),'usable':u,'prefix':p,'private':a.is_private,'multicast':a.is_multicast,'loopback':a.is_loopback,'linklocal':a.is_link_local})
  elif t=='eq':
    n=I.ip_network(c['net'],strict=False); import math
    b=math.ceil(math.log2(c['n'])) if c['n']>1 else 0
    out.append([str(s) for s in n.subnets(prefixlen_diff=b)])
  elif t=='v6':
    try: n=I.ip_interface(c['s']).network; a=I.ip_interface(c['s']).ip
    except Exception: out.append({'error':True}); continue
    out.append({'address':str(a),'full':a.exploded,'network':str(n.network_address),'last':str(n.broadcast_address)})
print(json.dumps(out))
