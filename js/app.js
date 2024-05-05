import words from "../data/words.js"
import library from "../data/library.js"

/*-------------------------------- Constants --------------------------------*/

// const library = [] //directory file with list of all 5-letter words
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

// function init() {
//     if(correctWord) {
//         usedWords.push(correctWord)
//     }

// }


function initializeGame() {
    //why do i ihave init AND reset as separate functions?
    if(correctWord) {
        usedWords.push(correctWord)
    }
    console.log(usedWords)
    resetGameBoard()
    computerChoosesWord() 
    console.log(correctWord)
    render()
}
initializeGame()

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

/* 
we have a correct word AND
gameBoard[turn].playerGuess -- an array with all the letters we need to compare
-- if we reduce gameBoard[turn].playerGuess to an object like "guess" = {
    --every--
    e: 2
    v: 1
    r: 1
    y: 1
}   
    we'll get a count of the instance of each letter guessed

    then we still

else if.... revealYellow(letter)
if you guess a letter included in the word but not in the right place, we need to know
-how many times you guess the letter AND

function revealYellow(letter) {
    *****FFFFFFF - forgot to consider is this letter already green? 
    -how many times that letter is in the word

    the tile you guessed should if yellow IF
    -the instance of the guessed letter is <= the total instances of that letter in the correct word
    ------ if we make this simply < (instance of guessed letter < total number of instances   )
} 
*/


function evaluateGuess() {
    let correctWordArr = correctWord.split('') //prob don't know this if we use string method charAt() / indexOf()
    console.log(correctWordArr);
    let countOfLetter = {}
    const CWinstance = correctWordArr.reduce((letterCount, letter) => {
        if(letterCount[letter]) {
          letterCount[letter]++
        } else {
          letterCount[letter] = 1
        }
      return letterCount
      }, {})
    
    gameBoard[turn].playerGuess.forEach((letter, index) => {
        let tileIdx = 5 * turn + index
        // setTimeout(() => {
        if(letter === correctWordArr[index]) {
            countOfLetter[letter] ? countOfLetter[letter] ++ : countOfLetter[letter] = 1
            console.log(countOfLetter);
            showResultsTiles(tileIdx, 'green')
            updateKeyboard(letter, 'green')
        } 
    })
      
    
// can i use .then() here???  will it cause the code to run async?  

    gameBoard[turn].playerGuess.forEach((letter, index) => {
        let tileIdx = 5 * turn + index

       if(correctWordArr.includes(letter) && letter != correctWordArr[index]) {
            countOfLetter[letter] ? countOfLetter[letter] ++ : countOfLetter[letter] = 1
            if( countOfLetter[letter] <= CWinstance[letter] ) { 
                showResultsTiles(tileIdx, 'yellow')
                updateKeyboard(letter, 'yellow')
            } else {
                showResultsTiles(tileIdx, 'black')
                updateKeyboard(letter, 'black')
            }

        } else {
            showResultsTiles(tileIdx, 'black')
            updateKeyboard(letter, 'black')
        }
    })

//     , 250 * index)
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
// -- need to update evaluateGuess function OR add a function for a check for valid word

//fix yellow highlighting (limit number of yellow cells highlighted to the number of times that character was actually guessed)
//-- update showResultsTiles funtion


//bug found: 6th guess correct guess, failure message displays

////add words to spring words list

//style message to be more clearly visible

//animated cells to pop when letter is input

//refactor init function and eliminate separate reset function for dryer code