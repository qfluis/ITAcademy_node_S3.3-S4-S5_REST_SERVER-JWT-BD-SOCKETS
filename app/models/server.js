
const express = require('express');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.path = '/';

        // Middlewares
        this.middlewares();

        // rutas
        this.routes();
    }

    middlewares(){
        // Lectura y parseo del body
        this.app.use( express.json() );

        // Subir ficheros
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes() {
        this.app.use( this.path, require('../routes/routes'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}

module.exports = Server;