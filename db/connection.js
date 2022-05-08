const Sequelize = require('sequelize');
const db = new Sequelize('dices', Pat12345678_)

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

(async () => {
  await sequelize.sync();
  const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
  console.log(jane.toJSON());
})();

DROP DATABASE IF EXISTS dices2;
CREATE DATABASE dices2;
USE dices2;
CREATE TABLE player (
  idPlayer INT AUTO_INCREMENT PRIMARY KEY,
  namePlayer VARCHAR(100) NOT NULL,
  registerDate DATE NOT NULL
);
CREATE TABLE matches (
  idMatches INT AUTO_INCREMENT PRIMARY KEY,
  dice1 INT NOT NULL,
   dice2 INT NOT NULL,
  idPlayer INT NOT NULL,
  FOREIGN KEY (idPlayer) REFERENCES player (idPlayer)
);