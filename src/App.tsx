import React, { useState, useRef } from "react";
import "./App.css";

import Maze from "Maze";
import Grid from "lib/maze";
import { binaryTree, sidewinder } from "lib/generators";

const algorithms = [
  { name: "Binary Tree", algo: binaryTree },
  { name: "Sidewinder", algo: sidewinder }
];

const App: React.FC = () => {
  const maze = new Grid(20, 20);
  const [algorithmIndex, setAlgorithmIndex] = useState(0);

  algorithms[algorithmIndex].algo(maze);

  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  function regenerate() {
    algorithms[algorithmIndex].algo(mazeRef.current);
    setGeneratedAt(new Date());
  }

  return (
    <div>
      Generators:
      {algorithms.map((algorithm, i) => (
        <label key={algorithm.name}>
          <input
            type="radio"
            name="algorithm"
            value={i}
            checked={algorithmIndex === i}
            onChange={e => setAlgorithmIndex(Number(e.target.value))}
          />

          {algorithm.name}
        </label>
      ))}
      <button onClick={regenerate}>Regenerate</button>
      <Maze key={generatedAt.toISOString()} grid={mazeRef.current} />
    </div>
  );
};

export default App;
