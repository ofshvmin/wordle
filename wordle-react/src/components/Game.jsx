import { useEffect, useReducer } from "react";
import Board from "./Board";

const initialState = {
  answer: "",
  guesses: [],
  currentGuess: "",
  turn: 0,
  status: "playing", // "playing" | "won" | "lost"
  message: "", // e.g. "Not enough letters", "Not in word list",
  shakeId: 0,
};


function reducer(state, action) {
  
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        answer: action.answer,
      };
      
      case "ADD_LETTER":
        if (state.status !== "playing") return state;
        if (state.currentGuess.length >= 5) return state;
        
        return {
          ...state,
          currentGuess: state.currentGuess + action.letter,
        };
        
        case "REMOVE_LETTER":{
          if (state.status !== "playing") return state;
          if (state.currentGuess.length === 0) return state;
          
          return {
            ...state,
            currentGuess: state.currentGuess.slice(0, -1),
          };
        };
        
        case "SUBMIT_GUESS": {
          
          if (state.currentGuess.length !== 5) {
            return { ...state, message: "Not enough letters", shakeId: state.shakeId + 1 };
          }
          
          if (state.guesses.includes(state.currentGuess)) {
            return { ...state, message: "Already guessed", shakeId: state.shakeId + 1 };
          }
          
          const isWin = state.currentGuess === state.answer;
          const nextTurn = state.turn + 1;
          const isLoss = !isWin && nextTurn >= 6;
          
          return {
            ...state,
            message: "",
            guesses: [...state.guesses, state.currentGuess],
            currentGuess: "",
            turn: nextTurn,
            status: isWin ? "won" : isLoss ? "lost" : "playing",
          };
        };
        
        case "RESET_GAME":
          return state;
          
          default:
            return state;
          }
        };
        
        
        export default function Game() {
          const [state, dispatch] = useReducer(reducer, initialState);
          
          useEffect(() => {
            function onKeyDown(e) {
              const key = e.key;
              
              if (/^[a-zA-Z]$/.test(key)) {
                dispatch({ type: "ADD_LETTER", letter: key.toUpperCase() });
                return;
              }
              
              if (key === "Backspace") {
                dispatch({ type: "REMOVE_LETTER" });
                return;
              }
              
              if (key === "Enter") {
                dispatch({ type: "SUBMIT_GUESS" });
                return;
    }
  }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dispatch]);

  useEffect(() => {
    const words = ["SHRED", "HORSE", "SMART", "PLANT", "BRICK"]; // temporary list
    const random = words[Math.floor(Math.random() * words.length)];

    dispatch({ type: "SET_ANSWER", answer: random });
  }, [dispatch]);

  return (
    <div className="game">
      <h2>Game</h2>

      <Board 
        answer={state.answer} 
        guesses={state.guesses} 
        currentGuess={state.currentGuess} 
        message={state.message}
        shakeId={state.shakeId}
      />
      {state.message ? <p className="message">{state.message}</p> : null}

      <p>Answer (dev): {state.answer}</p>
      <p>Current guess: {state.currentGuess}</p>
      <p>Status: {state.status}</p>
      <p>Turn: {state.turn}</p>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}