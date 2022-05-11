const Sequelize = require("sequelize");

const config_db = require("../config");
const sequelize = new Sequelize(
  config_db.database,
  config_db.user,
  config_db.password,{
    host: config_db.host,
    dialect: config_db.dialect
   }
);

const PlayerMdl = require("../models/playerMdl");

const Player1 = PlayerMdl(sequelize, Sequelize);

sequelize.sync({ force: false }).then(() => {
  console.log("Synchronized tables");
}).catch(error => {
  console.log('Has occurred an error', error);
});

sequelize.drop().then(() => {
  console.log("Deleted tables");
}).catch(error => {
  console.log('Has occurred an error', error);
});

module.exports = {
  Player1,
};
