/*
Buen trabajo, Luis! Algunas cosas a mejorar:

OK - La URL que devuelves en el /user deberia tener también el http:// y eso, así se puede usar directamente

TODO: revisar con Omar, en principio está ok...
El /upload falla porque tienes un error tonta en la gestión de las fechas. 
Tambien estás eliminando el nombre original de la imagen, ojo con eso. 
Además, tal como lo tienes solo se puede subir una imagen por minuto o se sobreescriben 
(lo habitual es poner la fecha en milisegundos antes del nombre de la imagen y ya) ⚠

TODO: si no subes fichero o subes otra extensión da respuesta...
Al fallar el /upload el server devuelve un HTML de error. Hay que contemplar ese error ❗
TODO: meter usuario y contraseña en .env
La autorización está rara. No compruebas el usuario y contraseña, solo que no esten en blanco. 
También falla si no hay body (HTML de error again). ¿Cuál de las dos cosas es la autorización? Habría que dejar solo una de las dos y hacer que compruebe algo

TODO: refactorizando
Habría que separar rutas, middlewares, controllers y demás, tener todo eso en el app.js es una mala práctica de las gordas! ❌
Dale un repaso a esas cosas para la máxima nota 😉

*/
const Server = require('./models/server');
require('dotenv').config();

const server = new Server();
server.listen();




/* TODO: ELIMINAR

const express = require('express');
const app = express();
const bodyParser = require('body-parser');  // para leer body petición POST
const fileUpload = require('express-fileupload'); // otra opción multer: https://www.npmjs.com/package/multer 
const cors = require('cors');
const path = require('path');

app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const PORT = 5555;

*/










    


