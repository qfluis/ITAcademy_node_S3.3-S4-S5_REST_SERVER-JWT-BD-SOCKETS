const Jugador  = require('./jugador');

class Juego {
    constructor(){
        this.jugadores = [];
        this.proximoId = 1;
        this.PUNTOS_VICTORIA = 7;        
    }

    async anadirJugador(jugadorNombre) {

        const jugador = {};

        if(jugadorNombre != null) jugador.nombre = jugadorNombre;

        let j;
        try {
            j = new Jugador(jugador);
            await j.save();
        } catch (error) {
            console.log( error )
            return null;
        }

        return { id: j.id, nombre: j.nombre || "ANÓNIMO", fechaRegistro: j.createdAt };
    }

    async existeJugador(nombre){

        const jugador = await Jugador.findOne({ where: { nombre } });
        return (jugador !== null);

    }

    async existeIdJugador(id){

        const jugador = await Jugador.findOne({ where: { id }});
        return (jugador !== null);
        /*
        const resultado = this.jugadores.map((j) => j.id).indexOf(id);
        return (resultado !== -1);
        */
    }

    getJugador(id) {
        const index = this.jugadores.map((j) => j.id).indexOf(id);
        return this.jugadores[index];
    }

    getJugadorPorNombre(nombre) {
        const index = this.jugadores.map((j) => j.nombre).indexOf(nombre);
        return this.jugadores[index];
    }

    modificarNombreJugador(nombre, nuevoNombre) {
        const jugador = this.getJugadorPorNombre(nombre);
        jugador.nombre = nuevoNombre;
        return jugador;
    }

    eliminarTiradasJugador(id) {
        const jugador = this.getJugador(id);
        jugador.tiradas = [];
        jugador.juegos = 0;
        jugador.juegosGanados = 0;
        return jugador;
    }

    listaJugadores(){
        return this.jugadores;
    }
    rankingJugadores(){
        return this.jugadores.map((j) => {
            return {
                id: j.id,
                nombre: j.nombre,
                ratioVictorias: (j.juegosGanados / j.juegos)  *100
            }
        }).sort((a,b) => b.ratioVictorias-a.ratioVictorias);
    }

    obtenerRatioTotal(){
        // TODO: probar con reduce...
        let totalJuegos = 0;
        let juegosGanados = 0;
        for (let jugador of this.jugadores) {
            totalJuegos += jugador.juegos;
            juegosGanados += jugador.juegosGanados;
        }
        const ratio = (juegosGanados / totalJuegos) * 100;
        return ratio;        
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