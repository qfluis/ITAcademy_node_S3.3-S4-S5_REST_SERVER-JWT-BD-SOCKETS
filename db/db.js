const Sequelize = require('sequelize');
const config = require('./config')

const PlayerMdl = require('./db/models/playerMdl')
const MatchesMdl = require('./db/models/matchesMdl')

const sequelize = new Sequelize(config.user, config.database, config.password, {

  host: config.host,
  port: config.port,
  dialect: config.dialect,

})

const Player1 = PlayerMdl(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
console.log('Synchronized tables');
})

const Match1 = MatchesMdl(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
console.log('Synchronized tables');
})

module.exports = {
  Player1, Match1
}


