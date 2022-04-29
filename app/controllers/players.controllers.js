const { response, request } = require('express');
const juego = require('../models/juego');

// TODO: revisar codigos respuesta 🙂

// POST /players: crea un jugador
const postPlayers = (req = request, res = response) => {
    const { nombre } = req.body;

    if(!nombre) {
        res.status(400).json({
            msg:"Nombre de usuario no especificado"
        });
        return;
    }

    // TODO: ¿controlar length de usuario?

    if (juego.existeJugador(nombre)) {
        res.status(400).json({
            msg:"usuario ya existente"
        });
        return
    }
    
    const jugador = juego.anadirJugador(nombre);

    // 🙂
    res.json({
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

// TODO: DELETE /players/{id}/games: elimina les tirades del jugador
const deletePlayersGames = (req, res) => {
    res.json({
        msg:"DELETE /players/{id}/games: elimina les tirades del jugador"
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

// TODO: GET /players/{id}/games: retorna el llistat de jugades per un jugador.
const getPlayersGames = (req, res) => {
    res.json({
            msg:"GET /players/{id}/games: retorna el llistat de jugades per un jugador."
        });
    }

// TODO: GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
const getRanking = (req, res) => {
    res.json({
            msg:"GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors"
        });
    }

// TODO: GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
const getRankingLoser = (req, res) => {
    res.json({
            msg:"GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit"
        });
    }

// TODO: GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
const getRankingWinner = (req, res) => {
    res.json({
            msg:"GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit"
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
    getRankingWinner 
}