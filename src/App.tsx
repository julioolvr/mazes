import React, { useState, useRef } from 'react';
import './App.css';

import Maze from 'Maze';
import Grid from 'lib/maze';

const App: React.FC = () => {
  const initialMaze = new Grid(20, 20);
  initialMaze.generateBinaryTree();

  const mazeRef = useRef(initialMaze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  function regenerateMaze() {
    mazeRef.current.generateBinaryTree();
    setGeneratedAt(new Date());
  }

  return (
    <div>
      <Maze key={generatedAt.toISOString()} grid={mazeRef.current} />
      <button onClick={regenerateMaze}>Regenerate</button>
    </div>
  );
}

export default App;
