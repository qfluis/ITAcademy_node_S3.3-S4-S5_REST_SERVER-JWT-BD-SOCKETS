const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { postPlayers, 
        putPlayers, 
        postPlayersGames, 
        deletePlayersGames, 
        getPlayers, 
        getPlayersGames, 
        getRanking, 
        getRankingLoser, 
        getRankingWinner,
        playersNotFound } = require ('../controllers/players.controllers');

const router = Router();

// valida JWT en todas las rutas de api/players
router.use(validarJWT);

// POST /players: crea un jugador
router.post('/', postPlayers);

// PUT /players: modifica el nom del jugador
router.put('/', [
    check('nuevoNombre', 'Debes introducir el nuevo nombre').isLength({min: 1}),
    validarCampos
], putPlayers);

// POST /players/{id}/games: un jugador específic realitza una tirada
router.post('/:id/games',[
    check('id', 'debes facilitar un id de jugador válido').isNumeric().toInt(),
    validarCampos
], postPlayersGames);

// DELETE /players/{id}/games: elimina les tirades del jugador
router.delete('/:id/games', [
    check('id', 'debes facilitar un id de jugador válido').isNumeric().toInt(),
    validarCampos
], deletePlayersGames);

// GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
router.get('/', getPlayers);

// GET /players/{id}/games: retorna el llistat de jugades per un jugador.
router.get('/:id/games', [
    check('id', 'debes facilitar un id de jugador válido').isNumeric().toInt(),
    validarCampos
] , getPlayersGames);

// GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
router.get('/ranking', getRanking);

// GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit
router.get('/ranking/loser', getRankingLoser);

//GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
router.get('/ranking/winner', getRankingWinner);

// Not found
router.use(playersNotFound);

module.exports = router;