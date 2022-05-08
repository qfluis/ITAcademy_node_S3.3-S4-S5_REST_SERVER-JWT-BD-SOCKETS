const Sequelize = require('sequelize');
const config = require('./config')

const PlayerMdl = require('./db/models/playerMdl')

const sequelize = new Sequelize(config.user, config.database, config.password, {

  host: config.host,
  port: config.port,
  dialect: config.dialect,

})

const Player1 = PlayerMdl(sequelize, Sequelize)



