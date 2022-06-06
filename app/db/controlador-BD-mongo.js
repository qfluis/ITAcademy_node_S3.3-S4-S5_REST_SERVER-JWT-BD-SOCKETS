const ControladorBd = require('./controlador-BD');
const Jugador  = require('./mongo-models/Jugador');
const Jugada = require('./mongo-models/Jugada');

class ControladorBdMongo extends ControladorBd {

    async anadirJugador(jugadorNombre) {
        const jugador = {};

        if(jugadorNombre != null) jugador.nombre = jugadorNombre;

        let j;
        try {
            j = new Jugador(jugador);
            await j.save();
        } catch {
            console.log( error );
            return null;
        }
        console.log(j);
        return {id:j._id, nombre: j.nombre || "ANÓNIMO", fechaRegistro:j.createdAt }
        //return {id: j.id, nombre: j.nombre || "ANÓNIMO", fechaRegistro: j.createdAt };}










    }

    async existeJugador({id, nombre}){

    }

    async getJugador(id){

    }

    async getJugadorPorNombre(nombre) {

    }

    async getJugadas(idJugador) {

    }

    async modificarNombreJugador({id=null, nombre=null, nuevoNombre}){

    }

    async eliminarTiradasJugador(idJugador) {

    }

    async rankingJugadores() {

    }

    async rankingLoser(){

    }

    async rankingWinner(){

    }

    async obtenerRatioTotal(){

    }

    async jugar(){
        
    }
}

module.exports = ControladorBdMongo;