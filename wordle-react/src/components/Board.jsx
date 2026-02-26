
function scoreGuess(answer, guess) {
  const a = answer.split("");
  const g = guess.split("");

  const remaining = {};
  for (const ch of a) remaining[ch] = (remaining[ch] || 0) + 1;

  const colors = Array(5).fill("gray");

  // Greens first
  for (let i = 0; i < 5; i++) {
    if (g[i] === a[i]) {
      colors[i] = "green";
      remaining[g[i]] -= 1;
    }
  }

  // Yellows next
  for (let i = 0; i < 5; i++) {
    if (colors[i] === "green") continue;
    if (remaining[g[i]] > 0) {
      colors[i] = "yellow";
      remaining[g[i]] -= 1;
    }
  }

  return colors;
}


export default function Board({ answer, guesses, currentGuess, message, shakeId }) {
  const rows = 6;
  const cols = 5;
  
  const displayRows = Array.from({ length: rows }, (_, r) => {
    const committed = guesses[r] || "";
    const isCurrent = r === guesses.length;
    const colors = committed ? scoreGuess(answer, committed) : Array(5).fill("");
    const letters = (isCurrent ? currentGuess : committed).padEnd(cols, "").slice(0, cols);
    
    return (
      <div 
        className={`row ${isCurrent && message ? "shake" : ""}`} 
        key={`${r}-${shakeId}`}
      >
        {Array.from({ length: cols }, (_, c) => {
          const tileClass = `tile ${committed ? `reveal ${colors[c]}` : ""}`;

          return (
          <div className={tileClass} key={c}>
            {letters[c] || ""}
          </div>
          );
        })}
      </div>
    );
  });

  return <div className="board">{displayRows}</div>;
}