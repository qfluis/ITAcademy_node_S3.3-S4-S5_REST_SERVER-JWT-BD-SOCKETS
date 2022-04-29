const { response, request } = require('express');
const path = require('path');

const getWeb = (req = request, res = response) => {
    const url = path.resolve('./app/public/');
    console.log(url);
    res.sendFile(url);
}


module.exports = { getWeb }