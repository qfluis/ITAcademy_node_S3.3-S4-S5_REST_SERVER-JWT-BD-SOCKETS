"use strict";

let Player = require("../models/player.js");

//TODO POST /players: crea un jugador

let playersPost = (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player0 = new Player();
      player0.name = req.body.name;

      //envia resposta
      res
        .status(200)
        .json({
          message:`${player0.name} created successfully!! Congratulations!!!` // Jugador creat
        }); 
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//TODO GET /players: mostra un jugador creat

let playersGet = (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({ message: "Bad request" });
    } else {
      let player0 = new Player();
      player0.name = req.body.name;
    res.status(200).json({message:`${player0.name}, register_date: new Date`});
  }
}
catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}
}


//TODO PUT /players: modifica el nom del jugador



// let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
module.exports = {
  playersPost,playersGet }
