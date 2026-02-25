import { useState } from "react";
import Landing from "./components/Landing";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      {started ? <div>Game goes here</div> : <Landing onStart={() => setStarted(true)} />}
    </div>
  );
}

export default App;