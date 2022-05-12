const Sequelize = require("sequelize");

const config_db = require("./config");

const PlayerMdl = require("./models/playerMdl");
const GameMdl = require("./models/gameMdl");


const sequelize = new Sequelize(
  config_db.database,
  config_db.user,
  config_db.password,
  {
    host: config_db.host,
    dialect: config_db.dialect,
  }
);

/*
const Player1 = PlayerMdl(sequelize, Sequelize);
const Game1 = GameMdl(sequelize, Sequelize);
*/

sequelize
  .sync()//.sync({ force: false })
  .then(() => {
    console.log("Synchronized tables");
  })
  .catch((error) => {
    console.log("Has occurred an error", error);
  });

  /*
sequelize
  .drop()
  .then(() => {
    console.log("Deleted tables");
  })
  .catch((error) => {
    console.log("Has occurred an error", error);
  });
  */
  console.log("holiwi");
module.exports = {
  //Player1, Game1
  sequelize
};
