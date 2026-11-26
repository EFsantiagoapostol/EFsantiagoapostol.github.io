/* PATIOS ACTIVOS · propuesta curso 2026-27
   CAJAS: cajas de material, cada una con su color y su lista para montar y recoger.
   PATIOS.primaria / PATIOS.infantil: un tema por semana. Cada estación: n (nombre), j (juego del banco, si existe), d (cómo se juega), caja.
   Si un nombre "j" coincide con un juego del banco, se puede abrir su ficha. */
const CAJAS={
  A:{n:'Saltos',col:'#D63B3B',items:['6 combas','1 cuerda larga','2 gomas elásticas','Tizas']},
  B:{n:'Carreras',col:'#1F7FD0',items:['12 conos','6 sacos','8 petos','4 testigos']},
  C:{n:'Puntería',col:'#E3A008',items:['10 bolos o botellas','6 aros','6 pelotas blandas','2 dianas']},
  D:{n:'Tradicionales',col:'#0E9470',items:['2 pañuelos','20 chapas','6 peonzas','Tizas']},
  E:{n:'Malabares',col:'#7652E0',items:['12 pañuelos de malabares','6 platos chinos','6 saquitos']},
  F:{n:'Pilota',col:'#E8622A',items:['8 pelotas de pilota blandas','Cinta para marcar la línea']},
  G:{n:'Balones',col:'#0B8A9E',items:['4 balones de baloncesto','4 balones de fútbol','8 petos','1 silbato']},
  H:{n:'Música',col:'#D63E6C',items:['1 altavoz','8 pañuelos de colores','Lista de canciones']},
  I:{n:'Inclusivo',col:'#56667E',items:['2 balones con cascabel','6 antifaces','Bolas de boccia','1 cuerda para red baja']},
  J:{n:'Infantil · Psicomotricidad',col:'#9BC21C',items:['Aros','2 túneles','Bancos bajos','Pelotas grandes']},
  K:{n:'Infantil · Juego libre',col:'#C2185B',items:['Paracaídas','Telas de colores','Burbujas','Globos','Tizas']}
};
const PATIOS={
 primaria:[
  {t:'Saltos',col:'#D63B3B',d:'Una semana para saltar de todas las formas posibles.',est:[
    {n:'Comba individual',d:'¿Cuántos saltos seguidos? Cada día intentamos mejorar la marca.',caja:'A'},
    {n:'Comba larga',j:'El reloj',d:'Dos dan a la cuerda y el resto entra, salta y sale sin pararla.',caja:'A'},
    {n:'La goma',d:'Saltos sobre la goma elástica a distintas alturas: tobillos, rodillas, cintura.',caja:'A'},
    {n:'Rayuela',j:'La rayuela',d:'Rayuela pintada con tiza en el suelo.',caja:'A'}]},
  {t:'Carreras y relevos',col:'#1F7FD0',d:'Correr rápido, cambiar de dirección y relevarse en equipo.',est:[
    {n:'Relevos de conos',d:'Llevar los conos de uno en uno al otro lado y construir una torre.',caja:'B'},
    {n:'Carrera de sacos',d:'Hasta el cono y vuelta, dentro del saco.',caja:'B'},
    {n:'Pista americana',d:'Recorrido con conos en zigzag, saltos y giros.',caja:'B'},
    {n:'Pilla pilla estatua',j:'Pilla pilla estatua',d:'Quien es pillado se queda estatua hasta que le salvan.',caja:'B'}]},
  {t:'Juegos de los abuelos',col:'#0E9470',d:'Los juegos de toda la vida, para jugar también en casa.',est:[
    {n:'El pañuelo',j:'El pañuelo',d:'Dos equipos con números; quien coge el pañuelo y vuelve sin ser pillado gana el punto.',caja:'D'},
    {n:'Las chapas',j:'Las chapas',d:'Carrera de chapas por un circuito pintado con tiza.',caja:'D'},
    {n:'La peonza',d:'¿Quién la hace bailar más tiempo?',caja:'D'},
    {n:'Escondite inglés',d:'Avanzar mientras quien la para no mira; si te ve moverte, vuelves al principio.',caja:'D'}]},
  {t:'Puntería',col:'#E3A008',d:'Lanzar con precisión: con la mano, con el pie y en equipo.',est:[
    {n:'Bolos',j:'Bolos de conos',d:'Derribar los bolos desde la línea; cada uno cuenta un punto.',caja:'C'},
    {n:'Matar el cono',j:'Matar el cono',d:'Dos equipos intentan derribar los conos del otro campo.',caja:'C'},
    {n:'Aros al cono',d:'Lanzar los aros para que caigan dentro del cono.',caja:'C'},
    {n:'La diana',d:'Lanzar pelotas blandas a la diana de la pared.',caja:'C'}]},
  {t:'Pilota valenciana',col:'#E8622A',d:'Nuestro deporte tradicional, a mano y con pelota blanda.',est:[
    {n:'Frontón a mano',j:'Pilota de mano',d:'Golpear la pelota contra la pared por parejas, a un bote.',caja:'F'},
    {n:'Pases por encima de la línea',d:'Pasarse la pelota con la mano por encima de la cinta, sin que bote dos veces.',caja:'F'},
    {n:'La pilota viajera',j:'La pilota viajera',d:'Pasar la pelota por todo el grupo sin que caiga.',caja:'F'}]},
  {t:'Malabares y equilibrio',col:'#7652E0',d:'Coordinación, paciencia y mucho equilibrio.',est:[
    {n:'Pañuelos',d:'Lanzar y recoger uno, dos y hasta tres pañuelos.',caja:'E'},
    {n:'Platos chinos',d:'Hacer girar el plato en el palo y pasárselo a un compañero.',caja:'E'},
    {n:'Equilibrio con saquito',d:'Caminar por la línea con un saquito en la cabeza.',caja:'E'}]},
  {t:'Juegos del mundo',col:'#C2185B',d:'Un juego de cada lugar: también de los países de nuestras familias.',est:[
    {n:'Mbube Mbube',j:'Mbube Mbube',d:'Sudáfrica: el león, con los ojos cerrados, intenta pillar a la impala guiándose por el grupo.',caja:'I'},
    {n:'Kabaddi',j:'Kabaddi',d:'India: el atacante entra diciendo «kabaddi» sin parar y toca a alguien.',caja:'B'},
    {n:'Estatuas musicales',j:'Estatuas musicales',d:'Bailar y, cuando para la música, quedarse estatua.',caja:'H'}]},
  {t:'Deporte inclusivo',col:'#56667E',d:'Jugar como juegan los deportistas paralímpicos.',est:[
    {n:'Goalball',d:'Con los ojos tapados, parar el balón con cascabel tumbados en el suelo.',caja:'I'},
    {n:'Boccia',d:'Lanzar las bolas lo más cerca posible de la bola blanca.',caja:'I'},
    {n:'Voleibol sentado',d:'Voleibol con una red baja y todos sentados en el suelo.',caja:'I'},
    {n:'El lazarillo',j:'El lazarillo',d:'Por parejas, uno guía con la voz al que lleva los ojos cerrados.',caja:'I'}]},
  {t:'Baile',col:'#D63E6C',d:'Una coreografía para toda la semana y bailes en corro.',est:[
    {n:'Coreografía de la semana',d:'Los dinamizadores enseñan un baile sencillo; el viernes lo bailamos todos.',caja:'H'},
    {n:'El espejo',j:'El espejo',d:'Por parejas, uno hace movimientos y el otro los copia como un espejo.',caja:'H'},
    {n:'Estatuas musicales',j:'Estatuas musicales',d:'Bailar y quedarse quieto cuando para la música.',caja:'H'}]},
  {t:'Orientación',col:'#0B8A9E',d:'Encontrar pistas por la Zona Santiago con un mapa.',est:[
    {n:'Busca las pistas',d:'Tarjetas escondidas por la pista; cada una lleva a la siguiente.',caja:'B'},
    {n:'Los colores',j:'Los colores',d:'Correr al cono del color que se diga.',caja:'B'},
    {n:'El mapa de la pista',d:'Por parejas, encontrar en la pista los puntos marcados en el mapa.',caja:'B'}]},
  {t:'Minitorneo 3x3',col:'#0B8A9E',d:'Partidos cortos de baloncesto y fútbol con juego limpio.',est:[
    {n:'Baloncesto 3x3',d:'Partidos a 5 canastas en una canasta; los equipos rotan.',caja:'G'},
    {n:'Fútbol 3x3',d:'Porterías pequeñas de conos y sin porteros.',caja:'G'},
    {n:'Los 10 pases',j:'Los 10 pases',d:'Mientras esperan turno: 10 pases seguidos sin que roben.',caja:'G'}]}
 ],
 infantil:[
  {t:'Circuito psicomotriz',col:'#9BC21C',d:'Reptar, saltar y mantener el equilibrio.',est:[
    {n:'Túneles',d:'Pasar reptando y a gatas por los túneles.',caja:'J'},
    {n:'Saltos de aro en aro',d:'Saltar con los pies juntos de un aro a otro.',caja:'J'},
    {n:'Banco del equilibrio',d:'Caminar por el banco bajo con los brazos abiertos.',caja:'J'}]},
  {t:'Paracaídas y telas',col:'#C2185B',d:'Juegos de corro y de cooperar todos juntos.',est:[
    {n:'El paracaídas',j:'El paracaídas',d:'Subir y bajar el paracaídas entre todos; ¡y pasar por debajo!',caja:'K'},
    {n:'Las telas',d:'Bailar y moverse con las telas de colores.',caja:'K'},
    {n:'Las olas',d:'Mover el paracaídas para que la pelota no se caiga.',caja:'K'}]},
  {t:'Nos movemos como animales',col:'#E3A008',d:'Canguros, cangrejos, serpientes y ranas.',est:[
    {n:'Canguros',d:'Saltar con los pies juntos.',caja:'J'},
    {n:'Cangrejos',d:'Andar hacia atrás y de lado con manos y pies.',caja:'J'},
    {n:'Serpientes',d:'Reptar por el túnel.',caja:'J'}]},
  {t:'Corros y canciones',col:'#D63E6C',d:'Los juegos de corro de siempre.',est:[
    {n:'El corro de la patata',d:'Corro cantando y agacharse al final.',caja:'K'},
    {n:'Al pasar la barca',d:'Canción y juego de pasar por debajo del puente.',caja:'K'},
    {n:'Estatuas musicales',j:'Estatuas musicales',d:'Bailar y quedarse quieto cuando para la música.',caja:'K'}]},
  {t:'Pelotas grandes',col:'#1F7FD0',d:'Rodar, lanzar y recibir.',est:[
    {n:'Rodar la pelota',d:'Por parejas, rodar la pelota grande de uno a otro.',caja:'J'},
    {n:'Bolos grandes',d:'Derribar bolos grandes rodando la pelota.',caja:'J'},
    {n:'Lanzar y atrapar',d:'Lanzar la pelota hacia arriba y atraparla.',caja:'J'}]},
  {t:'Equilibrio',col:'#7652E0',d:'Caminos pintados y huellas en el suelo.',est:[
    {n:'Caminos de tiza',d:'Seguir líneas rectas, en zigzag y en espiral.',caja:'K'},
    {n:'Las huellas',d:'Pisar solo las huellas pintadas.',caja:'K'},
    {n:'A la pata coja',d:'Aguantar a la pata coja contando hasta 5.',caja:'J'}]},
  {t:'Burbujas y globos',col:'#0B8A9E',d:'Perseguir, soplar y que no caiga.',est:[
    {n:'Caza burbujas',d:'Explotar las burbujas con distintas partes del cuerpo.',caja:'K'},
    {n:'El globo no cae',d:'Mantener el globo en el aire en grupo.',caja:'K'},
    {n:'Soplar el globo',d:'Llevar el globo soplando hasta la meta.',caja:'K'}]},
  {t:'Pintamos el patio',col:'#E8622A',d:'Dibujar caminos con tiza y recorrerlos.',est:[
    {n:'Rayuela',j:'La rayuela',d:'Rayuela sencilla con números.',caja:'K'},
    {n:'El camino',d:'Pintar un camino entre todos y recorrerlo saltando.',caja:'K'},
    {n:'Las formas',d:'Correr al círculo, al cuadrado o al triángulo pintado.',caja:'K'}]}
 ]
};
