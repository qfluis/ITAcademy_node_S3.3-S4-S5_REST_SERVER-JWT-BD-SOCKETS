const ControladorBd = require('./controlador-BD');
const Jugador  = require('./mongo-models/Jugador');
const Jugada = require('./mongo-models/Jugada');

class ControladorBdMongo extends ControladorBd {

    async anadirJugador(jugadorNombre) {
        const jugador = {};

        if(jugadorNombre !== null && jugadorNombre !== "" ) {
            jugador.nombre = jugadorNombre;
        } 

        let j;
        try {
            j = new Jugador(jugador);
            await j.save();
        } catch (error) {
            console.log( error );
            return null;
        }
        console.log(j);
        return {id:j._id, nombre: j.nombre || "ANÓNIMO", fechaRegistro:j.createdAt }
    }

    async existeJugador({id, nombre}){
       
        const jugador = (id)
                            ?await this.getJugador(id)
                            :await this.getJugadorPorNombre(nombre);
        console.log(jugador);
        return (jugador !== null);
    }

    async getJugador(id){
        //Comprueba si es un id válido MongoDB (string de 24 caracteres)
        if (id.length !== 24) return null;
        try {
            let resp = await Jugador.findById(id);
            return resp;
        } catch ( err ) {
            // si se busca un id no válido peta...
            return null;
        }
        
    }

    async getJugadorPorNombre(nombre) {
        return await Jugador.findOne({ nombre });
    }

    async getJugadas(idJugador) {
        return await Jugada.findAll({ idJugador });
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

        await Jugada.remove({idJugador});

        jugador.save();

        return jugador;
    }

    async rankingJugadores() {
        return Jugador.find({}, 
            {
                _id:1,
                nombre:1,
                juegos:1,
                juegosGanados:1,
                ratio: 1
            }
        ).sort({ratio:-1, juegos:-1});
    }

    async rankingLoser(){

        let resultado = await Jugador.find({}, 
            {
                _id:1,
                nombre:1,
                juegos:1,
                juegosGanados:1,
                ratio: 1
            }
        ).sort({ratio:1, juegos:1});

        // Filtrar empates
        console.log(resultado[0]);
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

        let resultado = await Jugador.find({}, 
            {
                _id:1,
                nombre:1,
                juegos:1,
                juegosGanados:1,
                ratio: 1
            }
        ).sort({ratio:-1, juegos:-1});

        // Filtrar empates
        console.log(resultado[0]);
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
        
        const jugadas = await Jugada.find({},{exito: 1});
        const totalJugadas = jugadas.length;
        let totalAciertos = 0;
        jugadas.map((valor) => (valor.exito)?totalAciertos+=1:totalAciertos+=0);

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

module.exports = ControladorBdMongo;