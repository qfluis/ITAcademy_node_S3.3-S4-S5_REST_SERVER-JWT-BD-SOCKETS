const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Jugada = db.define('Jugada', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  idJugador:{
    type: DataTypes.INTEGER,
  },
  dado1: {
    type: DataTypes.INTEGER
  },
  dado2: {
    type: DataTypes.INTEGER
  },
  resultado: {
    type: DataTypes.INTEGER // Podría calcularse...
  },
  exito: { // podría calcularse también...
    type: DataTypes.BOOLEAN
  }
  
}, 
{
  tableName: 'jugadas'
});

//Jugada.sync();

//db.sync();

module.exports = Jugada;
