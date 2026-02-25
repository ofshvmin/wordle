import { useReducer } from "react";

const initialState = {
  answer: "",
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
        
        case "REMOVE_LETTER":
          if (state.status !== "playing") return state;
          if (state.currentGuess.length === 0) return state;

          return {
            ...state,
            currentGuess: state.currentGuess.slice(0, -1),
          };
          
          case "SUBMIT_GUESS":
            return state;
            
            case "RESET_GAME":
              return state;
              
              default:
                return state;
              }
            }
            
            export default function Game() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h2>Game</h2>

      <button onClick={() => dispatch({ type: "ADD_LETTER", letter: "A" })}>
        Add A
      </button>
      
      <button onClick={() => dispatch({ type: "REMOVE_LETTER" })}>
        Backspace
      </button>
      
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
}