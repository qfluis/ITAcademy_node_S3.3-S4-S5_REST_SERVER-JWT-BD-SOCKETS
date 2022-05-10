const Sequelize = require('sequelize');

const config = require('./config')

const PlayerMdl = require('./db/models/playerMdl')

//const MatchesMdl = require('./db/models/matchesMdl')

const sequelize = new Sequelize(config.database, config.user, config.password, {

 host: config.host,
 port: config.port,
 dialect: config.dialect,
});

const Player1 = PlayerMdl(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
console.log('Synchronized tables');
})

/*const Match1 = MatchesMdl(sequelize, Sequelize)

sequelize.sync({ force: false })
.then(() => {
console.log('Synchronized tables');
})


try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
*/
module.exports = {
  Player1
}


