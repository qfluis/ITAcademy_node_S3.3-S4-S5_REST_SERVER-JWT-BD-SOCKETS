const { response, request } = require('express');
const path = require('path');


// TODO: imágenes se rompen si el path tiene más de una "carpeta"
const get404 = (req = request, res = response) => {
    const url = path.resolve('./app/public/404.html');
    console.log("WEB", url);
    res.sendFile(url);
}

module.exports = { get404 }