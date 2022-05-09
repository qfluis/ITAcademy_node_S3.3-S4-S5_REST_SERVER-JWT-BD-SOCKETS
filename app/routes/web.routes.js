const { Router } = require('express');
const { get404 } = require ('../controllers/web.controllers');

const router = Router();

// 404
//router.get('*', get404);
router.use(get404);

module.exports = router;