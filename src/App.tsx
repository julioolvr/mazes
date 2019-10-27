import React, { useState, useRef } from 'react';
import './App.css';

import Maze from 'Maze';
import Grid from 'lib/maze';

const App: React.FC = () => {
  const initialMaze = new Grid(20, 20);
  initialMaze.generateBinaryTree();

  const mazeRef = useRef(initialMaze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  function generateBinaryTree() {
    mazeRef.current.generateBinaryTree();
    setGeneratedAt(new Date());
  }

  function generateSidewinder() {
    mazeRef.current.generateSidewinder();
    setGeneratedAt(new Date());
  }

  return (
    <div>
      <Maze key={generatedAt.toISOString()} grid={mazeRef.current} />
      <button onClick={generateBinaryTree}>Regenerate w/ Binary Tree</button>
      <button onClick={generateSidewinder}>Regenerate w/ Sidewinder</button>
    </div>
  );
}

export default App;
