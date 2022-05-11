const router = require('express').Router()

const apiPlayersRouter = require('./api/players')

// totes les rutes que vinguin amb /players li dic que ho enviï al gestor de rutes apiPlayersRouter

module.exports = router