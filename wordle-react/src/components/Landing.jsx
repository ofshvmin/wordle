export default function Landing({ onStart }) {
  return (
    <div className="landing">
      <h1 className="logo">Wordle</h1>
      <button className="primary" onClick={onStart}>
        Play
      </button>
    </div>
  );
}