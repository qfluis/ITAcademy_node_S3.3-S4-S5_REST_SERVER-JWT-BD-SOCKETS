const ControladorBd = require('./controlador-BD');
const Jugador  = require('./mysql-models/Jugador');
const Jugada = require('./mysql-models/Jugada');

class ControladorBdMysql extends ControladorBd {
    
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
        const jugador = (id)
                            ?await Jugador.findOne({ where: { id }})
                            :await Jugador.findOne({ where: { nombre } });
        return (jugador !== null);
    }

    async getJugador(id){
        return await Jugador.findOne({ where: { id }});
    }

    async getJugadorPorNombre(nombre) {
        return await Jugador.findOne({ where: { nombre }});
    }

    async getJugadas(idJugador) {
        return await Jugada.findAll({ where: { idJugador }});
    }

    async modificarNombreJugador({id=null, nombre=null, nuevoNombre}){
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

        jugador.juegos = 0;
        jugador.juegosGanados = 0;
        jugador.ratio = 0;

        await Jugada.destroy({
            where: {
                idJugador
            }
        });

        jugador.save();

        return jugador;
    }

    async rankingJugadores() {
        return await Jugador.findAll({
            attributes: ['id', 'nombre', 'juegos', 'juegosGanados', 'ratio'],
            order: [['ratio', 'DESC'], ['juegos', 'DESC']]
        });
    }

    async rankingLoser(){
        let resultado = await Jugador.findAll({
            attributes: ['id', 'nombre', 'juegos', 'juegosGanados', 'ratio'],
            order: [['ratio', 'ASC'], ['juegos', 'ASC']]
        });
        // Filtrar empates
        const {ratio, juegos} = resultado[0];
        resultado = resultado.filter((j) => j.ratio === ratio);
        resultado = resultado.filter((j) => j.juegos === juegos);

        // Cambiar null X anónimo
        for(let j of resultado) {
            if (j && j.nombre === null) j.nombre = "ANONIMO";
        }        

        return resultado;
    }

    async rankingWinner(){
        let resultado = await Jugador.findAll({
            attributes: ['id', 'nombre', 'juegos', 'juegosGanados', 'ratio'],
            order: [['ratio', 'DESC'], ['juegos', 'DESC']]
        });
        // Filtrar empates
        const {ratio, juegos} = resultado[0];
        resultado = resultado.filter((j) => j.ratio === ratio);
        resultado = resultado.filter((j) => j.juegos === juegos);

        // Cambiar null X anónimo
        for(let j of resultado) {
            if (j && j.nombre === null) j.nombre = "ANONIMO";
        }        

        return resultado;
    }

    async obtenerRatioTotal(){
        const jugadas = await Jugada.findAll({
            attributes:['exito']
        });
        const totalJugadas = jugadas.length;
        let totalAciertos = 0;
        jugadas.map((valor) => (valor.exito)?totalAciertos+=1:totalAciertos+=0 );
     
        return totalAciertos / totalJugadas;
    }

    async jugar(idJugador, dado1, dado2, resultado, exito){
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

module.exports = ControladorBdMysql;