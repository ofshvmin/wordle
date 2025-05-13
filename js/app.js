import words from "../data/words.js"
import library from "../data/library.js"

/*-------------------------------- Constants --------------------------------*/


const usedWords = []//array of words that have already been used
const validKeys = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'] 

const gameBoard = [
    {turn: 0, playerGuess: []},
    {turn: 1, playerGuess: []},
    {turn: 2, playerGuess: []},
    {turn: 3, playerGuess: []},
    {turn: 4, playerGuess: []},
    {turn: 5, playerGuess: []}
]

/*-------------------------------- Variables --------------------------------*/

let correctWord, turn, hasWon, hasLost

/*------------------------ Cached Element References ------------------------*/

const gameBoardTiles = document.querySelectorAll(".sqr")
const keyEls = document.querySelectorAll(".key")
const messageEl = document.getElementById("message")
const resetEl = document.getElementById("resetBtn")
const resetBtn = document.createElement('button')

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {key.addEventListener('click', handleClick)})
document.addEventListener("keydown", handleKeyStroke)
resetBtn.addEventListener("click", pressReset)

/*-------------------------------- Functions --------------------------------*/

function initializeGame() {
    if(correctWord) {
        usedWords.push(correctWord)
    }
    resetGameBoard()
    computerChoosesWord() 
    render()
}
initializeGame()
console.log('====================================');
console.log(correctWord);
console.log('====================================');

function activateKeyboard() {
    keyEls.forEach((key) => {
        key.addEventListener('click', handleClick)
    })
    document.addEventListener("keydown", handleKeyStroke)
}

function resetGameBoard() {
    gameBoard.forEach((obj) => {obj.playerGuess = []})    
    resetDisplay()
    correctWord = ""
    turn = 0
    hasWon = false
    hasLost = false
    messageEl.textContent = ""
    activateKeyboard()
}

function pressReset() {
    resetEl.removeChild(resetBtn)
    confetti.stop()
    initializeGame()
}

function computerChoosesWord() { //randomly select a word from library
    let selectedWord = null
    while(!selectedWord) {  //ensure randomly selected word has not been used yet
        let potentialWord = words[Math.floor(Math.random() * words.length)]
        if(usedWords.includes(potentialWord) === false) {
            selectedWord = potentialWord
        }
    }
    correctWord = selectedWord
}

function handleClick(evt) {
    let ltrGuess = evt.target.id
    handleInputs(ltrGuess)
    render()
}

function handleKeyStroke(event) {
    let ltrGuess = event.key.toLowerCase()
    if(validKeys.includes(ltrGuess)) {
            handleInputs(ltrGuess)
            render()
    } else {
    messageEl.textContent = "That's not a valid key"
    }
    render()
}

function handleInputs(ltrGuess) {
    if(ltrGuess != 'backspace' && ltrGuess != 'enter'){
        if(gameBoard[turn].playerGuess.length < 5) {
            gameBoard[turn].playerGuess.push(ltrGuess)
        } else {
            messageEl.textContent = "Guess can only be 5 letters long" // --------------update this to display wiggle animation as a day 2 feature 
        }   
    } 
    else if(ltrGuess === 'backspace') { 
        gameBoard[turn].playerGuess.pop()
    } else {
        submitGuess()
    }
}

function submitGuess() {
    if(gameBoard[turn].playerGuess.length < 5) {
        messageEl.textContent = "Guess must be 5 letters long"
    } else if(!library.includes(gameBoard[turn].playerGuess.join(''))) {
        messageEl.textContent = "This is not a real word"
    } else {
    evaluateGuess()
    checkForWin()
    incrementTurn()
    checkForLoss()
    }

}

function render() {
    if(gameBoard[turn].playerGuess){ 
    updateBoard(gameBoard[turn].playerGuess)
    }
}

function updateBoard(array) {
    for(let i = 0; i < 5; i++) {
        if(!array[i]) {
            gameBoardTiles[5 * turn + i].textContent = ""
        } else {
            gameBoardTiles[5 * turn + i].textContent = array[i]
        }
    }
}

function incrementTurn() {
    turn++
}

function evaluateGuess() {
    let correctWordArr = correctWord.split('') 
    gameBoard[turn].playerGuess.forEach((letter, index) => {
        let tileIdx = 5 * turn + index
        setTimeout(() => {
        if(letter === correctWordArr[index]) {
            showResultsTiles(tileIdx, 'green')
            updateKeyboard(letter, 'green')
        } else if(correctWordArr.includes(letter)) {
            showResultsTiles(tileIdx, 'yellow')
            updateKeyboard(letter, 'yellow')
        } else {
            showResultsTiles(tileIdx, 'black')
            updateKeyboard(letter, 'black')
        }
    }, 250 * index)
    })
}

function showResultsTiles(idx, color) {
    gameBoardTiles[idx].classList.add(color)
    gameBoardTiles[idx].classList.add('flip')
}

function checkForWin() {
    let playerWord = gameBoard[turn].playerGuess.join('')
    if(playerWord === correctWord) {
    messageEl.textContent = "You've won!  Congratulations!"
    confetti.start()
    hasWon = true
    keyEls.forEach((key) => {
        key.removeEventListener('click', handleClick)
    })
    document.removeEventListener("keydown", handleKeyStroke)
    createResetBtn()
    }
}

function checkForLoss() {
    if(turn > 5) {
        hasLost = true
        messageEl.textContent = `You didn't quite get it this time.  The correct word was ${correctWord}`
        keyEls.forEach((key) => {
        key.removeEventListener('click', handleClick)
    })
    document.removeEventListener("keydown", handleKeyStroke)
    createResetBtn()    
    }
    
}

function createResetBtn() {
    setTimeout(() => {
    resetBtn.innerHTML = "<button>Play again!</button>"
    resetBtn.setAttribute("class", "resetBtn")
    resetEl.append(resetBtn)
    }, 2000)
}

function resetDisplay() {
    gameBoardTiles.forEach((tile) => {
        tile.textContent = ""
    })
    gameBoardTiles.forEach((tile) => {
        tile.setAttribute("class", "sqr")
    })
    keyEls.forEach((key) => {
        key.setAttribute("class", "key")
    })
}

function updateKeyboard(letter, color) {
    let keyEl = document.getElementById(letter)
    if(keyEl.classList.toString().includes('green')) 
        return
    else {
        keyEl.classList.add(color)
    }
}


//add list of valid guess words
//-- library const already declared

//fix yellow highlighting (limit number of yellow cells highlighted to the number of times that character was actually guessed)

//bug found: 6th guess correct guess, failure message displays

////add words to spring words list

//style message to be more clearly visible

//animated cells to pop when letter is input