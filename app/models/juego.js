const Jugador  = require('./jugador');
const Jugada = require('./Jugada');

class Juego {
    constructor(){
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

    async existeJugador({id, nombre}){
        
        console.log({id, nombre});
        const jugador = (id)
                            ?await Jugador.findOne({ where: { id }})
                            :await Jugador.findOne({ where: { nombre } });
        console.log(jugador!==null);
        return (jugador !== null);
    }    

    // TODO: revisar si es necesario el await o es redundante
    async getJugador(id) {
        return await Jugador.findOne({ where: { id }});
    }
    
    async getJugadorPorNombre(nombre) {
        return await Jugador.findOne({ where: { nombre }});
    }

    async getJugadas(idJugador) {
        return await jugada.findOne({ where: { idJugador }});
    }
    
    async modificarNombreJugador({id = null, nombre = null, nuevoNombre}) {
        let jugador;
        if (id !== null) {
            jugador = await this.getJugador(id);
        } else {
            jugador = await this.getJugadorPorNombre(nombre);
        }
        try {
            jugador.nombre = nuevoNombre;
            await jugador.save();  
            return jugador;

        } catch ( error ) {
            console.log(error);
            return
        }
    }
    async eliminarTiradasJugador(idJugador) {
        const jugador = await this.getJugador(idJugador);
        //const jugadas = await this.getJugadas(idJugador);

        jugador.juegos = 0;
        jugador.juegosGanados = 0;

        await Jugada.destroy({
            where: {
                idJugador
            }
        });

        jugador.save();
        //Jugada.save();

        return jugador;
    }
    // TODO: sequelize
    listaJugadores(){
        return this.jugadores;
    }

    async rankingJugadores(){
        return await Jugador.findAll({
            attributes: ['id', 'nombre', 'juegos', 'juegosGanados', 'ratio'],
            order: [['ratio', 'DESC'], ['juegos', 'DESC']]
        });

    }
    // TODO: Por aquí 🤣
    // TODO: sequelize
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

    async jugar(idJugador) {

        const dado1 = Math.round(Math.random()*5)+1;
        const dado2 = Math.round(Math.random()*5)+1;
        const resultado = dado1 + dado2;
        const exito = (resultado === this.PUNTOS_VICTORIA)?true:false;

 
        const jugador = await this.getJugador(idJugador);
        const jugada = new Jugada({
            idJugador,
            dado1,
            dado2,
            resultado,
            exito
        });
        jugador.juegos++;
        if (exito) jugador.juegosGanados++;
        jugador.ratio = jugador.juegosGanados / jugador.juegos;
        await jugador.save();
        await jugada.save();

        return jugada;
    }
}

const juego = new Juego();

module.exports = juego;