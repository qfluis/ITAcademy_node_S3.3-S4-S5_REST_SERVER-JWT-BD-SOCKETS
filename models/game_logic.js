"use strict";

function dice_game() {
  let dice1 = Math.floor(6 * Math.random()) + 1;
  let dice2 = Math.floor(6 * Math.random()) + 1;
  let result = dice1 + dice2;
  if (result === 7) {
    console.log(`Congratulations!! You've won!! `);
  } else {
    console.log(`Sorry, you lost!! `);
  }

  return { dice1, dice2, score: dice1 + dice2, result };
}

/*

function editNames() {
    let player1 = "Player 1";
let player2 = "Player 2";
    player1 = prompt("Change Player1 name");
    player2 = prompt("Change player2 name");

}
*/
export {dice_game} 