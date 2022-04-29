const express = require('express');
const cors = require('cors');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.playersPath = '/api/players';
        this.webPath = '/';

        // Middlewares
        this.middlewares();

        // rutas
        this.routes();
    }

    middlewares() {
        // CORS (por si el frontend está en otro servidor)
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público (no necesario para los puntos obligatorios de la práctica)
        
        const url = path.resolve(__dirname,'../','public');
        this.app.use(express.static(url));
    }

    routes() {
        this.app.use( this.playersPath, require('../routes/players.routes'));
        this.app.use( this.webPath, require('../routes/web.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor DADOS escuchando en puerto " + this.port);
        });
    }
}

module.exports = Server;