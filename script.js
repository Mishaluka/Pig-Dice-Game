'use strict';

//
//Selecting elements 
//
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0"); //"#" we use for ID's from html  (like "." - for classes)
const score1El = document.getElementById("score--1"); // same colling an ID but it usfull when we have many of them
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting conditios
const init = function() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active"); // one player is active and if class is still there it will be removed anyway
    player1El.classList.remove("player--active");

};
init();



//Switch to next player
const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0; //
    activePlayer = activePlayer === 0 ? 1 : 0; // if active player 0 then we switch to 1, if active player 1 switch to 0
    currentScore = 0;
    player0El.classList.toggle("player--active"); //toggle method checing if class there and removing it, if not add it
    player1El.classList.toggle("player--active");
};


//Rolling dice functionality
btnRoll.addEventListener("click", function() {
    if (playing) {
        //1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display dice 
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`; // selecting all images and displaying one rundomly rolled one

        //3. Check for rolled 1: if true, switch to next player
        if (dice !== 1) {
            //Add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //calling function switchPlayer
            switchPlayer();

        }
    }
});

//
//Holding score button 
//

btnHold.addEventListener("click", function() {
    if (playing) {
        //1. Add current score to active player's score
        scores[activePlayer] += currentScore; // scores[1] = scores[1] + currentScore
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score >= 100 
        if (scores[activePlayer] >= 100) {
            //Finsh the game 
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

        } else {
            // Switch to the next player 
            switchPlayer();
        }
    }
})

//
// New game button 
//
btnNew.addEventListener("click", init);