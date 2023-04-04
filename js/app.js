import words from "../data/words.js"

/*-------------------------------- Constants --------------------------------*/

const library = [] //directory file with list of all 5-letter words in the english language
const usedWords = []//array of words that have already been used
const validKeys = ['a', 'b', 'c', 'd', 'e','f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'enter', 'backspace'] //do i need to convert the inputs to lowercase to capture capslock on?  is shift invalid? 

const gameBoard = [
    {turn: 0, playerGuess: [null, null, null, null, null]},
    {turn: 1, playerGuess: [null, null, null, null, null]},
    {turn: 2, playerGuess: [null, null, null, null, null]},
    {turn: 3, playerGuess: [null, null, null, null, null]},
    {turn: 4, playerGuess: [null, null, null, null, null]},
    {turn: 5, playerGuess: [null, null, null, null, null]}
]

let tempGuess = [
    {turn: 0, letters: []},
    {turn: 1, letters: []},
    {turn: 2, letters: []},
    {turn: 3, letters: []},
    {turn: 4, letters: []},
    {turn: 5, letters: []}
]


const keyboard = [
    { letter: "a", used: false, correctLetter: false, correctPlace: false },
    { letter: "b", used: false, correctLetter: false, correctPlace: false },
    { letter: "c", used: false, correctLetter: false, correctPlace: false },
]

/*-------------------------------- Variables --------------------------------*/

let correctWord = ""
let turn = 0
let hasWon = false
let hasLost = false

/*------------------------ Cached Element References ------------------------*/

const gameBoardTiles = document.querySelectorAll(".sqr")
// playAgainBtn
const keyEls = document.querySelectorAll(".key")

const messageEl = document.getElementById("message")

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach(function(key) {
    key.addEventListener('click', handleClick)
})

document.addEventListener("keydown", handleKeyStroke)

function handleKeyStroke(event) {
        console.log(event.key);
    // handleGuess(ltrGuess)
    // render()
    if(validKeys.includes(event.key)) {
        console.log(event.key)
    } else {
        console.log('invalid key')
    }
}

//letters on the user's physical keyboard will need an event listener
//play again button will need an event listener

/*-------------------------------- Functions --------------------------------*/


function initializeGame() {
    if(correctWord) {
        usedWords.push(correctWord)
    }
    resetGameBoard()
    computerChoosesWord() 
    console.log(correctWord);
}

initializeGame()


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
    correctWord = selectedWord
}

function resetGameBoard() {
    gameBoard.playerGuess = [null, null, null, null, null]
    correctWord = ""
    turn = 0
    hasWon = false
    hasLost = false
}

function handleClick(evt) {
    let ltrGuess = evt.target.id
    // console.log(ltrGuess);
    handleInputs(ltrGuess)
    render()
}

function handleInputs(ltrGuess) {
    if(ltrGuess != 'backspace' && ltrGuess != 'enter'){
        if(tempGuess[turn].letters.length < 5) {
            tempGuess[turn].letters.push(ltrGuess)
            // console.log(tempGuess[turn].letters)
            // console.log(turn)
        } else {
            console.log('invalid - display wiggle animation') // -------------------------------------------------------------update this
        }
    } 
    else if(ltrGuess === 'backspace') { 
            tempGuess[turn].letters.pop()
            render()
            console.log(tempGuess[turn].letters)
    } else {
        submitGuess()
    }
    // console.log(tempGuess[turn].letters)
}

function submitGuess() {
    gameBoard[turn].turn = turn//update game board for current turn with current guess
    gameBoard[turn].playerGuess = tempGuess[turn].letters
    evaluateGuess()    //evaluate current guess against correct word
    checkForWin()
    incrementTurn()
}

function render() {
    updateBoard(tempGuess[turn].letters)
}



//-------------------------------------------------------------------------------------UPDATE BAORD FUNCTION -------------------------------------------------------------//

function updateBoard(array) {
    for(let i = 0; i < 5; i++) {
        if(!array[i]) {
            console.log('there is nothing in this place of the array!');
            gameBoardTiles[5 * turn + i].textContent = ""
        } else {
            console.log(array[i]);
            gameBoardTiles[5 * turn + i].textContent = array[i]
        }
    }
    console.log(turn);
console.dir(tempGuess);
console.log(tempGuess[turn].letters);
}

//-------------------------------------------------------------------------------------DEAD CODE------------ -------------------------------------------------------------//

let testColumn = 3 //this will equal the index of its position in the array
let testRow = 2 //this will equal turn
let testSqrID = `#l${testRow}-sq${testColumn}`

//-------------------------------------------------------------------------------------DEAD CODE------------ -------------------------------------------------------------//
//-------------------------------------------------------------------------------------UPDATE BAORD FUNCTION -------------------------------------------------------------//

function incrementTurn() {
    turn++
}

function evaluateGuess() {
    gameBoard[turn].playerGuess.forEach(function(letter, index){
        // console.log(letter, index);
    })
    let correctWordArr = correctWord.split('') 
    console.log(correctWordArr);

    gameBoard[turn].playerGuess.forEach(function(letter, index) {
        if(letter === correctWordArr[index]) {
            console.log(index, 'green')
            //showGreenTiles()
            showResultsTiles(index, 'green')
        } else if(correctWordArr.includes(letter)) {
            console.log(index, 'yellow');
            // showYellowTiles()
            showResultsTiles(index, 'yellow')
        } else {
            console.log(index, 'black');
            //showBlackTiles()
            showResultsTiles(index, 'black')
        }
    })

}

function showResultsTiles(idx, color) {
    gameBoardTiles[idx].classList.add(color)
    
    console.log(gameBoardTiles[2]);
    
    // const tileID = `l[${turn}]-sq[${idx}]`
    // const squareID = document.getElementById(`"l[${turn}]-sq[${idx}]"`)
}


function checkForWin() {
    let playerWord = gameBoard[turn].playerGuess.join('')
    if(playerWord === correctWord) {
    console.log(playerWord);
    console.log("You've won!")
    messageEl.textContent = "You've won!  Congratulations!"
    hasWon = true
    }

}


/*-------------------------------- PsuedoCode --------------------------------*/

//     Wordle



// user should be able to type using their physical keyboard

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



