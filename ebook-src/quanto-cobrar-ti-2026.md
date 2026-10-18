# Quanto cobrar TI 2026
## O método pra chegar no seu preço, do custo da hora até a proposta de uma página

*Eduardo Honorato · TI Ninja*

> **Notas de produção (não vão pro PDF):**
> - **STATUS: texto fechado pela FL em 16/10/2026 (~09h15 BRT). Os detalhes do Eduardo foram aplicados em 17/10 (~10h50 BRT; backup `…bak-2026-10-17-detalhes.md`). Falta só o [LINK DA PLANILHA] e a revisão de voz.** Nada foi publicado. Backups: v1 `…bak-2026-10-16-fl.md`, v2 `…bak-2026-10-16-final.md`.
> - Todo valor em R$ do texto está no **EXEMPLO FICTÍCIO** do capítulo 2, que é o único com valores em R$. O resto é variável ou placeholder.
> - As citações são literais do `banco-citacoes-avatar.md`. No texto, o crédito é genérico; os ids ficam aqui:
>   - Abertura, "Quanto cobrar por maquina?…": comentário no canal TI Ninja, aghv6vxz9UM (2020-12-10).
>   - Capítulo 1, "…querem basicamente q vc trabalhe de graça…": comentário no canal TI Ninja, XIgNVfra140.
>   - Capítulo 3, "Meu sonho era ter um contrato fixo…": r/empreendedorismo, 1hnm1dw.
> - Os placeholders em [COLCHETES] estão listados no fim do arquivo.

---

## Antes de começar: o que você vai ter na mão no final

Este guia não tem tabela de preço, porque a tabela dos outros foi feita com o custo dos outros. O que tem aqui é o **método**: no fim você sai com **o preço mínimo da sua hora** e **uma proposta de uma página** pro próximo dono de empresa que perguntar "quanto custa?".

Leva uns 15 minutos pra ler. Pra fazer a conta, separa mais uns 20, com uma calculadora e o extrato do seu último mês.

Serve pra quem **atende empresas por fora** e pra quem **trabalha numa empresa** e é, na prática, a TI dela. Esse tem um capítulo só seu, o 7, mas a conta é a mesma.

---

## Abertura: eu travei

A primeira vez que um dono de empresa me perguntou "quanto custa pra você cuidar da nossa TI?", eu travei.

Não era falta de conhecimento técnico. Eu sabia resolver a rede, o servidor, o backup. O que eu não sabia era **colocar preço nisso**.

Hoje eu sei o que era. No início, era falta de confiança, e ela vinha de dois lugares.

O primeiro é o grande erro: **projetar no cliente a minha própria capacidade de pagar**, a minha própria situação financeira. Essa empatia excessiva na hora de dar o preço atrapalha. Serviço se vende pelo valor que tem, por tudo que você sabe e entrega. Se o cliente pode pagar ou não, é um problema dele resolver.

O segundo era a falta de confiança em mim mesmo. Essa pode ser suprida.

Se você já passou por isso, não está sozinho. É a pergunta que mais aparece pra mim:

> "Você poderia fazer um vídeo explicando sobre valores para contrato mensal? Quanto cobrar por maquina? Quanto cobrar por servidor?"
> *(comentário no meu canal)*

Repara que a pergunta é sobre **números**: quanto por máquina, quanto por servidor, quanto o contrato. E é por isso que a gente trava. A gente acha que existe um número certo escondido em algum lugar, e que o problema é não saber qual é.

Não existe esse número pronto. Existe uma conta. E quando você aprende a conta, a pergunta "quanto custa?" deixa de ser susto e vira o começo de uma conversa.

É isso que a gente vai montar agora.

---

## Capítulo 1: Por que a gente trava (e o que responder quando o dono pergunta "quanto custa?")

### O erro de partida: cobrar pela peça

Quase todo técnico começa cobrando por serviço de balcão: formatação, limpeza, troca de peça, visita. Faz sentido, é o que a gente aprendeu. O cliente traz o problema, você resolve, cobra pelo que fez.

O problema é levar essa lógica pra empresa. Na empresa, ninguém está comprando uma formatação. O dono está comprando outra coisa: **a empresa não parar**. O pedido sai, o financeiro acha o arquivo, o pessoal trabalha. Quando você cobra pela peça, você está vendendo a coisa errada, e o preço fica pequeno porque a coisa que você está vendendo é pequena.

### Cobrar barato pra não perder o cliente

O segundo motivo de travar é o medo de perder o cliente: você cobra baixo, vira o **técnico de emergência**, e às vezes nem assim fecha:

> "eu tenho já 2 contratos de infraestrutura como serviço, atualmente serve mais como renda extra do CLT, nem colocando margem pequena consigo fechar contratos novos pq as empresas menores querem basicamente q vc trabalhe de graça kkkkk"
> *(comentário no meu canal)*

### Quando o dono pergunta "quanto custa?"

Então, o que responder na hora?

**Primeiro: não responda com número.** Responda com uma pergunta.

> "Antes de falar de valor, deixa eu entender o que não pode parar aqui."

Isso não é enrolação. Você não tem como dar preço sem saber o tamanho do trabalho. Quantas máquinas, quantas pessoas, tem servidor, tem backup, quem resolve hoje quando cai, quanto tempo a empresa aguenta parada. É o **diagnóstico**. E ele faz uma segunda coisa: mostra pro dono que você pensa no negócio dele, não só no computador.

**Segundo: fale de risco, não de peça.** Em vez de "eu configuro o firewall e faço o backup", diga "se o servidor cair numa segunda de manhã, quanto tempo seu pessoal fica sem trabalhar? Meu trabalho é isso não acontecer, e se acontecer, voltar rápido".

**Terceiro: o número vem depois, por escrito.** "Com isso eu monto uma proposta de uma página e te mando até [dia]." Você ganha tempo pra fazer a conta do capítulo 2 com calma, e chega com escopo e SLA no papel. Proposta escrita passa outra confiança.

**E se ele disser "tá caro"?** Volta pro escopo. "Tá caro comparado com o quê?" Normalmente ele está comparando com um chamado avulso. Mostra o que está dentro: monitoramento, backup testado, tempo de resposta garantido. Se mesmo assim não cabe no orçamento dele, **tira coisa do escopo, não baixa o preço do mesmo escopo**. Baixar o preço do mesmo trabalho ensina o cliente que seu número era chute.

### A confiança vem antes do preço
O meu primeiro cliente empresa veio de indicação do fornecedor do sistema que rodava na imobiliária onde eu trabalhava, porque ele viu meu trabalho de perto. Preço bem calculado não fecha contrato sozinho, mas preço chutado derruba essa confiança. Então vamos fazer a conta direito.

---

## Capítulo 2: O custo da sua hora

Tudo começa aqui. Qualquer jeito de cobrar, seja por hora, por máquina ou mensal, depende de você saber **quanto vale uma hora sua**. Sem esse número, o resto é chute.

### As cinco variáveis

Pega papel e caneta. Você vai precisar de cinco números, todos **seus**:

**CF: custos fixos do mês.** Tudo que você paga pra trabalhar, cliente ou não:
- internet e celular;
- transporte (combustível, manutenção, estacionamento, aplicativo);
- as **suas** ferramentas fixas, que você paga com ou sem cliente (acesso remoto, armazenamento, gerenciador de senhas). Licença por máquina ou por cliente não entra aqui: ela é repassada no contrato (capítulo 3);
- contador e, se você for MEI, o DAS;
- equipamento: notebook, ferramentas de rede, testador de cabo. Pega o valor e divide pelos meses que ele dura. Um notebook que dura três anos entra como o preço dele dividido por 36;
- curso e certificação, se você investe nisso todo ano. Mesma lógica: divide por 12.

**R: quanto você quer tirar por mês.** É o que sobra pra você depois de pagar tudo. Seja honesto e realista com a sua vida. Quem atende por fora não tem férias pagas nem décimo terceiro. Dois jeitos de resolver: calcula o H contando **11 meses de trabalho no ano** (o mês de férias você não fatura), ou aumenta o R pra cobrir.

**H: horas faturáveis por mês.** Esta é a variável que mais engana, então presta atenção. **Hora faturável não é hora trabalhada.** É a hora que você consegue cobrar de alguém. Do seu mês, desconta:
- deslocamento entre clientes;
- tempo fazendo orçamento e proposta;
- reunião que não vira contrato;
- estudo;
- administrativo: nota fiscal, cobrança, contador, compras.

Se você trabalha 8 horas por dia, dificilmente fatura as 8. Anota quanto você faturou de verdade num mês típico. Se ainda não tem histórico, chuta pra baixo. Pra contar as férias: H = horas faturáveis de um mês de trabalho × 11 ÷ 12.

**I: impostos sobre a nota, em %.**
- **Se você é MEI:** o imposto é um valor fixo por mês (o DAS). Ele entra no CF, e aqui o I fica zero. Antes, confirma com o seu contador se a sua atividade pode ser MEI.
- **Em qualquer outro enquadramento:** I é uma porcentagem sobre a nota → pergunta pro seu contador: "quanto de imposto sai de cada nota de serviço de TI que eu emitir?". Não pega esse número de vídeo nem de grupo.

**M: margem, em %.** É uma reserva pro imprevisto: cliente que atrasa, mês fraco, equipamento que queima, a hora que você estourou num projeto. Não é lucro de luxo, é colchão. Você define.

### As duas fórmulas

**Custo da hora** = (CF + R) ÷ H

Isso é o que uma hora sua precisa render pra pagar as contas e te sobrar o que você definiu, **antes** de imposto e margem.

**Preço mínimo da hora** = custo da hora ÷ (1 − I − M)

Aqui entram o imposto e a margem. Por que dividir em vez de somar? Porque o imposto e a margem saem do **preço**, não do custo. Se você só somasse uma porcentagem em cima do custo, ia sobrar menos do que você calculou. Dividindo por (1 − I − M), a conta fecha certinho.

Agora vamos ver isso com números.

> ### 📦 EXEMPLO FICTÍCIO — troque pelos seus números
>
> **Os números abaixo são inventados e redondos de propósito, só pra mostrar a conta. Não são preço de mercado, não são referência e não são números meus.** O seu resultado vai ser outro.
>
> | Variável | Valor fictício |
> |---|---|
> | CF (custos fixos do mês) | R$ 1.000 |
> | R (quanto quer tirar por mês) | R$ 3.000 |
> | H (horas faturáveis por mês, já na média de 11 meses de trabalho no ano) | 80 horas |
> | I (imposto) | 10% *(inventado, num enquadramento que não é MEI; o seu vem do contador)* |
> | M (margem) | 10% |
>
> **Custo da hora** = (1.000 + 3.000) ÷ 80 = 4.000 ÷ 80 = **R$ 50**
>
> **Preço mínimo da hora** = 50 ÷ (1 − 0,10 − 0,10) = 50 ÷ 0,80 = **R$ 62,50**
>
> **Agora o erro clássico.** Imagine que a mesma pessoa contou as horas **trabalhadas** (160 no mês) em vez das **faturáveis** (80):
>
> Custo da hora = 4.000 ÷ 160 = R$ 25 → preço mínimo = 25 ÷ 0,80 = **R$ 31,25**
>
> **Ela passaria a cobrar a metade do que precisa, sem perceber.** Trabalharia o mês inteiro, e no fim não ia sobrar o que ela planejou. É assim que muito técnico bom acaba no "trabalho muito e não sobra nada".

Esse exemplo é o único deste guia com valores em R$. Daqui pra frente, tudo é variável. Os números são os seus.

### Planilha 1: minha hora

Copia esta tabela num papel ou numa planilha e preenche:

| | Seu número |
|---|---|
| CF: custos fixos do mês | ________ |
| R: quanto quero tirar por mês | ________ |
| H: horas faturáveis por mês | ________ |
| I: imposto (%), do contador | ________ |
| M: margem (%) | ________ |
| **Custo da hora** = (CF + R) ÷ H | ________ |
| **Preço mínimo da hora** = custo ÷ (1 − I − M) | ________ |

Eu deixei essa planilha pronta no Google Sheets, que não exige licença. Abre o link, clica em **"Fazer uma cópia"** e ela vai pro seu Drive, já com as fórmulas: [LINK DA PLANILHA]

**Esse é o seu piso.** Abaixo dele, você está pagando pra trabalhar. Acima dele, você decide quanto, conforme o cliente, a urgência e o valor do que você entrega. O piso não é o preço que você vai cobrar sempre. É o número que você **nunca** vai cobrar menos.

**Primeira vitória do guia: se você preencheu a tabela, você já sabe mais sobre o seu preço do que a maioria dos técnicos que eu conheço.**

---

## Capítulo 3: Os três jeitos de cobrar

Com o preço da hora na mão, você escolhe **como** cobrar. São três modelos principais, e cada um serve pra uma situação.

### 1. Por hora ou por chamado avulso

**Como funciona:** o cliente chama, você vai (ou acessa remoto), resolve, cobra as horas.

**Como calcular:** preço da hora × horas estimadas + deslocamento. Muita gente cobra uma hora mínima por visita, porque o deslocamento come seu tempo de qualquer jeito.

**Quando serve:**
- cliente novo, pra se conhecerem;
- serviço pontual;
- projeto: montar uma rede, trocar um servidor, migrar e-mail.

**O risco:** é o modelo do técnico de plantão. Você só ganha quando algo quebra. Se você faz um trabalho excelente e nada quebra, você não ganha. O incentivo está ao contrário. E o cliente também não gosta: ele não sabe quanto vai gastar no mês, e começa a segurar chamado pra economizar, até a coisa explodir.

### 2. Por máquina ou por usuário

**Como funciona:** um valor mensal fixo por computador, ou por pessoa, que você cuida. É a resposta pro "quanto cobrar por máquina?" do começo.

**Como calcular:**
- **P** (valor por máquina por mês) = horas médias que cada máquina consome por mês × o preço da hora que você escolheu (nunca abaixo do piso).
- **Total mensal** = P × número de máquinas + **S**, que é o valor à parte de servidor, firewall e outros equipamentos que dão mais trabalho.

Pra achar as "horas médias por máquina", olha seu histórico: num cliente que você já atende, quantas horas você gasta por mês, dividido pelo número de máquinas → tira da média do seu histórico. Este guia não dá esse número. Se você ainda não tem histórico, faz o diagnóstico com calma e estima por cima.

**Quando serve:** empresa com muitas máquinas parecidas, onde o trabalho cresce junto com o número de computadores. É fácil de explicar: "cada máquina nova entra por P".

**O risco:** servidor e rede dão muito mais trabalho que uma estação. Se você não separar o S, vai cobrar uma máquina comum pelo servidor que te acorda de madrugada.

### 3. Pacote ou contrato mensal (valor fixo com escopo)

**Como funciona:** um valor fixo por mês para um conjunto de serviços escritos (o escopo, capítulo 4), com um tempo de resposta combinado (o SLA, capítulo 5).

**Como calcular:**
- horas previstas por mês × o preço da hora que você escolheu (nunca abaixo do piso);
- \+ um valor de **disponibilidade**: o fato de você estar de prontidão;
- \+ as **licenças por máquina ou por cliente** (monitoramento, antivírus, backup em nuvem), repassadas no contrato. Elas não entram no seu CF;
- o resultado arredondado, com o limite do que entra bem claro.

> "Meu sonho era ter um contrato fixo com um serviço de suporte que eu ligaria e eles simplesmente resolveriam"
> *(comentário no Reddit)*

Repara: é a fala de **quem quer comprar**. O cliente quer previsibilidade. Ele quer ligar e saber que alguém resolve.

**Quando serve:** cliente que você quer manter, empresa que não pode parar, relação de longo prazo.

**O risco:** sem escopo escrito, contrato mensal vira "faz tudo por um valor fixo". É por isso que os capítulos 4 e 5 existem.

### Lado a lado

| | Por hora/chamado | Por máquina/usuário | Contrato mensal |
|---|---|---|---|
| Previsibilidade pra você | Baixa | Média | Alta |
| Previsibilidade pro cliente | Baixa | Alta | Alta |
| Risco de virar "faz tudo" | Baixo | Médio | Alto sem escopo, baixo com escopo |
| Incentivo | Algo quebrar | Cuidar bem | Prevenir |
| Bom para | Projeto, cliente novo | Parque grande e parecido | Cliente que não pode parar |

**O modelo misto** é o que a maioria acaba usando: um contrato mensal (ou por máquina) pro dia a dia, e **projeto cobrado à parte, por hora**. O mensal paga o cuidado contínuo. O projeto paga o que é novo: rede nova, servidor novo, mudança de endereço. Isso evita a pergunta "mas isso não está no contrato?" toda vez que o cliente quer algo grande.

---

## Capítulo 4: Escopo, o que entra e o que fica de fora

### Por que o escopo vem antes do preço

Sem escopo, preço não tem chão. Você calcula um valor pra cuidar de rede, servidor e backup, e três meses depois está reestruturando a rede inteira e subindo sistema pra nuvem. Tudo pelo mesmo valor.

Escopo escrito protege você e protege o cliente. Ele sabe o que está pagando, você sabe o que está entregando.

### O que entra

O objetivo do meu contrato mensal é um só: **o cliente não ter que se preocupar com nada de TI.** Na prática, entra:

- **Cuidar da infraestrutura** da empresa.
- **Ser o ponto focal da empresa** para impressoras, telefonia, internet e links. Repara: eu não presto o suporte direto desses serviços. Eu faço a ponte com os fornecedores terceiros, porque conheço a infra e sei explicar o problema pra eles. Pro dono, é um contato só: eu.

### O que fica de fora (e vira projeto à parte)

Deixe escrito também o que **não** entra. No meu contrato, vira projeto à parte:
- **Ampliações.**
- **Reestruturações** e **alterações estruturais.**
- **Implementações novas.**
- **Subir banco de dados ou ERP pra nuvem.**

Tudo isso você cobra como projeto, por hora ou com valor fechado, a partir do seu preço da hora.

---

## Capítulo 5: SLA, em quanto tempo você responde

SLA é o acordo de **nível de serviço**. Em português direto: em quanto tempo você responde, e em que horário. É o que transforma "me liga quando precisar" num serviço profissional.

### Três níveis de gravidade

Nem todo chamado é igual. Separa em três níveis:

| Nível | O que é | Exemplo | Tempo de resposta |
|---|---|---|---|
| **1. Emergencial: parou a empresa** | Ninguém trabalha | Internet caiu, servidor fora, ninguém acessa o sistema | **[T1]** (no meu: 4 h) |
| **2. Mais importante: parou uma pessoa** | Um usuário ou um setor sem trabalhar | Máquina não liga, impressora do financeiro fora | **[T2]** (no meu: 12 h) |
| **3. Comum: pedido ou dúvida** | Ninguém parado | Criar usuário, instalar programa, tirar dúvida | **[T3]** (no meu: 24 h) |

Os tempos entre parênteses são os que eu uso no meu contrato: chamado comum, 24 horas; mais importante, 12 horas; emergencial, 4 horas. Não são regra de mercado. Os seus dependem da sua estrutura e de quantos clientes você atende. E na prática, o primeiro contato eu faço bem antes de vencer o prazo, e muitas vezes o problema está resolvido em menos tempo.

Repara: SLA é tempo de **resposta**, não de solução. Você garante que em [T1] alguém está olhando o problema. Prometa tempo de resposta; a solução você estima caso a caso.

### Horário coberto

Escreve qual é o horário normal e o que acontece fora dele. O meu contrato cobre o **horário comercial**. Atendimento fora do horário, quando é necessário, eu trato à parte, combinado separadamente.

É isso que resolve o "cliente liga até no sábado". Se o cliente pode ligar a qualquer hora pelo mesmo valor, ele vai ligar. Se está escrito que sábado é exceção e tem custo, ele só liga quando é exceção mesmo.

---

## Capítulo 6: A proposta de uma página

Chegou a hora de juntar tudo. Esta é a **segunda vitória** do guia: uma proposta que cabe numa folha, que o dono lê em dois minutos e entende.

Copia o modelo abaixo e preenche.

> **Este modelo é uma estrutura de proposta comercial, não um contrato.** Para o contrato, conversa com um advogado e com o seu contador.

---

> ### PROPOSTA DE SERVIÇOS DE TI
> **Para:** [EMPRESA DO CLIENTE] · **Contato:** [NOME DO DONO/RESPONSÁVEL] · **Data:** [DATA]
> **De:** [SEU NOME / SUA EMPRESA] · [TELEFONE] · [E-MAIL]
>
> **1. O que eu vi** *(o diagnóstico, em 3 linhas, na língua do dono)*
> [Ex.: "Hoje o backup não é testado, a rede cai em média [X] vezes por mês segundo vocês, e quando cai ninguém sabe quem chamar."]
>
> **2. O que eu proponho**
> Cuidar da TI da [EMPRESA] de forma contínua, pra que a empresa não pare, e quando parar, volte rápido.
>
> **3. O que está incluso** *(do capítulo 4)*
> - [item do escopo]
> - [item do escopo]
> - [item do escopo]
> - Visitas: [V] por mês
>
> **4. O que não está incluso** *(cobrado à parte, com orçamento antes)*
> - [ex.: ampliações, reestruturações, implementações novas, subir banco de dados ou ERP pra nuvem]
>
> **5. Tempo de resposta** *(do capítulo 5)*
> - Parou a empresa: [T1] · Parou uma pessoa: [T2] · Pedido/dúvida: [T3]
> - Horário coberto: [HORÁRIO] · Fora do horário: [REGRA]
> - Canal de chamado: [CANAL]
>
> **6. Investimento** *(do capítulo 3)*
> - Modelo: [mensal fixo / por máquina: P × nº de máquinas + S]
> - Valor mensal: **[SEU VALOR]**
> - Projetos fora do escopo: [SEU PREÇO DA HORA] por hora, com orçamento aprovado antes
>
> **7. Vigência e próximos passos**
> - Vigência: [PRAZO], renovação [automática / combinada]
> - Primeiro mês: levantamento e documentação da rede
> - Para começar: [assinatura / aceite por e-mail] até [DATA]

---

### Três dicas pra preencher

1. **O "O que eu vi" é o item mais importante.** É ele que mostra que você entendeu o negócio. Use as palavras do dono, não as suas. "A rede cai" é melhor que "instabilidade na camada de enlace".
2. **"Investimento", não "preço".** E sempre depois do escopo e do SLA. Quem lê de cima pra baixo chega no valor já sabendo o que está comprando.
3. **Valor que não cabe? Mexe no escopo.** Tire visitas, reduza o horário coberto, deixe um item como projeto. Nunca baixe o valor do mesmo escopo.

Leva essa proposta impressa ou em PDF. Explica item por item. E combina uma data pra resposta.

---

## Capítulo 7: Se você trabalha numa empresa

Se você é contratado e é, na prática, a TI da empresa, talvez tenha lido até aqui pensando "isso não é pra mim, eu não vendo contrato". É sim. Muda o uso.

### A mesma conta, outro objetivo

Você não vai mandar proposta pro seu chefe. Mas pode usar a **mesma estrutura** pra deixar claro o que você entrega:

- **O seu escopo real:** faz a lista do capítulo 4 com tudo que você cuida hoje. Rede, servidor, backup, sistema, usuários, telefonia, compras. Muita gente se assusta quando vê a lista escrita, porque o cargo diz "suporte" e a lista diz "a TI inteira".
- **O seu SLA real:** quanto tempo você leva pra responder quando para tudo? Em que horário você atende de fato? Se a resposta é "a qualquer hora, inclusive fim de semana", isso precisa estar escrito em algum lugar.
- **O que você evitou:** o backup que você restaurou, a queda que você resolveu antes de virar problema, a documentação que você fez.

### Pra que serve

Serve pra **conversa de cargo** com base em fato, e não em reclamação. Em vez de "eu faço tudo aqui", você chega com uma página: o que eu cuido, em quanto tempo eu respondo, o que eu evitei de parar. Eu não posso te prometer que essa conversa vai virar promoção ou aumento. Isso depende da empresa. Mas ela fica muito mais forte com escopo escrito do que sem.

### Atender por fora também?

Aqui é opinião minha, não orientação jurídica: **depende do acordo com a empresa onde você trabalha, e é caso a caso.** Se a sua empresa não aceita que você atenda por fora, eu respeitaria isso. Se tem espaço, por exemplo um horário flexível, eu acho que faz sentido e dá pra administrar. Na dúvida sobre o seu caso, conversa com a empresa antes.

---

## Fechando: o método em cinco linhas

1. **Custo da hora:** (CF + R) ÷ H, e depois ÷ (1 − I − M). Esse é o seu piso.
2. **Modelo:** por hora pra projeto e cliente novo; por máquina ou mensal pro dia a dia; misto na maioria dos casos.
3. **Escopo:** escrito, com o que entra e o que fica de fora.
4. **SLA:** três níveis e horário coberto.
5. **Proposta de uma página:** o que eu vi, o que eu proponho, o que entra, o que não entra, tempo de resposta, investimento, vigência.

Se você fez a conta e montou a proposta, você já sai deste guia com o que eu não tinha naquele dia em que travei.

### O próximo passo

Em breve eu vou te convidar pra uma aula ao vivo onde eu mostro a rede que sustenta o contrato e o caminho até o primeiro cliente fixo. Fica de olho no seu e-mail.

Eu ajudo técnico de informática a sair do balcão e cuidar da TI de empresas, ganhando a partir de cinco mil. Isso é a meta do caminho, não uma garantia: depende do seu trabalho, da sua região e dos seus clientes. O primeiro passo é o que você acabou de fazer: saber quanto vale a sua hora.

Te vejo lá.

**Eduardo Honorato**
TI Ninja · youtube.com/@tininjaconsult

### Os links deste guia

- A calculadora da hora, que faz a conta do capítulo 2 por você: [tininja.net/minha-hora](https://tininja.net/minha-hora/)
- O canal, com os vídeos de rede, servidor e firewall: [youtube.com/@tininjaconsult](https://www.youtube.com/@tininjaconsult)
- O dia a dia, no Instagram: [instagram.com/consult.tininja](https://www.instagram.com/consult.tininja/)

---
---

## O que o Eduardo precisa preencher (não vai pro PDF)

Os 7 detalhes chegaram em 17/10 e foram aplicados. Falta:

1. **Capítulo 2, [LINK DA PLANILHA]** → criar o modelo "Minha hora" no Google Sheets (as fórmulas do capítulo 2) e gerar o link de "fazer uma cópia".
2. **Revisão de voz** → ler em voz alta e trocar qualquer frase que não soe como ele fala, principalmente a abertura (reescrita a partir das palavras dele de 17/10).
3. **Modelo de proposta (cap. 6)** → os placeholders do modelo ([EMPRESA DO CLIENTE], [SEU VALOR], [T1]–[T3], [V] etc.) são **do leitor** e ficam no PDF como campos em branco. Não precisa preencher.
