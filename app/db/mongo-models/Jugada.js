const { Schema, model } = require('mongoose');

const jugadaSchema = Schema({
    
    idJugador: {
        type: String      
    },
    dado1: {
        type: Number
    },
    dado2: {
        type: Number
    },
    resultado: {
        type: Number
    },
    exito: {
        type: Boolean
    }    
});

module.exports = model('Jugada', jugadaSchema);