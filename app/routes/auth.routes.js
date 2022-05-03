const { Router } = require('express');
const { login, authNotFound } = require('../controllers/auth.controller');
const router = Router();

// 404
router.post('/login', login);

// Not found
router.get('*', authNotFound)

module.exports = router;