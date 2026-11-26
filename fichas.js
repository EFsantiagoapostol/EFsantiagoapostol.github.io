/* Fichas completas de juegos. Clave = nombre exacto del juego en GAMES.
   anim: campo 320x200. actors: k = [segundo, x, y, color?]  (b azul, r rojo, g estatua, y amarillo, v verde, p morado)
   balls: pelotas o pañuelo que se mueven. props: conos, aros, líneas. cap: subtítulos [segundo, texto]. */
const FICHAS={
"Pilla pilla estatua":{
  obj:"Correr esquivando, reaccionar rápido y ayudar a los compañeros.",
  mat:"Ninguno. Petos para quien pilla (opcional).",
  org:"Todo el grupo libre por la pista. Uno o dos pillan, según el tamaño del grupo.",
  pasos:["Quien pilla lleva peto y persigue al resto.","Si te pilla, te quedas quieto como una estatua, con las piernas abiertas y los brazos en cruz.","Un compañero te salva pasando por debajo de tus brazos.","Cada minuto cambia quién pilla."],
  var:["Para salvar hay que pasar entre las piernas (más difícil).","Las estatuas pueden salvarse también chocando la mano."],
  seg:"Se pilla tocando suave en el hombro o la espalda, nunca empujando.",
  anim:{dur:8,
    actors:[
      {c:'r',k:[[0,60,100],[2,150,70],[4,230,125],[6,120,155],[8,60,100]]},
      {c:'b',k:[[0,150,55,'b'],[1.9,158,66,'g'],[4.4,158,66,'g'],[4.6,158,66,'b'],[6,250,40],[8,150,55]]},
      {c:'b',k:[[0,262,150],[3,220,110],[4.3,170,72],[4.6,150,60],[6,90,40],[8,262,150]]},
      {c:'b',k:[[0,250,40],[4,285,95],[8,250,40]]}],
    cap:[[0,"Quien pilla (rojo) persigue a los demás."],[2,"Si te pilla, te quedas quieto como una estatua."],[4.2,"Un compañero te salva pasando por debajo de tus brazos."],[6,"¡Y vuelves a correr!"]]}},

"Pilla pilla cadena":{
  obj:"Cooperar para pillar y moverse coordinados con un compañero.",
  mat:"Ninguno.",
  org:"Todo el grupo en un espacio limitado (media pista). Empieza pillando una persona.",
  pasos:["Empieza pillando una persona.","A quien pilla, se da la mano con ella: ya son dos los que pillan.","La cadena crece con cada nuevo pillado y solo puede pillar con las manos libres de los extremos.","Si la cadena se suelta, no vale pillar hasta que vuelva a unirse.","Gana quien quede el último sin pillar."],
  var:["Cuando la cadena llega a 4, se parte en dos cadenas de 2.","Cadenas cogidas por los hombros en lugar de las manos."],
  seg:"La cadena no puede tirar fuerte ni hacer «látigo».",
  anim:{dur:9,links:[[0,1],[1,2]],
    actors:[
      {c:'r',k:[[0,60,100],[2.5,150,60],[5,230,110],[7.5,180,160],[8.9,70,105],[9,60,100]]},
      {c:'b',k:[[0,165,45,'b'],[2.4,160,55],[2.5,165,62,'r'],[5,245,118],[7.5,195,168],[8.9,86,110],[9,165,45,'b']]},
      {c:'b',k:[[0,255,125,'b'],[4.9,246,112],[5,258,126,'r'],[7.5,210,176],[8.9,100,116],[9,255,125,'b']]},
      {c:'b',k:[[0,270,40],[4.5,290,90],[9,270,40]]}],
    cap:[[0,"Empieza pillando una persona."],[2.5,"A quien pilla, se le da la mano: ya son dos."],[5,"La cadena crece y pilla junta, sin soltarse."],[7.5,"Gana quien quede el último sin pillar."]]}},

"El pañuelo":{
  obj:"Reaccionar rápido a una señal, correr y decidir cuándo coger el pañuelo.",
  mat:"Un pañuelo o un peto.",
  org:"Dos equipos en fila, uno a cada lado de la pista. Cada jugador tiene un número, que se repite en el otro equipo. El profe, en el centro, sujeta el pañuelo.",
  pasos:["El profe dice un número.","Los dos jugadores con ese número corren al centro.","Quien coge el pañuelo vuelve corriendo a su fila.","El otro intenta pillarle antes de que llegue.","Si llega sin ser pillado, punto para su equipo. Si le pillan, punto para el otro."],
  var:["Decir una operación (2 + 1) en lugar del número.","Correr de otra forma: a la pata coja, botando una pelota…"],
  seg:"No se puede pisar la línea del centro hasta coger el pañuelo, y se pilla tocando suave.",
  anim:{dur:8,
    props:[{t:'line',x1:160,y1:14,x2:160,y2:186,dash:1}],
    actors:[
      {c:'b',n:'1',k:[[0,40,60]]},{c:'b',n:'2',k:[[0,40,100],[1.5,40,100],[3,150,100],[3.3,146,100],[5,40,100],[8,40,100]]},{c:'b',n:'3',k:[[0,40,140]]},
      {c:'r',n:'1',k:[[0,280,60]]},{c:'r',n:'2',k:[[0,280,100],[1.5,280,100],[3,174,100],[4,120,104],[5,62,102],[6,120,100],[8,280,100]]},{c:'r',n:'3',k:[[0,280,140]]},
      {c:'y',k:[[0,160,122]]}],
    balls:[{w:1,k:[[0,160,108],[3,160,108],[3.3,146,90],[5,40,90],[7.9,40,90],[8,160,108]]}],
    cap:[[0,"Dos equipos en fila; cada jugador tiene un número."],[1.5,"El profe dice un número: «¡El 2!»"],[3,"Quien coge el pañuelo vuelve corriendo a su fila…"],[4,"…y el otro intenta pillarle antes de que llegue."],[5.5,"Llega sin ser pillado: ¡punto para su equipo!"]]}},

"Los 10 pases":{
  obj:"Pasar y recibir, buscar espacios libres y cooperar con el equipo.",
  mat:"Una pelota blanda y petos de dos colores.",
  org:"Equipos de 3 contra 3 en un espacio delimitado con conos.",
  pasos:["El equipo con pelota se la pasa sin que el otro la robe.","Se cuentan los pases en voz alta.","Con la pelota en las manos no se puede andar.","Si llegan a 10 pases seguidos, ganan un punto.","Si el otro equipo roba o la pelota cae, empieza a contar el otro equipo."],
  var:["Menos pases (5) para los pequeños.","Prohibido devolver el pase a quien te la ha pasado."],
  seg:"No se puede quitar la pelota de las manos: solo interceptar el pase.",
  anim:{dur:8,
    props:[{t:'cone',x:30,y:30,c:'#E39E00'},{t:'cone',x:290,y:30,c:'#E39E00'},{t:'cone',x:30,y:170,c:'#E39E00'},{t:'cone',x:290,y:170,c:'#E39E00'}],
    actors:[
      {c:'b',k:[[0,90,60],[4,100,80],[8,90,60]]},
      {c:'b',k:[[0,230,70],[4,215,55],[8,230,70]]},
      {c:'b',k:[[0,160,155],[4,175,150],[8,160,155]]},
      {c:'r',k:[[0,150,70],[1,170,68],[2,195,110],[3,140,120],[4,130,90],[5,180,80],[6,190,120],[7,150,100],[8,150,70]]},
      {c:'r',k:[[0,120,120],[2,140,130],[4,180,120],[6,120,100],[8,120,120]]},
      {c:'r',k:[[0,250,130],[3,220,120],[6,245,95],[8,250,130]]}],
    balls:[{k:[[0,94,60],[0.6,94,60],[1.4,226,70],[2,226,70],[2.8,164,152],[3.4,164,152],[4.2,104,80],[4.8,104,80],[5.6,219,56],[6.2,219,56],[7,179,148],[7.4,179,148],[8,94,60]]}],
    cap:[[0,"El equipo azul se pasa la pelota sin que el rojo la robe."],[1.4,"Cuentan en voz alta: 1…"],[2.8,"…2…"],[4.2,"…3… ¡hay que buscar espacios libres!"],[5.6,"Si llegan a 10 pases seguidos, punto."],[7,"Si el rojo roba, empieza a contar el rojo."]]}},

"Matar el cono":{
  obj:"Lanzar con puntería y defender en equipo.",
  mat:"Pelotas blandas y 3 a 5 conos por equipo.",
  org:"Dos equipos, cada uno en su mitad de pista. Cada equipo pone sus conos al fondo de su campo.",
  pasos:["Cada equipo defiende sus conos.","Desde su campo, se lanza la pelota para derribar los conos del otro equipo.","No se puede pasar la línea del centro.","Cada cono derribado es un punto.","Gana el equipo que derriba todos los conos del otro o tiene más puntos al final."],
  var:["Lanzar solo con la mano no dominante.","Golpear con el pie en lugar de lanzar."],
  seg:"Pelotas blandas y lanzamientos por debajo de la cintura.",
  anim:{dur:6,
    props:[{t:'line',x1:160,y1:14,x2:160,y2:186},{t:'cone',x:300,y:55,c:'#D63B3B'},{t:'cone',x:300,y:100,c:'#D63B3B',fall:2.6},{t:'cone',x:300,y:145,c:'#D63B3B'},{t:'cone',x:20,y:55,c:'#1F7FD0'},{t:'cone',x:20,y:100,c:'#1F7FD0'},{t:'cone',x:20,y:145,c:'#1F7FD0'}],
    actors:[
      {c:'b',k:[[0,100,100],[1.2,130,100],[2,120,100],[6,100,100]]},{c:'b',k:[[0,80,50]]},{c:'b',k:[[0,80,150]]},
      {c:'r',k:[[0,220,60],[1.4,240,85],[2.4,250,80],[6,220,60]]},{c:'r',k:[[0,230,140],[2,245,125],[6,230,140]]}],
    balls:[{k:[[0,108,100],[1.2,138,100],[2.6,294,100],[3,280,108],[5.9,280,108],[6,108,100]]}],
    cap:[[0,"Cada equipo defiende sus conos al fondo de su campo."],[1.2,"Se lanza la pelota para derribar los conos del otro equipo."],[2.7,"¡Cono derribado! Punto para el azul."],[4,"Siempre desde tu campo, sin pasar la línea del centro."]]}},

"Relevo de las tortugas":{
  obj:"Mantener el equilibrio y la postura a cuatro patas, y cooperar en un relevo.",
  mat:"Una pelota por equipo y un cono por fila.",
  org:"Equipos de 4 o 5 en fila, cada uno frente a su cono a unos 8 metros.",
  pasos:["El primero de cada fila se pone a cuatro patas con la espalda plana, como una mesa.","Un compañero le coloca la pelota en la espalda.","Avanza hasta el cono y vuelve sin que se caiga.","Si se cae, se vuelve a poner y sigue desde ahí.","Al llegar, choca la mano del siguiente."],
  var:["Con un cojín o un saquito en lugar de pelota (más fácil).","Por parejas: uno lleva la pelota y el otro le guía."],
  seg:"Ir despacio y mirando al frente; las filas, separadas.",
  anim:{dur:8,
    props:[{t:'cone',x:280,y:70,c:'#E39E00'},{t:'cone',x:280,y:140,c:'#E39E00'},{t:'line',x1:62,y1:20,x2:62,y2:180}],
    actors:[
      {c:'b',k:[[0,72,70],[3.6,262,70],[7,72,70],[8,72,70]]},{c:'b',k:[[0,40,70],[7,40,70],[7.6,72,70],[8,40,70]]},{c:'b',k:[[0,18,70]]},
      {c:'r',k:[[0,72,140],[4.2,262,140],[8,72,140]]},{c:'r',k:[[0,40,140]]},{c:'r',k:[[0,18,140]]}],
    balls:[{k:[[0,72,62],[3.6,262,62],[7,72,62],[8,72,62]]},{k:[[0,72,132],[2,177,132],[2.1,184,145],[2.8,184,145],[2.9,177,132],[4.2,262,132],[8,72,132]]}],
    cap:[[0,"A cuatro patas, con la pelota sobre la espalda."],[1.5,"Hay que llegar al cono y volver sin que se caiga."],[2.1,"¡Se ha caído! Se vuelve a poner y se sigue."],[6.8,"Al llegar, choca la mano del siguiente."]]}},

"Las cuatro esquinas":{
  obj:"Reaccionar, ponerse de acuerdo con la mirada y aprovechar el momento justo.",
  mat:"4 aros (o conos) para las esquinas.",
  org:"Grupos de 5: uno en cada esquina y uno en el centro.",
  pasos:["Los de las esquinas se miran y se ponen de acuerdo para cambiar de sitio.","Mientras cambian, el del centro intenta meterse en una esquina libre.","Quien se queda sin esquina pasa al centro.","No vale volver a la esquina de la que sales."],
  var:["Cambiar a la señal del profe: todos a la vez.","Con más esquinas que jugadores, cambiando de grupo."],
  seg:"Cuidado con los choques al cruzarse: se mira antes de salir.",
  anim:{dur:7,leg:{b:'En una esquina',r:'En el centro'},
    props:[{t:'hoop',x:60,y:50},{t:'hoop',x:260,y:50},{t:'hoop',x:60,y:150},{t:'hoop',x:260,y:150}],
    actors:[
      {c:'b',k:[[0,60,50],[1,60,50],[3,260,50],[7,260,50]]},
      {c:'b',k:[[0,260,50],[1,260,50],[2.6,110,52],[3.2,150,90,'r'],[4,160,100],[7,160,100]]},
      {c:'r',k:[[0,160,100],[1,160,100],[2.5,62,52,'b'],[7,60,50]]},
      {c:'b',k:[[0,60,150]]},{c:'b',k:[[0,260,150]]}],
    cap:[[0,"Cuatro en las esquinas y uno en el centro."],[1,"Los de arriba se miran… ¡y cambian de esquina!"],[2.5,"El del centro aprovecha y se mete en una esquina libre."],[4,"Quien se queda sin esquina pasa al centro."]]}},

"Los colores":{
  obj:"Escuchar, reaccionar rápido y orientarse en el espacio.",
  mat:"4 conos de colores (o aros), uno en cada esquina.",
  org:"Todo el grupo se mueve libre por el centro de la pista.",
  pasos:["Todos se mueven libres por el centro: andando, corriendo o saltando.","El profe dice un color.","Todos corren al cono de ese color.","Los últimos en llegar hacen el siguiente movimiento que elija el grupo."],
  var:["Decir dos colores seguidos para ir de uno a otro.","Enseñar una cartulina de color sin hablar (atención visual)."],
  seg:"Se llega al cono frenando, sin chocar ni tirarse.",
  anim:{dur:8,
    props:[{t:'cone',x:36,y:36,c:'#D63B3B'},{t:'cone',x:284,y:36,c:'#1F7FD0'},{t:'cone',x:36,y:164,c:'#E39E00'},{t:'cone',x:284,y:164,c:'#0E9470'}],
    actors:[
      {c:'p',k:[[0,140,90],[1.5,150,100],[3,54,46],[4.4,54,46],[5,150,95],[6.6,266,46],[8,140,90]]},
      {c:'p',k:[[0,180,110],[1.5,170,90],[3.2,58,62],[4.4,58,62],[5,175,110],[6.8,262,62],[8,180,110]]},
      {c:'p',k:[[0,160,70],[1.5,140,80],[3.1,72,44],[4.4,72,44],[5,140,80],[6.7,250,44],[8,160,70]]},
      {c:'p',k:[[0,130,125],[1.5,180,120],[3.4,74,60],[4.4,74,60],[5,160,125],[7,248,60],[8,130,125]]}],
    cap:[[0,"Todos se mueven libres por el centro."],[1.5,"El profe dice un color: «¡Rojo!»"],[3,"Todos corren al cono de ese color."],[5,"«¡Azul!» Y otra vez a correr."]]}},

"Pilla pilla por parejas":{
  obj:"Coordinarse con un compañero al correr y tomar decisiones juntos.",
  mat:"Ninguno.",
  org:"Por parejas cogidas de la mano. Una pareja pilla.",
  pasos:["Todos van por parejas, cogidos de la mano.","La pareja que pilla persigue a las demás sin soltarse.","Si pillan a una pareja, esta pasa a pillar.","Si una pareja se suelta, cuenta como pillada."],
  var:["Parejas cogidas por el codo o por el hombro.","Tríos en lugar de parejas."],
  seg:"Correr al ritmo del compañero, sin tirar del brazo."},

"Cruzar el río":{
  obj:"Cooperar, organizarse en equipo y mantener el equilibrio.",
  mat:"Aros (uno por persona del grupo, menos uno o dos).",
  org:"Grupos de 4 a 6 en un lado de la pista. El otro lado es la orilla de enfrente.",
  pasos:["Todo el grupo tiene que cruzar «el río» pisando solo dentro de los aros.","El último del grupo recoge el aro que queda libre y lo pasa hacia delante.","El primero lo coloca delante para avanzar.","Si alguien pisa el agua (fuera del aro), el grupo vuelve un paso atrás."],
  var:["Con menos aros: hay que compartir aro.","En silencio: solo con gestos."],
  seg:"Pasar los aros de mano en mano, sin lanzarlos."},

"Balón torre":{
  obj:"Pasar, desmarcarse y ocupar espacios libres para llegar a un objetivo.",
  mat:"Una pelota, petos y un aro por equipo.",
  org:"Dos equipos en un campo con un aro al fondo de cada lado. Un jugador de cada equipo es la «torre» y está dentro del aro del fondo contrario.",
  pasos:["Los equipos se pasan la pelota para hacerla llegar a su torre.","Con la pelota en las manos no se puede andar.","Si la torre la atrapa sin salir del aro, punto.","Después de cada punto, otro jugador pasa a ser torre."],
  var:["Dos torres por equipo.","La torre tiene que atraparla sin que bote."],
  seg:"No se quita la pelota de las manos: solo se intercepta."},

"El lazarillo":{
  obj:"Confiar en el compañero, orientarse sin la vista y guiar con la voz.",
  mat:"Pañuelos o antifaces (opcional) y conos para el recorrido.",
  org:"Por parejas. Un recorrido sencillo, sin obstáculos peligrosos.",
  pasos:["Uno cierra los ojos (o lleva antifaz).","El otro le guía solo con la voz: «adelante», «para», «gira a la derecha».","Hacen el recorrido entre los conos.","Después cambian los papeles y comentan cómo se han sentido."],
  var:["Guiar con una palmada o un sonido en lugar de palabras.","Guiar tocando el hombro."],
  seg:"Despacio y sin correr; el lazarillo es responsable de su compañero."}
};

/* Adaptaciones por etapa (propuestas; pendientes de revisar con el profe de cada etapa).
   Clave = juego; dentro, etapa: infantil · eso (Secundaria y Grado Básico). Primaria es la ficha principal. */
const ADAPT={
"Pilla pilla estatua":{infantil:"Espacio pequeño y el profe pilla al principio. Para salvar basta con chocar la mano. Se puede jugar con música: cuando para, todos estatuas.",eso:"Varios pilladores a la vez y espacio amplio. Para salvar, dos compañeros tienen que hacer un puente juntos."},
"Pilla pilla cadena":{infantil:"Cadena de dos como máximo, en un espacio pequeño y andando rápido en lugar de correr.",eso:"Cuando la cadena llega a 4 se parte en dos. Se puede jugar con balón: solo pilla quien lo lleva en la cadena."},
"El pañuelo":{infantil:"Por colores en lugar de números. Sin persecución: gana quien llega antes al pañuelo.",eso:"Operaciones o preguntas de otras materias antes de salir, y formas de desplazamiento distintas en cada ronda."},
"Los 10 pases":{eso:"4 contra 4, sin devolver al que te la pasó y con un máximo de 3 segundos con el balón. Sirve como introducción táctica a deportes de invasión."},
"Matar el cono":{infantil:"Conos grandes y cerca. Sin defensa: cada uno lanza por turnos.",eso:"Zonas prohibidas delante de los conos y lanzamientos solo tras un pase de un compañero."},
"Relevo de las tortugas":{infantil:"Sin relevo: cada uno va a su ritmo hasta el cono con un saquito en la espalda.",eso:"Por parejas: uno hace la «mesa» y el otro le guía. Sirve como calentamiento para acrosport."},
"Las cuatro esquinas":{infantil:"Con aros de colores y el profe en el centro al principio.",eso:"Con más esquinas y dos jugadores en el centro."},
"Los colores":{infantil:"Ideal para Infantil: colores y también formas o animales («¡al cono rojo saltando como canguros!»).",eso:"Con instrucciones combinadas: color más tipo de desplazamiento o más una tarea en el cono."},
"Pilla pilla por parejas":{infantil:"Andando rápido y en un espacio pequeño, de la mano de un compañero.",eso:"Por tríos, y la pareja que pilla tiene que llevar además un balón."},
"Cruzar el río":{infantil:"Con un aro para cada uno y el profe ayudando a pasar los aros.",eso:"Con menos aros que personas y en silencio: solo comunicación con gestos."},
"Balón torre":{eso:"Con zona de la torre protegida y defensa individual. Introducción táctica a balonmano y baloncesto."},
"El lazarillo":{infantil:"Con los ojos tapados solo unos segundos, de la mano del compañero y en línea recta.",eso:"Recorridos con obstáculos blandos y guía solo con sonidos o palmadas."}
};
