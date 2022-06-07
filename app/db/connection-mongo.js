const mongoose = require('mongoose');
require('dotenv').config();
const { MONGO_DB_CONNECTION } = process.env;

const dbConnection = async() => {
    // TODO: ACTUALMENTE CON ATLAS, CONFIGURAR EN LOCAL!!
    try {
        await mongoose.connect(MONGO_DB_CONNECTION);
        console.log('BD Mongo Inicializada');
    } catch (err) {
        console.log( err );
        throw new Error('Error al iniciar BD');
    }
}

module.exports = dbConnection;
