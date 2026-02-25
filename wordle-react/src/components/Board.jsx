

export default function Board({ guesses, currentGuess }) {
  const rows = 6;
  const cols = 5;

  const displayRows = Array.from({ length: rows }, (_, r) => {
    const committed = guesses[r] || "";
    const isCurrent = r === guesses.length;

    const letters = (isCurrent ? currentGuess : committed).padEnd(cols).slice(0, cols);

    return (
      <div className="row" key={r}>
        {Array.from({ length: cols }, (_, c) => (
          <div className="tile" key={c}>
            {letters[c]}
          </div>
        ))}
      </div>
    );
  });

  return <div className="board">{displayRows}</div>;
}