const { Schema, model } = require('mongoose');

const jugadorSchema = Schema({
    
    nombre: {
        type: String,
        default: null    
    },
    juegos: {
        type: Number,
        default: 0
        
    },
    juegosGanados: {
        type: Number,
        default: 0
    },
    ratio: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date, 
        required: true, 
        default: Date.now
    }
});

module.exports = model('Jugador', jugadorSchema);