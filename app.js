

/*-------------------------------- Constants --------------------------------*/

const library //directory file with list of all 5-letter words in the english language
const usedWords //array of words that have already been used


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


/*------------------------ Cached Element References ------------------------*/

gameBoardTiles
onScreenKeyboard
playAgainBtn

/*----------------------------- Event Listeners -----------------------------*/

//each button on onscreen keyboard will need an event AudioListener
//letters on the user's physical keyboard will need an event listener
//play again button will need an event listener

/*-------------------------------- Functions --------------------------------*/

InitializeGame()
    computerChoosesWord() //randomly select a word from library
        //if word not included in usedWords set correctWord = word
    resetGameBoard()  //create a 5x6 board of blank squares, iterate through to set all values to null
    resetKeyboard()
    hasWon = false
    lasLost = false
    render()

//render keyboard of 26 letters, and enter key, and a backspace key

EvaluateGuess() //compares each letter to the letters in correctWord
    //if letter is present && index of letter === index of the letter in correctWord
    //if letter is present && index of letter !== index of the letter in correctWord
    //if letter is not present 