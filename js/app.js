import words from "../data/words.js"

/*-------------------------------- Constants --------------------------------*/

const library = [] //directory file with list of all 5-letter words in the english language
const usedWords = []//array of words that have already been used

const gameBoard = [
    {turn: 1, guess: ""},
    {turn: 2, guess: ""}
    
]

const keyboard = [
    { letter: "a", used: false, correctLetter: false, correctPlace: false },
    { letter: "b", used: false, correctLetter: false, correctPlace: false },
    { letter: "c", used: false, correctLetter: false, correctPlace: false },
]

/*-------------------------------- Variables --------------------------------*/
let playerGuess = [null, null, null, null, null]
let correctWord = ""
let turn = 1
let hasWon = false
let hasLost = false

let tempGuess = []

/*------------------------ Cached Element References ------------------------*/

const gameBoardTiles = document.querySelectorAll(".sqr")
// playAgainBtn
const keyEls = document.querySelectorAll(".key")

console.log(gameBoardTiles);

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach(function(key) {
    key.addEventListener('click', handleClick)
})


//letters on the user's physical keyboard will need an event listener
//play again button will need an event listener

/*-------------------------------- Functions --------------------------------*/


function initializeGame() {
    if(correctWord) {
        usedWords.push(correctWord)
    }
    resetGameBoard()
    computerChoosesWord() 
}

//         //if word not included in usedWords set correctWord = word
//     resetGameBoard()  //create a 5x6 board of blank squares, iterate through to set all values to null
//     resetKeyboard()
//     hasWon = false
//     lasLost = false
//     render()

// //render keyboard of 26 letters, and enter key, and a backspace key

// EvaluateGuess() //compares each letter to the letters in correctWord
//     //if letter is present && index of letter === index of the letter in correctWord
//     //if letter is present && index of letter !== index of the letter in correctWord
//     //if letter is not present 



// initializeGame()

function computerChoosesWord() { //randomly select a word from library
    let selectedWord = null
    // function selectWord() {
    //     slectedWord = words[Math.floor(Math.random() * words.length)]
    // } 
    while(!selectedWord) {
        let potentialWord = words[Math.floor(Math.random() * words.length)]
        if(usedWords.includes(potentialWord) === false) {
            selectedWord = potentialWord
        }
    }
    console.log(selectedWord);
}

function resetGameBoard() {
    playerGuess = [null, null, null, null, null]
    correctWord = ""
    turn = 1
    hasWon = false
    hasLost = false
}

function handleClick(evt) {
    let ltrGuess = evt.target.id
    console.log(ltrGuess);
    holdGuess(ltrGuess)
    render()
}

function holdGuess(ltrGuess) {
    if(ltrGuess != 'backspace' && ltrGuess != 'enter'){
        tempGuess.push(ltrGuess)
    } 
    else if(ltrGuess === 'backspace') { 
            tempGuess.pop()
    } else {
        submitGuess()
    }
    console.log(tempGuess)
}

function submitGuess() {
    console.log('this guess is final')
}

function render() {
    updateBoard()
}

function updateBoard() {
    tempGuess.forEach(function(letter) {
        let idx = tempGuess.indexOf(letter)
        console.log(idx)
        gameBoardTiles[idx].textContent = `${letter}`
    })
}


{/* <div class="sqr" id="l1-sq0"></div>
<div class="sqr" id="l1-sq1"></div>
<div class="sqr" id="l1-sq2"></div>
<div class="sqr" id="l1-sq3"></div>
<div class="sqr" id="l1-sq4"></div> */}

/*-------------------------------- PsuedoCode --------------------------------*/

//     Wordle

// - if correctWord is not null, add correctWord value to the array usedWords
// - a function will run to choose a 5 letter word at random from a dataset of words
// - if word is not present in the usedWords array populate the word in the correctWord variable

// user should be able to click on the onscreen keyboard or type using their physical keyboard

// the clicked or typed letter should populate the corresponding letter into the squares from left to right in the order they are selected
//     - continued typing once the first 5 boxes in the first row are full should visually display to the user they have selected an invalid input (shake the tile)
//     - the user should be able to delete their inputs using the backspace key or button  
//     - the user should be able to submit their response using the enter key or button

// once the user submits a guess the gameboard and keyboard should display whether or not the guess was correct
//     Gameboard:
//         correct letters in the correct tile should display in green
//         correct letters in the incorrect tile should display in yellow
//         incorrect letters should display in dark grey
//     keyboard:
//         keys with letters corresponding to a correct letter on the correct tile of the gameboard should update to green
//         keys with letters corresponding to a correct letter on the incorrect tile of the gameboard should update to yellow  
//         keys with letters corresponding to an incorrect letter should update to dark grey

// turn should increment up by 1
// check to see if the player has won
//     player has won if all letters in a single guess are present in the correct word and the sequence of letters matches
// check to see if the player has lost
//     player has lost if turn > 6 and they have not won
// if neither player won nor lost, a new turn should proceed with resonses proceeding on the next line of the grid

// Once player has won or lost a button will appear with text "play again"
//     if clicked, the gameboard and keyboard should reset
//     the correct word will be added to the array of usedWords 



