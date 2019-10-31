import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

import Maze from "Maze";
import FormGroup from "ui/FormGroup";
import ButtonGroup from "ui/ButtonGroup";
import Button from "ui/Button";
import Grid from "lib/maze";
import { binaryTree, sidewinder, aldousBroder } from "lib/generators";

const algorithms = [
  { name: "Binary Tree", algo: binaryTree },
  { name: "Sidewinder", algo: sidewinder },
  { name: "Aldous-Broder", algo: aldousBroder }
];

const App: React.FC = () => {
  const maze = new Grid(20, 20);
  const [algorithmIndex, setAlgorithmIndex] = useState(0);

  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  const regenerate = useCallback(() => {
    algorithms[algorithmIndex].algo(mazeRef.current);
    setGeneratedAt(new Date());
  }, [algorithmIndex]);

  useEffect(() => regenerate(), []);

  return (
    <div>
      <FormGroup title="Generators">
        <ButtonGroup>
          {algorithms.map((algorithm, i) => (
            <Button
              key={algorithm.name}
              onClick={() => setAlgorithmIndex(i)}
              selected={algorithmIndex === i}
            >
              {algorithm.name}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>

      <div>
        <Button fullWidth onClick={regenerate}>
          Regenerate
        </Button>
      </div>

      <Maze key={generatedAt.toISOString()} grid={mazeRef.current} />
    </div>
  );
};

export default App;
