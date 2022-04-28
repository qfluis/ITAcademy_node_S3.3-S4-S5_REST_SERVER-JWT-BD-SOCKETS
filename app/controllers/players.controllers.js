const { response, request } = require('express');

// POST /players: crea un jugador
const postPlayers = (req, res = response) => {
    res.json({
        msg:"POST /players: crea un jugador"
    });
}

// PUT /players: modifica el nom del jugador
const putPlayers = (req, res) => {
    res.json({
        msg:"PUT /players: modifica el nom del jugador"
    });
}

// POST /players/{id}/games: un jugador específic realitza una tirada
const postPlayersGames = (req, res) => {
    res.json({
        msg:"POST /players/{id}/games: un jugador específic realitza una tirada"
    });
}

// DELETE /players/{id}/games: elimina les tirades del jugador
const deletePlayersGames = (req, res) => {
    res.json({
        msg:"DELETE /players/{id}/games: elimina les tirades del jugador"
    });
}

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
const getPlayers = (req, res) => {
    res.json({
            msg:"GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits"
        });
    }

// GET /players/{id}/games: retorna el llistat de jugades per un jugador.
const getPlayersGames = (req, res) => {
    res.json({
            msg:"GET /players/{id}/games: retorna el llistat de jugades per un jugador."
        });
    }

// GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
const getRanking = (req, res) => {
    res.json({
            msg:"GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors"
        });
    }

// GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
const getRankingLoser = (req, res) => {
    res.json({
            msg:"GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit"
        });
    }

// GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
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