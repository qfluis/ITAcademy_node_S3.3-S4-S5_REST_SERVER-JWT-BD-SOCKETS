const config = {
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  host: process.env.host,
  dialect: 'mysql',
  port: process.env.PORT || 8888,
}

module.exports = config
