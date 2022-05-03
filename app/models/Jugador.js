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
    //allowNull: true  // por defecto
  },
  /*fechaRegistro: {     // Por defecto sequelize guarda createdAt
    type: DataTypes.DATE
  },*/
  juegos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  juegosGanados: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ratio: {
    type: DataTypes.DECIMAL(10,2),
    defaultValue: 0
  }
}, 
{
  tableName: 'jugadores'
});

db.sync();

module.exports = Jugador;