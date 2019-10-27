import React, { useState } from 'react';
import './App.css';

import Maze from 'Maze';
import Grid from 'lib/maze';

const App: React.FC = () => {
  const initialMaze = new Grid(20, 20);
  initialMaze.generate();

  const [maze, setMaze] = useState(initialMaze);

  function regenerateMaze() {
    const maze = new Grid(20, 20);
    maze.generate();
    setMaze(maze);
  }

  return (
    <div>
      <Maze grid={maze} />
      <button onClick={regenerateMaze}>Regenerate</button>
    </div>
  );
}

export default App;
