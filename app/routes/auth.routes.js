const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { login, authNotFound } = require('../controllers/auth.controller');

const router = Router();

// Login
router.post('/login',[
    check('email', 'Debes especificar un email válido').isEmail(),
    check('pass', 'Debes introducir un password de al menos 6 caracteres').isLength({min:6}),
    validarCampos
], login);

// Not found
//router.get('*', authNotFound);
router.use(authNotFound);


/*
// 404
router.use((req, res, next) => {
    res.status(404).json({
        status:"Error", 
        msg:"Ups! not found"
    });
    return;
});
*/

module.exports = router;