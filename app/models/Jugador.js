console.log("holis");
const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Jugador = db.define('Jugador', {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    unique: true,
    //allowNull: true
  },
  fechaRegistro: {
    type: DataTypes.DATE
  },
  juegos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  juegosGanados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

db.sync();

module.exports = Jugador;