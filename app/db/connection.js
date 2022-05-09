const { Sequelize } = require("sequelize");
require('dotenv').config();

const { MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_PORT } = process.env;

const db = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    port: MYSQL_PORT,        // por defecto 3306 
    dialect: 'mysql', 
    //logging: false   // fines educativos
});

db.sync();

module.exports = db;

