//const Jugador  = require('../db/mysql-models/Jugador');
//const Jugada = require('../db/mysql-models/Jugada');
// TODO seleccionar entre mysql/mongo
require('dotenv').config();
const {BD} = process.env;
let controladorBD;
if (BD==='mysql') {
    ControladorBD = require('../db/controlador-BD-mysql');
} else {
    ControladorBD = require('../db/controlador-BD-mongo');
}


class Juego {
    constructor(){
        this.PUNTOS_VICTORIA = 7;    

        this.bd = new ControladorBD();    
    }

    async anadirJugador(jugadorNombre) {
        return await this.bd.anadirJugador(jugadorNombre);        
    }

    async existeJugador({id, nombre}){
        return await this.bd.existeJugador({id, nombre});
    }    

    async getJugador(id) {
        return await this.bd.getJugador(id);
    }
    
    async getJugadorPorNombre(nombre) {
        return await this.bd.getJugadorPorNombre(nombre);
    }

    async getJugadas(idJugador) {
        return await this.bd.getJugadas(idJugador);
    }
    
    async modificarNombreJugador({id = null, nombre = null, nuevoNombre}) {
        return await this.bd.modificarNombreJugador({id, nombre, nuevoNombre});
    }
    async eliminarTiradasJugador(idJugador) {
        return await this.bd.eliminarTiradasJugador(idJugador);
    }

    async rankingJugadores(){
        return this.cambiarNullPorAnonimo(await this.bd.rankingJugadores());
    }

    async rankingLoser(){
        return await this.bd.rankingLoser();
    }

    async rankingWinner(){
        return await this.bd.rankingWinner();
    }

    cambiarNullPorAnonimo(lista) {
        for(let el of lista) {
            if (el.nombre === null ) el.nombre = "ANONIMO";
        }
        return lista;
    }

    


    
    async obtenerRatioTotal(){
        return await this.bd.obtenerRatioTotal();
    }

    async jugar(idJugador) {

        const dado1 = Math.round(Math.random()*5)+1;
        const dado2 = Math.round(Math.random()*5)+1;
        const resultado = dado1 + dado2;
        const exito = (resultado === this.PUNTOS_VICTORIA)?true:false;

        return await this.bd.jugar(idJugador, dado1, dado2, resultado, exito);
    }
}

const juego = new Juego();

module.exports = juego;