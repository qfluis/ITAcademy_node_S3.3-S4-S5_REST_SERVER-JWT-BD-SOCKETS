/*
import { Sequelize, Model, DataTypes } from 'sequelize';

// MODELS
const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
  username: DataTypes.STRING,
  birthday: DataTypes.DATE,
});



// PERSIST and Query
const jane = await User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20),
  });
  
  const users = await User.findAll();
  */