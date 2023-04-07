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

const resetEl = document.getElementById("resetBtn")

const resetBtn = document.createElement('button')

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach(function(key) {
    key.addEventListener('click', handleClick)
})

document.addEventListener("keydown", handleKeyStroke)

resetBtn.addEventListener("click", pressReset)

//letters on the user's physical keyboard will need an event listener
//play again button will need an event listener

/*-------------------------------- Functions --------------------------------*/


function activateKeyboard() {
    keyEls.forEach(function(key) {
        key.addEventListener('click', handleClick)
    })
    document.addEventListener("keydown", handleKeyStroke)
}


function initializeGame() {
    if(correctWord) {
        usedWords.push(correctWord)
    }
    resetGameBoard()
    computerChoosesWord() 
    console.log(correctWord);
    render()
}
initializeGame()

function resetGameBoard() {
    gameBoard.forEach((obj) => {obj.playerGuess = [null, null, null, null, null]})    
    resetDisplay()
    console.dir(gameBoard);
    correctWord = ""
    turn = 0
    hasWon = false
    hasLost = false
    messageEl.textContent = ""
    activateKeyboard()
}

function pressReset() {
    resetEl.removeChild(resetBtn)
    initializeGame()
}


// function createResetBtn() {
//     const resetBtn = document.createElement('button')
//     resetBtn.innerHTML = "<button>Play again!</button>"
//     resetBtn.setAttribute("class", "resetBtn")
//     resetEl.append(resetBtn)
// }


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
            console.log('invalid key')
        }
        render()
    }
    
    
    
    function handleInputs(ltrGuess) {
        if(ltrGuess != 'backspace' && ltrGuess != 'enter'){
            if(tempGuess[turn].letters.length < 5) {
                tempGuess[turn].letters.push(ltrGuess)

            } else {
                messageEl.textContent = "Guess can only be 5 letters long" 
                console.log('invalid - display wiggle animation') // -------------------------------------------------------------update this
            }   
        } 
        else if(ltrGuess === 'backspace') { 
                tempGuess[turn].letters.pop()
        } else {
            submitGuess()
        }
}

function submitGuess() {
    // gameBoard[turn].turn = turn//update game board for current turn with current guess
    
    if(tempGuess[turn].letters.length < 5) {
        messageEl.textContent = "Guess must be 5 letters long"
        console.log(tempGuess[turn].letters.length)
    } else {
    gameBoard[turn].playerGuess = tempGuess[turn].letters
    evaluateGuess()    //evaluate current guess against correct word
    checkForWin()
    incrementTurn()
    checkForLoss()
    }
}

function render() {
    //show all prior guesses from the gameBoard
    //show inputs in realtime
    // if(gameBoard[turn].playerGuess) {
    //     updateBoard(gameBoard[turn])
    // }


    if(tempGuess[turn]){ 
    updateBoard(tempGuess[turn].letters)
    }

}


//-------------------------------------------------------------------------------------UPDATE BAORD FUNCTION -------------------------------------------------------------//

function updateBoard(array) {
    for(let i = 0; i < 5; i++) {
        if(!array[i]) {
            gameBoardTiles[5 * turn + i].textContent = ""
        } else {
            gameBoardTiles[5 * turn + i].textContent = array[i]
        }
    }
}

//-------------------------------------------------------------------------------------UPDATE BAORD FUNCTION -------------------------------------------------------------//

function incrementTurn() {
    turn++
}

function evaluateGuess() {
    let correctWordArr = correctWord.split('') 
    console.log(correctWordArr)

    gameBoard[turn].playerGuess.forEach(function(letter, index) {
        let tileIdx = 5 * turn + index
        
        setTimeout(function() {
        if(letter === correctWordArr[index]) {
            console.log(index, 'green')
            //showGreenTiles()
            showResultsTiles(tileIdx, 'green')
            updateKeyboard(letter, 'green')
        } else if(correctWordArr.includes(letter)) {
            console.log(index, 'yellow');
            // showYellowTiles()
            showResultsTiles(tileIdx, 'yellow')
            updateKeyboard(letter, 'yellow')
        } else {
            console.log(index, 'black');
            //showBlackTiles()
            showResultsTiles(tileIdx, 'black')
            updateKeyboard(letter, 'black')
        }
    }, 250 * index)
    })
}

function showResultsTiles(idx, color) {
    gameBoardTiles[idx].classList.add(color)
    gameBoardTiles[idx].classList.add('flip')
    
    console.dir(gameBoard)
    console.dir(gameBoardTiles)

}


function checkForWin() {
    let playerWord = gameBoard[turn].playerGuess.join('')
    if(playerWord === correctWord) {
    console.log(playerWord);
    console.log("You've won!")
    messageEl.textContent = "You've won!  Congratulations!"
    hasWon = true
    keyEls.forEach(function(key) {
        key.removeEventListener('click', handleClick)
    })
    document.removeEventListener("keydown", handleKeyStroke)
    createResetBtn()
    }
}

function checkForLoss() {
    if(turn > 5) {
        console.log(`sadly, you've lost`);
        hasLost = true
        messageEl.textContent = `Sadly, not this time.  The correct word was ${correctWord}`
        keyEls.forEach(function(key) {
        key.removeEventListener('click', handleClick)
    })
    document.removeEventListener("keydown", handleKeyStroke)
    createResetBtn()    
    }
    
}

function createResetBtn() {
    setTimeout(function() {
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
    tempGuess.forEach((guess) => {
        guess.letters = []
    })
    console.dir(gameBoardTiles)
    console.dir(tempGuess)

}

function updateKeyboard(letter, color) {
    let keyEl = document.getElementById(letter)
    
    console.log(keyEl.classList.toString());
    if(keyEl.classList.toString().includes('green')) 
        return
    else {
        keyEl.classList.add(color)
    }
}
