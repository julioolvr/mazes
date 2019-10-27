import React, { useState, useRef } from "react";
import "./App.css";

import Maze from "Maze";
import Grid from "lib/maze";
import { binaryTree, sidewinder } from "lib/generators";

const App: React.FC = () => {
  const maze = new Grid(20, 20);
  binaryTree(maze);

  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  function generateBinaryTree() {
    binaryTree(mazeRef.current);
    setGeneratedAt(new Date());
  }

  function generateSidewinder() {
    sidewinder(mazeRef.current);
    setGeneratedAt(new Date());
  }

  return (
    <div>
      <Maze key={generatedAt.toISOString()} grid={mazeRef.current} />
      <button onClick={generateBinaryTree}>Regenerate w/ Binary Tree</button>
      <button onClick={generateSidewinder}>Regenerate w/ Sidewinder</button>
    </div>
  );
};

export default App;
