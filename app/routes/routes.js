const { Router } = require('express');
const cors = require('cors');
const { check, header } = require('express-validator'); // https://express-validator.github.io/docs/check-api.html
const path = require('path');

const router = Router();

const { getUser, uploadFile, postTime } = require('../controllers/controllers');
const { validarCampos, authUser } = require('../middlewares/middlewares');


// Nivel 1 Ejercicio 1 ##################################################################
router.get('/user', getUser);

// Nivel 1 Ejercicio 2 ##################################################################
router.post('/upload', uploadFile );  // TODO: MIDDLEWARES

// Nivel 2 Ejercicio 1 + Nivel 3 Ejercicio 1 ############################################
router.use('/time', (req, res, next) => {
    //res.set('Cache-control', 'public, max-age=0');
    res.set('Cache-control', 'no-cache'); 
    next();
});

router.post('/time',[
    cors(),  // en la documentación aparece con los parentesis...
    header('user', 'Usuario no proporcionado o no válido (mínimo 3 carácteres)').isLength({min:3}),
    header('pass', 'Password no proporcionado o no válido (mínimo 6 caracteres)').isLength({min:6}),   
    validarCampos,                          
    authUser
], postTime)


// 404
router.use((req, res, next) => {
    respuestaEstandar(res, 404, "Error", "Ups! not found");
});








module.exports = router;