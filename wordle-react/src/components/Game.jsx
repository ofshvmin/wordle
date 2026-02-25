import { useEffect, useReducer } from "react";
import Board from "./Board";

const initialState = {
  answer: "SHRED",
  guesses: [],
  currentGuess: "",
  turn: 0,
  status: "playing", // "playing" | "won" | "lost"
};


function reducer(state, action) {
  
  switch (action.type) {
    case "SET_ANSWER":
      return state;
      
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
          if (state.status !== "playing") return state;
          if (state.currentGuess.length !== 5) return state;

          const isWin = state.currentGuess === state.answer;
          const nextTurn = state.turn + 1;
          const isLoss = !isWin && nextTurn >= 6;

          return {
            ...state,
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
            }
            


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

  return (
    <div className="game">
      <h2>Game</h2>

      <Board guesses={state.guesses} currentGuess={state.currentGuess} />

      {/* <button onClick={() => dispatch({ type: "ADD_LETTER", letter: "ZZZZZ" })}>
        Add A
      </button>
      
      <button onClick={() => dispatch({ type: "REMOVE_LETTER" })}>
        Backspace
      </button>
      <button onClick={() => dispatch({ type: "SUBMIT_GUESS" })}>
        Enter
      </button> */}
      
      <p>Answer (dev): {state.answer}</p>
      <p>Current guess: {state.currentGuess}</p>
      <p>Status: {state.status}</p>
      <p>Turn: {state.turn}</p>

      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}