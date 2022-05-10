"use strict";

class Player {

    constructor(name){
        this.id = null
        this.name = name
        this.register_date = new Date
    }



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

}     


module.exports = Player