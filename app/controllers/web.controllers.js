const { response, request } = require('express');
const path = require('path');


// TODO: Revisar si es la mejor manera aparece el 404.html en la ruta...

const get404 = (req = request, res = response) => {
    res.redirect("/404");
}

module.exports = { get404 }