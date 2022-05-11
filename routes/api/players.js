const router = require('express').Router()

router.get('/', (req, res) => {
res.status(200).json({message: "Enter correctly. Works"})
})

module.exports = router