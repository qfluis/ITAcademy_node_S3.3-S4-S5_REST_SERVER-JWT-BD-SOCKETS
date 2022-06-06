const express = require('express');
require('dotenv').config();

const {BD} = process.env;
let db;
if (BD === 'mysql') {
    console.log(BD);
    db = require('../db/connection-mysql');
} else { // Mongo
    console.log(BD);
    db = require('../db/connection-mongo');
}


const cors = require('cors');
//const path = require('path');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.playersPath = '/api/players';
        //this.webPath = '/';
        this.authPath ='/api/auth';

        // BD
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // rutas
        this.routes();
    }

    async dbConnection() {
        if(BD === 'mysql'){
            try {            
                await db.authenticate();
                console.log("BD MYSQL Inicializada");
            } catch (error) {
                console.log( error );
                throw new Error( error );
            }
        } else {
            await db();
            console.log('BD Mongo inicializada');
        }       
    }

    middlewares() {
        // CORS (por si el frontend está en otro servidor)
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público (no necesario para los puntos obligatorios de la práctica)
        //const url = path.resolve(__dirname,'../','public');
        //this.app.use(express.static(url));
    }

    routes() {
        this.app.use( this.playersPath, require('../routes/players.routes'));
        this.app.use( this.authPath, require('../routes/auth.routes'));
        // Para cualquier endpoint no válido:
        this.app.use( (req, res) => {
            res.status(404).json({
                msg: req.path + " - Endpoint no válido"
            });
        });
        //this.app.use( this.webPath, require('../routes/web.routes'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor DADOS escuchando en puerto " + this.port);
        });
    }
}

module.exports = Server;
