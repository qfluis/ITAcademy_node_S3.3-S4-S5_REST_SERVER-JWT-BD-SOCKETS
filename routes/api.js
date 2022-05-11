const router = require('express').Router()


const apiPlayersRouter = require('./api/players')

// totes les rutes que vinguin amb /players li dic que ho enviï al gestor de rutes apiPlayersRouter
router.use('/players', apiPlayersRouter)



router.get('/players/ranking', playerController.ranking);

router.get('/players/ranking/loser', playerController.getLoser);

router.get('/players/ranking/winner', playerController.getWinner);

module.exports = router