const { Router } = require('express');
const cors = require('cors');

const { check, header } = require('express-validator'); // https://express-validator.github.io/docs/check-api.html


const router = Router();

const { getUser, uploadFile, postTime, getPokemon } = require('../controllers/controllers');
const { validarCampos, authUser, validarImagen, noCacheControl } = require('../middlewares/middlewares');


// Nivel 1 Ejercicio 1 #####
router.get('/user', getUser);

// Nivel 1 Ejercicio 2 #####
router.post('/upload',[
    //check('files','Debe adjuntarse un archivo').not().isEmpty(),
    //validarCampos, // TODO:OOOJO
    validarImagen
], uploadFile );  // TODO: MIDDLEWARES

// Nivel 2 Ejercicio 1 + Nivel 3 Ejercicio 1 ######  // TODO: Añadir a middlewares

router.post('/time',[
    cors(),  // en la documentación aparece con los parentesis...
    noCacheControl,
    header('user', 'Usuario no proporcionado o no válido (mínimo 3 carácteres)').isLength({min:3}),
    header('pass', 'Password no proporcionado o no válido (mínimo 6 caracteres)').isLength({min:6}),   
    check('username', 'Debe indicarse un username').not().isEmpty(),
    validarCampos,                          
    authUser
], postTime);

// Nuevo nivel 3 pokeapi
router.get('/pokemon/:id', [
    check('id','Debes proporcionar un id válido').isInt(),
    validarCampos
], getPokemon);


// 404
router.use((req, res, next) => {
    res.status(404).json({
        status:"Error", 
        msg:"Ups! not found"
    });
    return;
});

module.exports = router;
