const router = require('express').Router()

// totes les rutes que vinguin amb /players li dic que ho enviï al gestor de rutes apiPlayersRouter
const apiPlayersRouter = require('./api/players')

router.use('/players', apiPlayersRouter)

module.exports = router