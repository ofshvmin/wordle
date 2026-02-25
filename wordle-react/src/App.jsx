import { useState } from "react";
import Landing from "./components/Landing";
import Game from "./components/Game";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      {started ? <Game /> : <Landing onStart={() => setStarted(true)} />}
    </div>
  );
}

export default App;