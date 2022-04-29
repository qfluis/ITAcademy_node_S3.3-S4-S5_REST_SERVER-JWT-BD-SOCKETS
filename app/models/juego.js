class Juego {
    constructor(){
        this.jugadores = [];
        this.proximoId = 1;
        this.PUNTOS_VICTORIA = 7;        
    }

    anadirJugador(jugadorNombre) {
        const fecha = new Date();
        const jugador = {
            nombre: jugadorNombre,
            id: this.proximoId++,
            fechaRegistro: fecha,
            juegos: 0,
            juegosGanados: 0,
            tiradas: []
            
        }
        this.jugadores.push(jugador);
        return jugador;
    }

    existeJugador(nombre){
        const resultado = this.jugadores.map((j) => j.nombre).indexOf(nombre);
        return (resultado !== -1);
    }
    getJugador(id) {
        const index = this.jugadores.map((j) => j.id).indexOf(id);
        return this.jugadores[index];
    }
    listaJugadores(){
        return this.jugadores;
    }
    rankingJugadores(){
        return this.jugadores.map((j) => {
            return {
                nombre: j.nombre,
                ratioVictorias: (j.juegosGanados / j.juegos)  *100
            }
        }).sort((a,b) => b.ratioVictorias-a.ratioVictorias);
    }

    jugar(id) {
        const dado1 = Math.round(Math.random()*5)+1;
        const dado2 = Math.round(Math.random()*5)+1;
        const resultado = dado1 + dado2;
        const exito = (resultado === this.PUNTOS_VICTORIA)?true:false;

        const tirada = {
            dado1,
            dado2,
            resultado,
            exito
        }

        const jugador = this.getJugador(id);
        jugador.tiradas.push(tirada);
        jugador.juegos++;
        if (exito) jugador.juegosGanados++;


        return tirada;
    }
}

const juego = new Juego();

module.exports = juego;