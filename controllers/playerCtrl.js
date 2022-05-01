"use strict";

let Player = require("../models/player.js");


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
module.exports = playersPost;

