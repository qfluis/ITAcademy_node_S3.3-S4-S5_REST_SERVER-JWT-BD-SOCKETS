/*
try {

    

    // una jugadora que fallarà
    let wrongPlayer = new Player(1, "Sigrun", 04-04-2022);
    console.log(wrongPlayer);

} catch (error) {
    console.log("ERROR: " + error.message);
}

if(this.name.toUpperCase() == nombreRecibido.toUpperCase()){
throw new Error(this.name + " no és un nom vàlid")



/* afegir_punts(punts) {
    this.puntuacio = this.puntuacio + punts;
}

treure_punts(punts) {
    this.puntuacio = this.puntuacio - punts;
}
calcula_guanyador() {
    let guanyador = 0;
    let nom_guanyador = null;
    for (let index = 0; index < this.jugadors.length; index++) {
        if (this.jugadors[index].puntuacio > guanyador) {
            guanyador = this.jugadors[index].puntuacio;
            nom_guanyador = this.jugadors[index].nom;
        };
    }
    this.marcador.puntuacio = guanyador;
    this.marcador.guanyador = nom_guanyador;
}

if 

ANÒNIM

let Jugador = require('./Jugador.js');
let Joc = require('./Joc.js');
let Marcador = require('./Marcador.js');


let jugador1 = new Jugador("Pol", 0);
let jugador2 = new Jugador("Gunther", 0);
let jugador3 = new Jugador("Wotan", 0);
let jugador4 = new Jugador("Loge", 0);
let jugador5 = new Jugador("Siegfried", 0);

let marcador0 = Marcador.getInstance();

let joc1 = new Joc("Buscaminas", marcador0);

joc1.jugadors.push(jugador1);
joc1.jugadors.push(jugador2);
joc1.jugadors.push(jugador3);
joc1.jugadors.push(jugador4);
joc1.jugadors.push(jugador5);

jugador1.afegir_punts(20);

joc1.jugadors.forEach(jugador => {

console.log(`El jugador ${jugador.nom} té una puntuació de: ${jugador.puntuacio} punts.`);

});
joc1.calcula_guanyador();



console.log(arrayJugadores);

mostra les jugadores de més de dos metres (nom i alçada)
console.log("Mes de 2 m");

for (let index = 0; index < arrayJugadores.length; index++) {
if (arrayJugadores[index].h > 200) {
      console.log(arrayJugadores[index].nom, arrayJugadores[index].h);
 }
}

for (const jugadora of arrayJugadores) {
 if (jugadora.h > 200) {
      console.log(jugadora.nom, jugadora.h);


      
arrayPlayers = [
    new Player(1, "Sigrun", 04-04-2022),
   ];
  


/*
Tenemos un array numbers, en el cuál insertaremos números. Insertaremos la cantidad de números que figura en
 iterations. En cada iteración se insertará un number, que habrá sido generado con una simulación del 
 lanzamiento de un dado (un número aleatorio del 1 al 6). En el caso de obtener un 6, paramos y rompemos 
 el bucle 

 


*/


//TODO POST /players/{id}/games: un jugador específic realitza una tirada
//TODO DELETE /players/{id}/games: elimina les tirades del jugador
//TODO GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
//TODO GET /players/{id}/games: retorna el llistat de jugades per un jugador.
//TODO GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
//TODO GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
//TODO GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit