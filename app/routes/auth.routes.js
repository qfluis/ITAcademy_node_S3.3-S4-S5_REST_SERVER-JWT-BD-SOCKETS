const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { login, authNotFound, renewToken } = require('../controllers/auth.controller');

const router = Router();

// Login
router.post('/login',[
    check('email', 'Debes especificar un email válido').isEmail(),
    check('pass', 'Debes introducir un password de al menos 6 caracteres').isLength({min:6}),
    validarCampos
], login);

// Validar & revalidar token
router.post('/renew', validarJWT, renewToken);





// Not found
router.use(authNotFound);




module.exports = router;