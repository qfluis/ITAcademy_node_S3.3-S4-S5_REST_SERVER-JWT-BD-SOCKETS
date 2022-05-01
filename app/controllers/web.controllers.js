const { response, request } = require('express');
const path = require('path');

const get404 = (req = request, res = response) => {
    res.redirect("/404");
}

module.exports = { get404 }