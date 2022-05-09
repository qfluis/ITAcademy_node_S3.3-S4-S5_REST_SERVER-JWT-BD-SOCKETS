const express = require("express");
const app = express()
require('./db')
const config = require('./config')
const bodyParser = require('body-parser');
//require ( 'dotenv' ).config()
const playersPost = require('./controllers/playerCtrl')
const playersGet = require('./controllers/playerCtrl')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/players', playersPost);
app.get('/players', playersGet);


app.listen(config.port, () => {
    console.log(`API REST en http://localhost:${config.port}/`);
  });


