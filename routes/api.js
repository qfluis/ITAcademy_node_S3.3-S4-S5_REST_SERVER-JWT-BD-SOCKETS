const router = require('express').Router()



const apiPlayersRouter = require('./api/playersApi')

// totes les rutes que vinguin amb /players li dic que ho enviï al gestor de rutes apiPlayersRouter
router.use('/players', apiPlayersRouter)


module.exports = router