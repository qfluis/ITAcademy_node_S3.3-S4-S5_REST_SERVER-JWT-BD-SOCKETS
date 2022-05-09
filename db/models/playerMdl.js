
module.exports = (sequelize, type) => {
    return sequelize.define('player', {
        idPlayer: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    namePlayer: type.VARCHAR,
    registerDate: type.DATE
})}