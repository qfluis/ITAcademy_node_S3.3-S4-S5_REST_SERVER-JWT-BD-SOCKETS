const { Router } = require('express');
const { get404 } = require ('../controllers/web.controllers');

const router = Router();

// 404
// TODO: ¿Crear ruta /404 para que no se vea 404.html?
router.get('*', get404);

module.exports = router;