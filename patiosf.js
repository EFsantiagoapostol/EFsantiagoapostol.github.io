/* FICHAS DE LOS JUEGOS DE PATIO (Primaria · Zona Santiago)
   Escritas para cualquier profe, sea o no de EF. Cada ficha: d (en una frase), mat, org, pasos, seg, tip (para quien vigila) y anim (plantilla de animación).
   Los juegos que ya tienen ficha de clase idéntica (El pañuelo, Matar el cono, Pilla pilla estatua, Los colores, Los 10 pases) usan esa ficha. */

/* ---- Plantillas de animación (campo 320x200) ---- */
const _lerp=(a,b,u)=>a+(b-a)*u;
function _path(pts,t0,t1,c,bobH=0,bobStep=0){ // recorre pts entre t0 y t1; bob = saltitos
  const L=[];let tot=0;for(let i=1;i<pts.length;i++)tot+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);
  const k=[];let acc=0;k.push([t0,pts[0][0],pts[0][1],c]);
  for(let i=1;i<pts.length;i++){acc+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);k.push([t0+(t1-t0)*acc/tot,pts[i][0],pts[i][1]])}
  if(!bobH)return k;
  const out=[];const at=t=>{for(let i=0;i<k.length-1;i++){if(t<=k[i+1][0]){const u=(t-k[i][0])/((k[i+1][0]-k[i][0])||1);return [_lerp(k[i][1],k[i+1][1],u),_lerp(k[i][2],k[i+1][2],u)]}}return [k.at(-1)[1],k.at(-1)[2]]};
  let n=0;for(let t=t0;t<=t1+1e-6;t+=bobStep/2){const [x,y]=at(t);out.push([+t.toFixed(3),x,n%2?y-bobH:y,n===0?c:undefined]);n++}
  return out;
}
const _circle=(cx,cy,r,n,a0=0)=>Array.from({length:n},(_,i)=>{const a=a0+i*2*Math.PI/n;return [cx+r*Math.cos(a),cy+r*Math.sin(a)]});
function _jumps(x,y,t0,t1,per,h=8){const k=[[t0,x,y]];for(let t=t0;t+per<=t1+1e-6;t+=per){k.push([t+per*.15,x,y],[t+per*.3,x,y-h],[t+per*.5,x,y])}k.push([t1,x,y]);return k}

const ANIMT={
  comba1:()=>({dur:4,leg:{b:'Saltan',r:'Saltan',v:'Saltan'},
    props:[60,160,260].map(x=>({t:'rope',x1:x-14,y1:110,x2:x+14,y2:110,amp:30,per:1})),
    actors:[60,160,260].map((x,i)=>({c:['b','r','v'][i],k:_jumps(x,106,0,4,1)}))}),
  combalarga:()=>({dur:8,leg:{o:'Dan a la cuerda',b:'Saltan'},
    props:[{t:'rope',x1:98,y1:100,x2:222,y2:100,amp:34,per:1.2}],
    actors:[{c:'o',k:[[0,90,100]]},{c:'o',k:[[0,230,100]]},
      {c:'b',k:[[0,160,150],[1.2,160,150],[1.7,160,100],..._jumps(160,100,1.8,5.4,1.2).slice(1),[6.2,160,36],[7.9,160,36],[8,160,150]]},
      {c:'b',k:[[0,160,170],[6,160,170],[7.2,160,150],[8,160,150]]}]}),
  goma:()=>({dur:6,leg:{o:'Sujetan la goma',b:'Salta'},
    props:[{t:'line',x1:105,y1:100,x2:215,y2:100,solid:1}],
    actors:[{c:'o',k:[[0,100,100]]},{c:'o',k:[[0,220,100]]},
      {c:'b',k:[[0,160,124],[.6,160,100-14],[1,160,80],[1.6,160,100-14],[2,160,124],[2.6,150,100-14],[3,140,80],[3.6,150,100-14],[4,160,124],[6,160,124]]},
      {c:'b',k:[[0,40,150]]},{c:'b',k:[[0,60,160]]}]}),
  rayuela:()=>{const cells=[[90,100],[120,100],[150,88],[150,112],[180,100],[210,88],[210,112],[240,100]];
    const hop=[[60,100],[90,100],[120,100],[150,100],[180,100],[210,100],[240,100],[268,100]];
    return {dur:8,leg:{b:'Salta a la pata coja'},props:[...cells.map(([x,y],i)=>({t:'rect',x:x-15,y:y-12,w:30,h:24,n:String(i+1)}))],
      actors:[{c:'b',k:[..._path(hop,0,3.5,'b',6,.45),..._path([...hop].reverse(),3.8,7.3,undefined,6,.45),[8,60,100]]}],
      balls:[{w:1,k:[[0,60,100],[.6,90,100],[7.3,90,100],[7.5,64,96],[8,60,100]]}]}},
  relevo:(o={})=>{const lane=(y,c,d)=>({c,k:o.slow?[..._path([[60,y],[262,y]],d,d+3.6,c,6,.5),..._path([[262,y],[60,y]],d+3.8,d+7.2,undefined,6,.5),[8,60,y]]:[[0,60,y],[d,60,y],[d+2.8,262,y],[d+3.1,262,y],[d+6,60,y],[8,60,y]]});
    return {dur:8,leg:{b:'Equipo azul',r:'Equipo rojo'},
    props:[{t:o.cone?'hoop':'cone',x:270,y:70,c:'#E3A008'},{t:o.cone?'hoop':'cone',x:270,y:140,c:'#E3A008'},{t:'line',x1:48,y1:20,x2:48,y2:180},...(o.cone?[{t:'cone',x:270,y:70,c:'#1F7FD0',show:2.9},{t:'cone',x:270,y:140,c:'#D63B3B',show:3.3}]:[])],
    actors:[lane(70,'b',0),{c:'b',k:[[0,30,70]]},{c:'b',k:[[0,14,70]]},lane(140,'r',.4),{c:'r',k:[[0,30,140]]},{c:'r',k:[[0,14,140]]}]}},
  circuito:()=>{const p=[[40,100],[80,80],[120,120],[160,80],[200,120],[240,80],[272,100],[292,140],[160,175],[40,140],[40,100]];
    return {dur:8,leg:{b:'Hace el recorrido'},props:[80,120,160,200,240].map((x,i)=>({t:'cone',x,y:i%2?100:100,c:'#E8622A'})).concat([{t:'hoop',x:272,y:100}]),
      actors:[{c:'b',k:_path(p,0,8,'b')},{c:'b',k:[[0,22,100]]}]}},
  lanzar:(o={})=>{const T=o.target;let props=[],ball;
    if(T==='bolos'){props=[[252,100],[264,92],[264,108],[276,84],[276,100],[276,116]].map(([x,y])=>({t:'cone',x,y,c:'#E3A008',fall:2.3}));ball=[[0,70,100],[1,70,100],[2.3,262,100],[4.9,290,100],[5,70,100]]}
    if(T==='aro'){props=[{t:'cone',x:250,y:100,c:'#E8622A'},{t:'hoop',x:250,y:100,show:2.3}];ball=[[0,70,100],[1,70,100],[1.7,160,60],[2.3,250,100],[4.9,250,100],[5,70,100]]}
    if(T==='diana'){props=[{t:'wall',x:300,y:20,w:10,h:160},{t:'diana',x:292,y:100}];ball=[[0,70,100],[1,70,100],[1.7,180,70],[2.3,290,100],[2.7,270,120],[4.9,270,120],[5,70,100]]}
    return {dur:5,leg:{b:'Lanza',p:'Esperan turno'},props,actors:[{c:'b',k:[[0,60,100],[1,68,100],[1.4,62,100]]},{c:'p',k:[[0,30,82]]},{c:'p',k:[[0,30,118]]}],balls:[{k:ball}]}},
  pared:()=>({dur:3.8,leg:{b:'Jugador 1',r:'Jugador 2'},props:[{t:'wall',x:10,y:10,w:300,h:10},{t:'line',x1:20,y1:120,x2:300,y2:120,dash:1}],
    actors:[{c:'b',k:[[0,130,150],[2,140,150],[3.8,130,150]]},{c:'r',k:[[0,200,150],[1.9,200,145],[3.8,200,150]]}],
    balls:[{k:[[0,132,140],[.8,160,24],[1.4,192,95],[1.9,200,138],[2.7,170,24],[3.3,138,95],[3.8,132,140]]}]}),
  red:(o={})=>({dur:4,leg:{b:'Equipo azul',r:'Equipo rojo'},props:[{t:'net',x:160}],
    actors:[{c:'b',r:o.sit?7:8.5,k:[[0,95,70]]},{c:'b',r:o.sit?7:8.5,k:[[0,95,130],[2,105,125],[4,95,130]]},{c:'r',r:o.sit?7:8.5,k:[[0,225,70],[1,220,75],[4,225,70]]},{c:'r',r:o.sit?7:8.5,k:[[0,225,130]]}],
    balls:[{k:[[0,100,70],[.5,160,40],[1,220,74],[1.5,225,126],[2,160,95],[2.5,104,126],[3,95,74],[3.5,98,70],[4,100,70]]}]}),
  corro:(o={})=>{const N=8,acts=[];for(let i=0;i<N;i++){const k=[];for(let t=0;t<=6.0001;t+=.25){const tt=o.freeze?(t<2.5?t:t<4?2.5:t-1.5):t;const a=i*2*Math.PI/N+tt*.6;k.push([+t.toFixed(2),160+60*Math.cos(a),100+55*Math.sin(a),o.freeze?(t>=2.5&&t<4?'g':'p'):undefined])}acts.push({c:'p',k})}
    acts.push({c:'y',k:[[0,290,172]]});return {dur:6,leg:{p:'Bailan',g:'¡Estatua!',y:'Pone la música'},props:[],actors:acts}},
  viajera:()=>{const pts=_circle(160,100,70,7,-Math.PI/2);const k=[];pts.concat([pts[0]]).forEach((p,i)=>k.push([i*.5,160+(p[0]-160)*.8,100+(p[1]-100)*.8]));
    return {dur:3.5,leg:{b:'Jugadores'},props:[],actors:pts.map(([x,y])=>({c:'b',k:[[0,x,y]]})),balls:[{k}]}},
  mbube:()=>{const ring=_circle(160,100,78,12);return {dur:6,leg:{b:'El corro',r:'León (ojos tapados)',v:'Impala'},props:[],
    actors:[...ring.map(([x,y])=>({c:'b',k:[[0,x,y]]})),{c:'r',k:[[0,130,100],[2,150,80],[4,190,110],[6,130,100]]},{c:'v',k:[[0,200,95],[2,195,125],[4,140,80],[6,200,95]]}]}},
  espejo:()=>({dur:4,leg:{b:'Se mueve',r:'Es el espejo'},props:[{t:'line',x1:160,y1:20,x2:160,y2:180,dash:1}],
    actors:[50,100,150].flatMap((y,i)=>{const d=i%2?1:-1;return [{c:'b',k:[[0,120,y],[1,135,y+12*d],[2,110,y],[3,135,y-12*d],[4,120,y]]},{c:'r',k:[[0,200,y],[1,185,y+12*d],[2,210,y],[3,185,y-12*d],[4,200,y]]}]})}),
  baile:()=>({dur:4,leg:{y:'Dinamizadores',p:'Todos bailan'},props:[],
    actors:[{c:'y',k:[[0,130,30],[1,145,30],[2,130,30],[3,115,30],[4,130,30]]},{c:'y',k:[[0,190,30],[1,205,30],[2,190,30],[3,175,30],[4,190,30]]},
      ...[80,125,170].flatMap(y=>[70,125,180,235].map(x=>({c:'p',k:[[0,x,y],[1,x+15,y],[2,x,y-8],[3,x-15,y],[4,x,y]]})))]}),
  pistas:()=>{const S=[[60,40],[270,50],[250,160],[80,160]];return {dur:8,leg:{b:'Pareja'},props:S.map(([x,y],i)=>({t:'star',x,y,n:String(i+1)})),
    actors:[0,1].map(j=>({c:'b',k:_path([[160,100],...S.map(([x,y])=>[x+(j?8:-8),y+14]),[160,100]].map((p,i)=>i===0||i===5?[p[0]+(j?8:-8),p[1]]:p),0,8,'b')}))}},
  malabares:()=>({dur:2,leg:{b:'Malabarista'},props:[],actors:[{c:'b',k:[[0,160,150]]}],
    balls:[0,2/3,4/3].map(off=>{const k=[];for(let t=0;t<=2.0001;t+=.1){const ph=(t+off)%2;k.push([+t.toFixed(2),160-16*Math.cos(Math.PI*ph),138-78*Math.abs(Math.sin(Math.PI*ph))])}return {w:1,k}})}),
  giro:()=>{const C=[[90,100],[230,100]];return {dur:4,leg:{b:'Jugadores',y:'Peonza o plato girando'},props:[],
    actors:[{c:'b',k:[[0,70,130]]},{c:'b',k:[[0,250,130]]},...C.map(([cx,cy])=>{const k=[];for(let t=0;t<=4.0001;t+=.1){const a=t*14;k.push([+t.toFixed(2),cx+5*Math.cos(a),cy+5*Math.sin(a)])}return {c:'y',r:6,k}})]}},
  equilibrio:()=>({dur:8,leg:{b:'Caminan con el saquito'},props:[60,100,140].map(y=>({t:'line',x1:50,y1:y,x2:270,y2:y,solid:1})),
    actors:[60,100,140].map((y,i)=>({c:'b',k:[[0,50,y],[7,270,y],[8,50,y]].map(f=>[f[0]+0*i,...f.slice(1)])})),
    balls:[60,100,140].map(y=>({w:1,k:[[0,50,y-12],[7,270,y-12],[8,50,y-12]]}))}),
  boccia:()=>({dur:6,leg:{b:'Equipo azul',r:'Equipo rojo'},props:[],
    actors:[{c:'b',k:[[0,50,80]]},{c:'r',k:[[0,50,120]]},{c:'b',r:5,k:[[0,60,85],[1,60,85],[2,215,96]]},{c:'r',r:5,k:[[0,60,115],[3,60,115],[4,225,112]]},{c:'b',r:5,k:[[0,60,85],[4.5,60,85],[5.5,228,100]]}],
    balls:[{k:[[0,230,100]]}]}),
  goalball:()=>({dur:5,leg:{b:'Defienden (ojos tapados)',r:'Atacan'},props:[{t:'line',x1:25,y1:20,x2:25,y2:180,solid:1},{t:'line',x1:295,y1:20,x2:295,y2:180,solid:1}],
    actors:[{c:'b',k:[[0,40,60]]},{c:'b',k:[[0,40,100]]},{c:'b',k:[[0,40,140],[1.6,40,140],[2.1,40,122],[4,40,122],[5,40,140]]},{c:'r',k:[[0,280,60]]},{c:'r',k:[[0,280,100]]},{c:'r',k:[[0,280,140]]}],
    balls:[{k:[[0,272,100],[.6,272,100],[2.2,48,122],[2.6,70,125],[4.9,70,125],[5,272,100]]}]}),
  basket3:()=>({dur:6,leg:{b:'Equipo azul',r:'Equipo rojo'},props:[{t:'hoopc',x:160,y:26},{t:'line',x1:90,y1:14,x2:90,y2:90,dash:1},{t:'line',x1:230,y1:14,x2:230,y2:90,dash:1}],
    actors:[{c:'b',k:[[0,100,150],[2,110,140],[6,100,150]]},{c:'b',k:[[0,220,140],[2,205,110],[6,220,140]]},{c:'b',k:[[0,160,120],[3,150,70],[6,160,120]]},
      {c:'r',k:[[0,120,120],[2,130,115],[6,120,120]]},{c:'r',k:[[0,200,120],[2,190,100],[6,200,120]]},{c:'r',k:[[0,160,80],[3,170,60],[6,160,80]]}],
    balls:[{k:[[0,104,150],[.7,104,150],[1.4,207,112],[2,207,112],[2.8,152,72],[3.4,152,72],[4,160,28],[4.4,165,50],[6,104,150]]}]}),
  futbol3:()=>({dur:6,leg:{b:'Equipo azul',r:'Equipo rojo'},props:[{t:'cone',x:20,y:82,c:'#E8622A'},{t:'cone',x:20,y:118,c:'#E8622A'},{t:'cone',x:300,y:82,c:'#E8622A'},{t:'cone',x:300,y:118,c:'#E8622A'},{t:'line',x1:160,y1:14,x2:160,y2:186,dash:1}],
    actors:[{c:'b',k:[[0,90,60],[3,180,70],[6,90,60]]},{c:'b',k:[[0,80,140],[3,200,140],[6,80,140]]},{c:'b',k:[[0,140,100],[3,240,100],[6,140,100]]},{c:'r',k:[[0,230,60],[6,230,60]]},{c:'r',k:[[0,230,140],[3,250,120],[6,230,140]]},{c:'r',k:[[0,200,100],[3,210,90],[6,200,100]]}],
    balls:[{k:[[0,145,104],[1,170,80],[1.8,190,140],[2.6,235,104],[3.4,302,100],[5.9,302,100],[6,145,104]]}]}),
  escondite:()=>{const ks=x=>[[0,x,175],[1.5,x,140],[2.5,x,140],[4,x,105],[5,x,105],[6.5,x,70],[7.5,x,70],[8.5,x,40],[9,x,175]];
    return {dur:9,leg:{y:'La para (de cara a la pared)',b:'Avanzan'},props:[{t:'wall',x:10,y:10,w:300,h:10}],
      actors:[{c:'y',k:[[0,160,28]]},{c:'b',k:ks(80)},{c:'b',k:ks(130)},{c:'b',k:[[0,190,175],[1.5,190,140],[2.5,190,140],[2.8,190,128],[3.4,190,175],[9,190,175]]},{c:'b',k:ks(240)}]}},
  chapas:()=>{const P=[];for(let i=0;i<=24;i++){const a=-Math.PI/2+i*2*Math.PI/24;P.push([160+110*Math.cos(a),100+62*Math.sin(a)])}
    const flick=(off)=>{const k=[];let ti=0;for(let i=0;i<=12;i++){const p=P[(i*2+off)%24];k.push([ti,p[0],p[1]]);ti+=.35;k.push([ti,p[0],p[1]]);ti+=.3}return k};
    return {dur:8,leg:{b:'Chapa 1',r:'Chapa 2'},props:[{t:'track'}],actors:[{c:'b',r:5,k:flick(0)},{c:'r',r:5,k:flick(1)}]}},
  kabaddi:()=>({dur:6,leg:{b:'Equipo azul',r:'Equipo rojo',g:'Tocado'},props:[{t:'line',x1:160,y1:14,x2:160,y2:186,solid:1}],
    actors:[{c:'b',k:[[0,80,100],[2,215,85],[2.4,210,88],[4,90,100],[6,80,100]]},{c:'b',k:[[0,70,50]]},{c:'b',k:[[0,70,150]]},
      {c:'r',k:[[0,230,80],[2.2,230,80,'g'],[5.8,230,80,'g'],[6,230,80,'r']]},{c:'r',k:[[0,250,40],[2,245,55],[3,190,90],[4,250,40]]},{c:'r',k:[[0,250,150],[3,200,120],[4.5,250,150]]}]}),
  lazarillo:()=>{const p=[[40,100],[90,70],[140,130],[190,70],[240,130],[285,100]];return {dur:8,leg:{b:'Guía (con la voz)',g:'Ojos cerrados'},
    props:[90,140,190,240].map((x,i)=>({t:'cone',x,y:100,c:'#E3A008'})),
    actors:[{c:'b',k:_path(p.map(([x,y])=>[x+12,y-10]),0,7,'b').concat([[8,52,90]])},{c:'g',k:_path(p,0.3,7.3,'g').concat([[8,40,100]])}]}}
};

/* ---- Fichas ---- */
const PF={
"Comba individual":{tpl:['comba1'],d:'Saltar a la comba cada uno con su cuerda, contando los saltos seguidos.',mat:'Combas (caja A · Saltos).',org:'Cada niño o niña con su comba, separados unos dos metros.',
  pasos:['Coge la comba por los mangos, con la cuerda detrás de los talones.','Gira la cuerda por encima de la cabeza y salta con los pies juntos cuando pasa por debajo.','Cuenta los saltos seguidos sin fallar.','Intenta mejorar tu marca: a la pata coja, cruzando los brazos o hacia atrás.'],seg:'Separados para no darse con la cuerda y con las zapatillas atadas.',tip:'Si alguien no sabe saltar, que pase la cuerda por delante, la pise y salte por encima: así aprende el ritmo.'},
"Comba larga":{tpl:['combalarga'],d:'Dos dan a una cuerda larga y el resto entra, salta y sale.',mat:'Cuerda larga (caja A · Saltos).',org:'Dos «daores» en los extremos de la cuerda y el resto en fila a un lado.',
  pasos:['Los dos daores giran la cuerda a la vez, siempre hacia el mismo lado.','Entra el primero de la fila cuando la cuerda pasa por el suelo delante de él.','Salta tres veces y sale por el otro lado.','Quien pisa la cuerda pasa a dar, y el daor pasa a la fila.'],seg:'Se entra de uno en uno; la fila espera lejos de la cuerda.',tip:'Si cuesta entrar, se empieza con la cuerda quieta o balanceándola sin dar la vuelta completa.'},
"La goma":{tpl:['goma'],d:'Saltar sobre una goma elástica que sujetan dos compañeros, cada vez más alta.',mat:'Goma elástica (caja A · Saltos).',org:'Dos sujetan la goma con las piernas, a unos tres metros; el resto salta por turnos.',
  pasos:['La goma empieza a la altura de los tobillos.','Por turnos, se salta de un lado a otro de la goma sin tocarla.','Si todos lo consiguen, la goma sube: rodillas, muslos y cintura.','Quien falla pasa a sujetar la goma.'],seg:'Saltar de lado y caer con los dos pies; nunca tirarse de cabeza.',tip:'Para los pequeños, la goma se queda siempre en los tobillos y se inventan saltos.'},
"Rayuela":{tpl:['rayuela'],d:'El juego de la rayuela pintada en el suelo con tiza.',mat:'Tizas y un saquito (cajas A y E).',org:'Rayuelas pintadas en el suelo; grupos de 4 o 5 en cada rayuela.',
  pasos:['Lanza el saquito a la casilla 1.','Salta a la pata coja por las casillas, sin pisar la del saquito ni las rayas. En las casillas dobles se apoyan los dos pies.','A la vuelta, recoge el saquito sin apoyar el otro pie.','Si lo consigues, en tu próximo turno lanzas a la casilla 2.'],seg:'Pintar las rayuelas lejos de paredes y canastas.',tip:'Las rayuelas se pueden pintar el lunes y sirven toda la semana.'},
"Relevos de conos":{tpl:['relevo',{cone:1}],d:'Por equipos, llevar los conos de uno en uno al otro lado y construir una torre.',mat:'Conos y aros (cajas B y C).',org:'Equipos de 4 o 5 en fila. Los conos al lado de cada fila y un aro a unos 10 metros.',
  pasos:['El primero coge un cono y corre a dejarlo dentro del aro.','Vuelve y choca la mano del siguiente.','Cada cono va encima del anterior: hay que construir una torre.','Gana el equipo que termina su torre sin que se caiga.'],seg:'Cada equipo corre por su calle, sin cruzarse con los demás.',tip:'Para que nadie espere mucho, mejor equipos pequeños.'},
"Carrera de sacos":{tpl:['relevo',{slow:1}],d:'Llegar al cono y volver saltando dentro de un saco.',mat:'Sacos y conos (caja B · Carreras).',org:'Equipos en fila; un cono a unos 8 metros de cada fila.',
  pasos:['Métete en el saco y sujétalo con las manos a la altura de la cintura.','Salta con los pies juntos hasta el cono.','Rodea el cono y vuelve saltando.','Sal del saco y pásaselo al siguiente de tu fila.'],seg:'Sobre suelo liso y sin obstáculos. Si te caes, te levantas y sigues.',tip:'Mejor saltos cortos que largos: se cae menos.'},
"Pista americana":{tpl:['circuito'],d:'Un recorrido con conos en zigzag y saltos dentro de aros.',mat:'Conos y aros (cajas B y C).',org:'Recorrido marcado con conos. Se sale de uno en uno, cada cinco segundos.',
  pasos:['Sal corriendo en zigzag entre los conos.','Salta con los pies juntos dentro del aro.','Vuelve por fuera del recorrido.','Choca la mano del siguiente para que salga.'],seg:'Solo se sale cuando el anterior ha pasado todos los conos.',tip:'Se puede cronometrar a la vuelta: ¿mejora la clase su tiempo durante la semana?'},
"Las chapas":{tpl:['chapas'],d:'Carreras de chapas por un circuito pintado con tiza.',mat:'Chapas y tizas (caja D · Tradicionales).',org:'Un circuito pintado en el suelo; grupos de 4.',
  pasos:['Todos ponen su chapa en la salida.','Por turnos, cada uno da un toque a su chapa con el dedo.','Si la chapa se sale del circuito, vuelve a donde estaba.','Gana quien llega antes a la meta.'],seg:'Jugar en una zona sin carreras alrededor.',tip:'El circuito se pinta una vez y dura toda la semana.'},
"La peonza":{tpl:['giro'],d:'Hacer bailar la peonza el máximo tiempo posible.',mat:'Peonzas con cuerda (caja D · Tradicionales).',org:'Por parejas o tríos, en una zona sin carreras.',
  pasos:['Enrolla la cuerda desde la punta hacia arriba, bien apretada.','Sujeta la peonza con la punta hacia arriba y el extremo de la cuerda en el dedo.','Lánzala hacia el suelo tirando de la cuerda.','Cuenta cuánto tiempo baila: ¿quién aguanta más?'],seg:'Lanzar siempre hacia el suelo, nunca hacia los compañeros.',tip:'Los dinamizadores practican antes en clase de EF para poder enseñarlo.'},
"Escondite inglés":{tpl:['escondite'],d:'Avanzar hacia la pared mientras quien la para no mira.',mat:'Ninguno.',org:'Uno de cara a la pared; los demás en una línea a unos 15 metros.',
  pasos:['Quien la para dice «un, dos, tres, escondite inglés» mirando a la pared.','Mientras habla, los demás avanzan.','Al terminar la frase se gira: quien se esté moviendo vuelve a la línea de salida.','El primero que toca la pared la para en la siguiente ronda.'],seg:'Avanzar sin empujar a los compañeros.',tip:'Funciona con grupos grandes y no necesita material.'},
"Bolos":{tpl:['lanzar',{target:'bolos'}],d:'Derribar los bolos rodando una pelota desde una línea.',mat:'Bolos o botellas y pelotas (caja C · Puntería).',org:'Bolos en triángulo a unos 6 metros de la línea; grupos de 4.',
  pasos:['Coloca los bolos en triángulo.','Desde la línea, rueda la pelota por el suelo.','Cada bolo derribado es un punto.','Se vuelven a colocar y lanza el siguiente.'],seg:'Nadie coloca bolos mientras alguien está lanzando.',tip:'Uno del grupo es el encargado de colocar los bolos; cambia en cada ronda.'},
"Aros al cono":{tpl:['lanzar',{target:'aro'}],d:'Lanzar aros para que caigan alrededor de un cono.',mat:'Aros y conos (caja C · Puntería).',org:'Conos a unos 3 metros de la línea; grupos de 3 o 4.',
  pasos:['Coge el aro y apunta al cono.','Lánzalo con un giro suave de muñeca.','Si el aro rodea el cono, es punto.','Tres lanzamientos y cambio.'],seg:'Se recogen los aros solo cuando todos han lanzado.',tip:'Si es fácil, alejar el cono un paso.'},
"La diana":{tpl:['lanzar',{target:'diana'}],d:'Lanzar pelotas blandas a una diana colgada en la pared.',mat:'Dianas y pelotas blandas (caja C · Puntería).',org:'La diana en la pared y una línea de lanzamiento a unos 4 metros.',
  pasos:['Ponte detrás de la línea.','Lanza la pelota por encima del hombro apuntando al centro.','El centro vale 3 puntos; el anillo, 2; el borde, 1.','Tres lanzamientos y cambio.'],seg:'Solo pelotas blandas y nadie delante de la diana.',tip:'Los dinamizadores llevan la cuenta de puntos.'},
"Frontón a mano":{tpl:['pared'],d:'Golpear con la mano una pelota blanda contra la pared, por parejas.',mat:'Pelotas de pilota blandas y cinta (caja F · Pilota).',org:'Por parejas frente a la pared, con una línea de cinta en el suelo.',
  pasos:['Uno golpea la pelota con la palma de la mano contra la pared.','La pelota puede botar una vez en el suelo.','El compañero la devuelve contra la pared.','Gana el punto quien no falla. Se juega a 5 puntos.'],seg:'Golpear con la mano abierta y solo con pelotas blandas.',tip:'Es la base de nuestra pilota valenciana.'},
"Pases por encima de la línea":{tpl:['red'],d:'Pasarse la pelota con la mano por encima de una cinta en el suelo, sin que bote dos veces.',mat:'Pelota blanda y cinta (caja F · Pilota).',org:'Dos parejas, una a cada lado de la cinta.',
  pasos:['Una pareja saca golpeando la pelota con la mano hacia el otro lado.','La pelota puede botar una vez.','El otro lado la devuelve golpeándola con la mano.','Es punto si la pelota bota dos veces o sale fuera.'],seg:'Mano abierta y sin pasar al campo contrario.',tip:'Así se juega a «llargues», una modalidad de pilota.'},
"La pilota viajera":{tpl:['viajera'],d:'Pasar la pelota por todo el grupo sin que caiga al suelo.',mat:'Una pelota blanda (caja F · Pilota).',org:'En círculo, separados un paso.',
  pasos:['Uno golpea la pelota con la mano hacia el compañero de al lado.','El compañero la controla y la pasa al siguiente.','Contamos cuántos pases damos sin que caiga.','Si cae, empieza la cuenta de nuevo.'],seg:'Golpes suaves y mirando a quién se la pasas.',tip:'Reto para la semana: batir el récord del grupo cada día.'},
"Pañuelos":{tpl:['malabares'],d:'Malabares con pañuelos: lanzar y recoger uno, dos y hasta tres.',mat:'Pañuelos de malabares (caja E · Malabares).',org:'Cada uno con sus pañuelos, separados.',
  pasos:['Lanza un pañuelo hacia arriba con una mano y recógelo con la otra.','Con dos: lanza el segundo cuando el primero está arriba del todo.','Con tres: ¡como los malabaristas!','Los dinamizadores enseñan el truco a quien empieza.'],seg:'Sin riesgo: los pañuelos caen despacio.',tip:'Es un buen rincón para quien prefiere no correr.'},
"Platos chinos":{tpl:['giro'],d:'Hacer girar un plato sobre un palo y pasárselo a un compañero.',mat:'Platos chinos con su palo (caja E · Malabares).',org:'Por parejas, en una zona sin carreras.',
  pasos:['Pon el plato en la punta del palo, por la ranura de abajo.','Haz círculos con el palo hasta que el plato gire solo.','Pon el palo recto y aguanta.','Pásale el plato girando a tu compañero.'],seg:'Los platos no se lanzan.',tip:'Al principio, el compañero puede ayudar a darle impulso con la mano.'},
"Equilibrio con saquito":{tpl:['equilibrio'],d:'Caminar por una línea con un saquito en la cabeza sin que se caiga.',mat:'Saquitos y tizas (caja E · Malabares).',org:'Líneas pintadas en el suelo; de uno en uno por línea.',
  pasos:['Ponte el saquito en la cabeza.','Camina por la línea sin salirte.','Si se cae, vuelve a ponértelo y sigue desde ahí.','Prueba también hacia atrás o de puntillas.'],seg:'Despacio y mirando al frente.',tip:'Con los pequeños, la línea puede ser más ancha.'},
"Mbube Mbube":{tpl:['mbube'],d:'Juego de Sudáfrica: el león, con los ojos tapados, intenta pillar a la impala dentro del corro.',mat:'Un antifaz (caja I · Inclusivo).',org:'Todos en corro; dentro, el león con los ojos tapados y la impala.',
  pasos:['El león lleva los ojos tapados; la impala se mueve en silencio dentro del corro.','El corro dice «mbube, mbube» más fuerte cuanto más cerca está el león de la impala.','El león intenta tocar a la impala.','Si la pilla o pasa un minuto, otros dos salen al centro.'],seg:'El corro cuida de que el león no se salga.',tip:'Explicar que «mbube» significa «león» en zulú.'},
"Kabaddi":{tpl:['kabaddi'],d:'Juego de la India: el atacante entra en el campo contrario diciendo «kabaddi» sin respirar y toca a alguien.',mat:'Conos para marcar la línea central (caja B).',org:'Dos equipos, cada uno en su mitad del campo.',
  pasos:['Un atacante entra en el campo rival diciendo «kabaddi, kabaddi» sin parar.','Intenta tocar a un rival y volver a su campo antes de quedarse sin aire.','Si lo consigue, el tocado se queda fuera un turno.','Después ataca el otro equipo.'],seg:'Solo se toca; nunca se agarra ni se empuja.',tip:'Si alguien se queda sin aire en campo rival, no pasa nada: vuelve a su campo y ataca el otro equipo.'},
"Estatuas musicales":{tpl:['corro',{freeze:1}],d:'Bailar mientras suena la música y quedarse quieto como una estatua cuando para.',mat:'Altavoz (caja H · Música).',org:'Todos repartidos por el espacio; un dinamizador maneja la música.',
  pasos:['Mientras suena la música, todos bailan.','Cuando para, todos se quedan quietos como estatuas.','Quien se mueve ayuda a vigilar en la siguiente ronda.','Se puede pedir una estatua concreta: de animal, a la pata coja…'],seg:'Bailar sin chocar y con espacio despejado.',tip:'Nadie queda eliminado mucho rato: en la ronda siguiente vuelve a jugar.'},
"Goalball":{tpl:['goalball'],d:'Deporte paralímpico: con los ojos tapados, parar un balón con cascabel.',mat:'Balón con cascabel y antifaces (caja I · Inclusivo).',org:'Dos equipos de 3, cada uno en un fondo del campo y con antifaz.',
  pasos:['Un equipo rueda el balón con cascabel hacia el otro fondo.','Los defensores escuchan el cascabel y se tumban de lado para pararlo.','Si el balón pasa la línea de fondo, es gol.','Se juega en silencio para poder oír el cascabel.'],seg:'Silencio total y el balón siempre rodando por el suelo.',tip:'Buen momento para hablar de cómo juegan los deportistas con discapacidad visual.'},
"Boccia":{tpl:['boccia'],d:'Deporte paralímpico: lanzar las bolas lo más cerca posible de la bola blanca.',mat:'Bolas de boccia (caja I · Inclusivo).',org:'Dos equipos; la bola blanca a unos 6 metros.',
  pasos:['Se lanza la bola blanca.','Por turnos, cada equipo rueda o lanza sus bolas para dejarlas cerca de la blanca.','Se pueden empujar las bolas del otro equipo.','Gana el punto el equipo con la bola más cerca de la blanca.'],seg:'Lanzar rodando o por abajo.',tip:'Se puede jugar sentado, como en los Juegos Paralímpicos.'},
"Voleibol sentado":{tpl:['red',{sit:1}],d:'Voleibol con una red baja y todos sentados en el suelo.',mat:'Cuerda para red baja y balón blando (caja I · Inclusivo).',org:'Dos equipos de 3 o 4, sentados a cada lado de la cuerda.',
  pasos:['Se juega sentado: al golpear, el culo no se levanta del suelo.','Se pasa el balón por encima de la cuerda golpeándolo con las manos.','El balón puede botar una vez.','Es punto si el balón bota dos veces en tu campo.'],seg:'Balón blando y separados para no chocar.',tip:'Es un deporte paralímpico de verdad.'},
"Coreografía de la semana":{tpl:['baile'],d:'Los dinamizadores enseñan un baile sencillo y el viernes lo bailamos todos.',mat:'Altavoz y la canción de la semana (caja H · Música).',org:'Dinamizadores delante y el resto en filas.',
  pasos:['Los dinamizadores enseñan los pasos de cuatro en cuatro.','Se practica cada parte despacio y sin música.','Se junta todo con la música.','El viernes, ¡todos a bailar!'],seg:'Dejar espacio entre filas para no chocar.',tip:'La canción y el baile los preparan los dinamizadores en clase de EF.'},
"El espejo":{tpl:['espejo'],d:'Por parejas, uno se mueve y el otro le copia como si fuera su reflejo.',mat:'Ninguno.',org:'Por parejas, uno frente a otro.',
  pasos:['Uno es la persona y el otro su espejo.','La persona hace movimientos lentos.','El espejo los copia a la vez, como un reflejo.','A la señal, se cambian los papeles.'],seg:'Movimientos lentos para que se puedan copiar.',tip:'Se puede hacer con música tranquila.'},
"Busca las pistas":{tpl:['pistas'],d:'Tarjetas escondidas por la pista; cada una dice dónde está la siguiente.',mat:'Tarjetas con pistas y conos (caja B).',org:'Por parejas. Las tarjetas se esconden antes del patio.',
  pasos:['Cada pareja recibe la primera pista.','Buscan el lugar que indica y encuentran la siguiente tarjeta.','Siguen la cadena de pistas hasta el final.','En la última hay una palabra secreta: ¿quién la descubre?'],seg:'Andando rápido, sin correr entre la gente.',tip:'Los dinamizadores esconden las tarjetas al empezar el patio.'},
"El mapa de la pista":{tpl:['pistas'],d:'Por parejas, encontrar en la pista los puntos marcados en un mapa.',mat:'Mapas de la Zona Santiago y conos con letras (caja B).',org:'Conos con letras repartidos por la pista.',
  pasos:['Cada pareja recibe un mapa con cuatro puntos marcados.','Van a cada punto y apuntan la letra del cono.','Vuelven a la salida con las cuatro letras.','Con las letras se forma una palabra.'],seg:'La pareja va siempre junta.',tip:'Se aprovecha el mapa que hace 6º en su situación de orientación.'},
"Baloncesto 3x3":{tpl:['basket3'],d:'Partidos cortos de 3 contra 3 a una sola canasta.',mat:'Balones de baloncesto y petos (caja G · Balones).',org:'Equipos de 3. Juegan dos equipos y el resto espera su turno.',
  pasos:['Se juega a una sola canasta.','Tras cada canasta o robo, el balón sale fuera de la línea antes de volver a atacar.','Gana el primero que llega a 5 canastas.','Entra el equipo que espera y sale el que pierde.'],seg:'Sin contacto; los que esperan, fuera del campo.',tip:'Un árbitro de juego limpio por partido.'},
"Fútbol 3x3":{tpl:['futbol3'],d:'Partidos de 3 contra 3 con porterías pequeñas de conos y sin porteros.',mat:'Balones de fútbol, conos y petos (caja G · Balones).',org:'Porterías de dos conos separados un metro; equipos de 3.',
  pasos:['No hay porteros: nadie puede parar con las manos.','Es gol si el balón pasa entre los conos.','Los partidos duran 4 minutos o hasta 3 goles.','Entra el equipo que espera.'],seg:'Tiros a ras de suelo.',tip:'Porterías pequeñas: hay que pasar más y tirar menos fuerte.'},
"El lazarillo":{tpl:['lazarillo'],d:'Por parejas, uno guía con la voz a su compañero, que lleva los ojos cerrados.',mat:'Antifaces y conos (caja I · Inclusivo).',org:'Por parejas, con un recorrido sencillo de conos.',
  pasos:['Uno cierra los ojos o se pone el antifaz.','El otro le guía solo con la voz: «adelante», «para», «a la derecha».','Hacen el recorrido entre los conos.','Después cambian los papeles y comentan cómo se han sentido.'],seg:'Andando despacio, nunca corriendo.',tip:'El guía es responsable de su compañero en todo momento.'}
};
