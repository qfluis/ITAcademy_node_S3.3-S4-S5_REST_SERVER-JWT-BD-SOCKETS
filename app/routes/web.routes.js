const { Router } = require('express');
const { getWeb } = require ('../controllers/web.controllers');

const router = Router();

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
router.get('/', getWeb);

module.exports = router;