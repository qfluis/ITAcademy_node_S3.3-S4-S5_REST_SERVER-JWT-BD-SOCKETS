const { response, request } = require('express');
const path = require('path');


// TODO: Revisar si es la mejor manera aparece el 404.html en la ruta...
const get404 = (req = request, res = response) => {
    /*
    const url = path.resolve('./app/public/404.html');
    console.log("WEB", url);
    res.sendFile(url);*/
    res.redirect("/404.html");
}

module.exports = { get404 }