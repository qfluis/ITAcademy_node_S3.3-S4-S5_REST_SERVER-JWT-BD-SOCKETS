const express = require('express');
const db = require('../db/connection');
const cors = require('cors');
const path = require('path');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.playersPath = '/api/players';
        this.webPath = '/';
        this.authPath ='/api/auth';

        // BD
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // rutas
        this.routes();
    }

    async dbConnection() {
        try {            
            await db.authenticate();
            console.log("BD Inicializada");
        } catch (error) {
            console.log( error );
            throw new Error( error );
        }
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
        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.webPath, require('../routes/web.routes'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor DADOS escuchando en puerto " + this.port);
        });
    }
}

module.exports = Server;