const router = require('express').Router()

router.get('/', (req, res) => {
res.json({message: "Enter correctly. Works"})
})

// totes les rutes que vinguin amb /players li dic que ho enviï al gestor de rutes apiPlayersRouter
const apiPlayersRouter = require('./api/players')



module.exports = router