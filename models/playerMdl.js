const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const playerMdl = sequelize(sequelize, type) => {
  return sequelize.define("player", {
    idPlayer: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    namePlayer: type.STRING,
    registerDate: type.DATE,
  });
};

console.log(__dirname + "fichero.js")
module.exports = {
  playerMdl
}