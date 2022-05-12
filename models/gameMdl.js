module.exports = (sequelize, type) => {
    return sequelize.define('games', {
        idGames: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        dice1: type.INTEGER,
        dice2: type.INTEGER,
       // idPlayer: type.INTEGER,  
       })}