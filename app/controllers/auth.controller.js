const { response, request } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async (req = request, res = response) => {

    const { email, pass } = req.body;
    const { API_LOGIN_EMAIL, API_LOGIN_PASS } = process.env;
 
    if (email !== API_LOGIN_EMAIL || pass !== API_LOGIN_PASS ) {
        res.status(400).json({
            msg: "email y/o contraseña incorrectos"
        });
        return;
    }

    // Generar JWT
    const token = await generarJWT( email );

    res.json({
        msg: "login correcto 👍",
        token
    });    
}

const authNotFound = (req, res) => {
    res.status(400).json({
        msg: req.path + " - Endpoint no válido"
    });
}

module.exports = { login, authNotFound }