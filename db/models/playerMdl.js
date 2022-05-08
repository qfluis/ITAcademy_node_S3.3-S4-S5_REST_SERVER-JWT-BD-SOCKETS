
module.exports = (sequelize, type) => {
    return sequelize.define('player', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    namePlayer: type.VARCHAR,
    registerDate: type.DATE
})}