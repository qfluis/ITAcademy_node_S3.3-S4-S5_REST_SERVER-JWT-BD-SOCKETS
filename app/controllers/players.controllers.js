const { response, request } = require('express');
const path = require('path');
const juego = require('../models/juego');

// TODO: revisar codigos respuesta 🙂
// TODO: Hacer middlewares para validación de campos con express-validator...


// POST /players: crea un jugador
const postPlayers = async (req = request, res = response) => {
    let { nombre } = req.body;
    
    if(!nombre || nombre === "" ) {
        // usuario anónimo
        nombre = null;
    } else {
        if (await juego.existeJugador(nombre)) {
            res.status(400).json({
                msg:"usuario ya existente"
            });
            return;
        }
    }    
    
    const jugador = await juego.anadirJugador(nombre);
    if (jugador === null) {        
        res.status(500).json({
            msg:"Error en la BD, ponte en contacto con el admin"
        })
        return;
    }
    // 🙂
    res.status(200).json({
        msg:"Usuario creado con éxito",
        jugador
    });
    
}

// PUT /players: modifica el nom del jugador
const putPlayers = (req =request, res) => {
    const { nombre, nuevoNombre } = req.body

    if (!nombre || !nuevoNombre || nombre === "" || nuevoNombre === "") {
        res.status(400).json({
            msg:"Faltan nombre y/o nuevoNombre"
        })
        return;
    }

    if (!juego.existeJugador(nombre)) {
        res.status(400).json({
            msg:"usuario no existe"
        });
        return;
    }

    const jugadorModificado = juego.modificarNombreJugador(nombre,nuevoNombre);

    res.json({
        msg:"Nombre de jugador modificado",
        jugadorModificado
    });
}

// POST /players/{id}/games: un jugador específic realitza una tirada
const postPlayersGames = (req = request, res) => {
    let { id } = req.params;
    id = parseInt(id);
   
    if(!juego.existeIdJugador(id)){
        res.status(400).json({
            msg:"id de jugador no válido"
        });
        return;
    }

    const jugada = juego.jugar(id);


    res.json({
        msg:"POST /players/{id}/games: un jugador específic realitza una tirada",
        jugada
    });
}

// DELETE /players/{id}/games: elimina les tirades del jugador
const deletePlayersGames = (req, res) => {

    let { id } = req.params;
    id = parseInt(id);
   
    if(!juego.existeIdJugador(id)){
        res.status(400).json({
            msg:"id de jugador no válido"
        });
        return;
    }

    const jugador = juego.eliminarTiradasJugador(id);

    res.json({
        msg:"Eliminadas las tiradas del jugador",
        jugador
    });
}

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
const getPlayers = (req, res) => {
    
const jugadores = juego.rankingJugadores();

    res.json({
            msg:"Listado obtenido Holiwi",
            jugadores
        });
    }

// GET /players/{id}/games: retorna el llistat de jugades per un jugador.
const getPlayersGames = (req = request, res) => {

    let { id } = req.params;
    if(!id) {
        res.status(400).json({
            msg: "Id de usuario no indicado"
        });
        return;
    }
    
    id = parseInt(id)

    if(!juego.existeIdJugador(id)) {
        res.status(400).json({
            msg: "Id de usuario no válido"
        });
        return;
    }

    jugador = juego.getJugador(id);

    res.json({
            msg:"Listado obtenido correctamente",
            jugadas: jugador.tiradas
        });
    }

// GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
const getRanking = (req, res) => {
    
    const ratioAciertos = juego.obtenerRatioTotal();
    
    res.json({
            msg:"Promedio aciertos jugadores obtenido correctamente",
            ratioAciertos
        });
    }

// GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
const getRankingLoser = (req, res) => {

    const jugadores = juego.rankingJugadores();
    const loser = jugadores[jugadores.length-1];

    res.json({
        msg:"Loser obtenido correctamente",
        loser
    });
}

// GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
const getRankingWinner = (req, res) => {

    const jugadores = juego.rankingJugadores();
    const winner = jugadores[0];

    res.json({
        msg:"Winner obtenido correctamente",
        winner
    });
}





// Endpoint no válido
const playersNotFound = (req = request, res = response) => {
    res.status(400).json({
        msg: req.path + " - Endpoint no válido"
    });
}    

module.exports = {
    postPlayers, 
    putPlayers, 
    postPlayersGames, 
    deletePlayersGames, 
    getPlayers, 
    getPlayersGames, 
    getRanking, 
    getRankingLoser, 
    getRankingWinner,
    playersNotFound 
}