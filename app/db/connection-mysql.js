const { Sequelize } = require("sequelize");
require('dotenv').config();

const { MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASS, MYSQL_HOST, MYSQL_PORT } = process.env;
let db;

// Crear BD si no existe
//const connection = await mysql.createConnection({ MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASS });
//await connection.query(`CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB_NAME}\`;`);

// Crear Conexión
db = new Sequelize(MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASS, {
    host: MYSQL_HOST,
    port: MYSQL_PORT, // por defecto 3306 
    dialect: 'mysql', 
    logging: false    // comentar esta linea si necesitas detalle de las consultas
});

db.sync();

module.exports = db;

