const Sequelize = require('sequelize');

const PlayerMdl = require('./models/playerMdl')

//const MatchesMdl = require('./db/models/matchesMdl')

const sequelize = new Sequelize('dice_game', 'root', 'root1111_', {

 host: 'localhost',
 port: 3306,
 dialect: 'mysql',
});

const Player1 = PlayerMdl(sequelize, Sequelize)

/*
sequelize.sync({ force: false })
.then(() => {
console.log('Synchronized tables');
})

sequelize.drop()
 .then(() => {
  console.log("deleted tables")
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


