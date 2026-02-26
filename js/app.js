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
const modalOverlay = document.getElementById("modal-overlay")
const playBtn = document.getElementById("play-btn")
const gameoverOverlay = document.getElementById("gameover-overlay")
const gameoverMessage = document.getElementById("gameover-message")
const playAgainBtn = document.getElementById("play-again-btn")

/*----------------------------- Event Listeners -----------------------------*/

keyEls.forEach((key) => {key.addEventListener('click', handleClick)})
document.addEventListener("keydown", handleKeyStroke)
resetBtn.addEventListener("click", pressReset)
playBtn.addEventListener("click", () => { modalOverlay.style.display = "none" })
playAgainBtn.addEventListener("click", () => {
    gameoverOverlay.classList.remove("active")
    confetti.stop()
    initializeGame()
})

/*-------------------------------- Functions --------------------------------*/

let messageTimer = null

function showMessage(text) {
    clearTimeout(messageTimer)
    messageEl.textContent = text
    messageTimer = setTimeout(() => { messageEl.textContent = "" }, 2000)
}

function initializeGame() {
    if(correctWord) {
        usedWords.push(correctWord)
    }
    resetGameBoard()
    computerChoosesWord() 
    render()
}
initializeGame()
// console.log('====================================');
// console.log(correctWord);
// console.log('====================================');

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
    showMessage("That's not a valid key")
    }
    render()
}

function handleInputs(ltrGuess) {
    if(ltrGuess != 'backspace' && ltrGuess != 'enter'){
        if(gameBoard[turn].playerGuess.length < 5) {
            gameBoard[turn].playerGuess.push(ltrGuess)
            const tileIdx = 5 * turn + (gameBoard[turn].playerGuess.length - 1)
            const tile = gameBoardTiles[tileIdx]
            tile.classList.remove('pop')
            void tile.offsetWidth // force reflow so re-adding the class restarts animation
            tile.classList.add('pop')
            tile.addEventListener('animationend', () => tile.classList.remove('pop'), { once: true })
        } else {
            showMessage("Guess can only be 5 letters long")
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
        showMessage("Guess must be 5 letters long")
    } else if(!library.includes(gameBoard[turn].playerGuess.join(''))) {
        showMessage("Not in word list")
        const currentRow = document.querySelectorAll('.row')[turn]
        currentRow.classList.remove('wiggle')
        void currentRow.offsetWidth
        currentRow.classList.add('wiggle')
        currentRow.addEventListener('animationend', () => currentRow.classList.remove('wiggle'), { once: true })
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

// function evaluateGuess() {
//     const correctWordArr = correctWord.split('');
//     const guessArr = gameBoard[turn].playerGuess;

//   // 1) Count remaining letters in answer (we'll "consume" them)
//     const remaining = {};
//     for (const ch of correctWordArr) remaining[ch] = (remaining[ch] || 0) + 1;

//   // 2) First pass: mark greens and consume counts
//   const results = Array(5).fill('black'); // black = absent
//     guessArr.forEach((letter, i) => {
//     if (letter === correctWordArr[i]) {
//         results[i] = 'green';
//         remaining[letter] -= 1;
//     }
// });

//   // 3) Second pass: mark yellows where counts remain
// guessArr.forEach((letter, i) => {
//     if (results[i] === 'green') return;
//     if (remaining[letter] > 0) {
//     results[i] = 'yellow';
//     remaining[letter] -= 1;
//     }
// });

//   // 4) Render with your existing stagger animation
// results.forEach((color, index) => {
//     const letter = guessArr[index];
//     const tileIdx = 5 * turn + index;

//     setTimeout(() => {
//     showResultsTiles(tileIdx, color);
//     updateKeyboard(letter, color);
//     }, 250 * index);
//     });
// }

function evaluateGuess() {
  const guessArr = gameBoard[turn].playerGuess;

  const results = scoreGuess(correctWord, guessArr);

  results.forEach((color, index) => {
    const letter = guessArr[index];
    const tileIdx = 5 * turn + index;

    setTimeout(() => {
      showResultsTiles(tileIdx, color);
      updateKeyboard(letter, color);
    }, 250 * index);
  });
}


function scoreGuess(correctWord, guessArr) {
  const answer = correctWord.toUpperCase().split('');
  const guess = guessArr.map(ch => ch.toUpperCase());

  // Count letters in the answer
  const remaining = Object.create(null);
  for (const ch of answer) remaining[ch] = (remaining[ch] || 0) + 1;

  const results = Array(5).fill('black');

  // Pass 1: greens
  for (let i = 0; i < 5; i++) {
    if (guess[i] === answer[i]) {
      results[i] = 'green';
      remaining[guess[i]] -= 1; // consume
    }
  }

  // Pass 2: yellows (only if any remain)
  for (let i = 0; i < 5; i++) {
    if (results[i] === 'green') continue;
    const ch = guess[i];
    if (remaining[ch] > 0) {
      results[i] = 'yellow';
      remaining[ch] -= 1; // consume
    }
  }

  return results;
}


function showResultsTiles(idx, color) {
    gameBoardTiles[idx].classList.add(color)
    gameBoardTiles[idx].classList.add('flip')
}

function checkForWin() {
    let playerWord = gameBoard[turn].playerGuess.join('')
    if(playerWord === correctWord) {
        hasWon = true
        confetti.start()
        keyEls.forEach((key) => {
            key.removeEventListener('click', handleClick)
        })
        document.removeEventListener("keydown", handleKeyStroke)
        setTimeout(() => {
            gameoverMessage.textContent = "🎉 Congratulations!"
            gameoverOverlay.classList.add("active")
        }, 1600)
    }
}

function checkForLoss() {
    if(turn > 5) {
        hasLost = true
        keyEls.forEach((key) => {
            key.removeEventListener('click', handleClick)
        })
        document.removeEventListener("keydown", handleKeyStroke)
        setTimeout(() => {
            gameoverMessage.textContent = `The correct word was ${correctWord}`
            gameoverOverlay.classList.add("active")
        }, 1600)
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