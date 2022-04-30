const express = require("express");
const app = require(express)
const config = require('./config')
require ( 'dotenv' ).config()


/*
Tenemos un array numbers, en el cuál insertaremos números. Insertaremos la cantidad de números que figura en
 iterations. En cada iteración se insertará un number, que habrá sido generado con una simulación del 
 lanzamiento de un dado (un número aleatorio del 1 al 6). En el caso de obtener un 6, paramos y rompemos 
 el bucle */

 const iterations = 10;
 let numbers = [];
 
 for (let i = 0; i < iterations; i++) {
   const number = 1 + Math.floor(Math.random() * 6);
   numbers.push(number);
   if (number === 6) {
     console.log("ERROR");
     break;
   }
 }
 
 console.log(numbers);


app.listen(config.port, () => {
    console.log(`API REST en http://localhost:${config.port}/`);
  });


