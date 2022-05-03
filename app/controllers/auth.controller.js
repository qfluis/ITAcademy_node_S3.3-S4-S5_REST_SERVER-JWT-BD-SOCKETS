const { response, request } = require('express');

const login = (req = request, res = response) => {
    res.json({
        msg: "holiwi"
    });
}

const authNotFound = (req, res) => {
    res.status(400).json({
        msg: req.path + " - Endpoint no válido"
    });
}

module.exports = { login, authNotFound }