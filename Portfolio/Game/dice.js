const playerZeroElement = document.querySelector(".player--0")
const playerOneElement = document.querySelector(".player--1")

const scoreZeroElement = document.querySelector("#score--0")
const scoreOneElement = document.querySelector("#score--1")

const currentZeroElement = document.querySelector("#current--0")
const currentOneElement = document.querySelector("#current--1")

// select the buttons and dice element
const diceElement = document.querySelector(".dice")
const btnNew = document.querySelector(".btn--new")
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

let scores, currentScore, activePlayer, playing
function init() {
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true

    scoreZeroElement.textContent = 0;
    scoreOneElement.textContent = 0;

    currentZeroElement.textContent = 0;
    currentOneElement.textContent = 0;

    diceElement.classList.add("hidden")

    // Remove black background from winner 
    playerZeroElement.classList.remove("player--winner")
    playerOneElement.classList.remove("player--winner")

    // set player one background to active
    playerZeroElement.classList.add("player--active")
    playerOneElement.classList.remove("player--active")
}

function switchPlayer() {
    currentScore = 0
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore

    //  activePlayer = activePlayer === 0 ? 1 : 0;
    if (activePlayer === 0) {
        activePlayer = 1
    } else {
        activePlayer = 0
    }
    playerZeroElement.classList.toggle("player--active")
    playerOneElement.classList.toggle("player--active")

}

btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1.Generate a random dice roll
        const diceNum = Math.ceil(Math.random() * 6)
        // 2. Display dice
        diceElement.src = `./DiceGame/dice-${diceNum}.jpg`
        diceElement.classList.remove("hidden")

        // 3. check for rolled 1
        if (diceNum !== 1) {
            currentScore += diceNum
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore
        } else {
            // switch to the next player
            switchPlayer()
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer]

        if (scores[activePlayer] >= 50) {
            // finish game
            playing = false
            diceElement.classList.add("hidden")
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active")
        } else {
            switchPlayer()
        }
    }
})

btnNew.addEventListener("click", init)

// call the function
init()
