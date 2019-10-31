import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

import Maze from "Maze";
import FormGroup from "ui/FormGroup";
import ButtonGroup from "ui/ButtonGroup";
import Button from "ui/Button";
import Grid from "lib/maze";
import { binaryTree, sidewinder, aldousBroder, wilson } from "lib/generators";

const algorithms = [
  { name: "Binary Tree", algo: binaryTree },
  { name: "Sidewinder", algo: sidewinder },
  { name: "Aldous-Broder", algo: aldousBroder },
  { name: "Wilson", algo: wilson }
];

const App: React.FC = () => {
  const maze = new Grid(20, 20);
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(true);

  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  const generate = useCallback(() => {
    algorithms[algorithmIndex].algo(mazeRef.current);
    setGeneratedAt(new Date());
  }, [algorithmIndex]);

  useEffect(() => generate(), []);

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
        <Button fullWidth onClick={generate}>
          Generate
        </Button>
      </div>

      <Maze
        key={generatedAt.toISOString()}
        grid={mazeRef.current}
        startPoint={{ x: 0, y: 0 }}
        endPoint={{
          x: mazeRef.current.width - 1,
          y: mazeRef.current.height - 1
        }}
        showSolution={showSolution}
      />

      <FormGroup title="Show solution">
        <ButtonGroup>
          <Button
            onClick={() => setShowSolution(false)}
            selected={!showSolution}
          >
            No
          </Button>

          <Button onClick={() => setShowSolution(true)} selected={showSolution}>
            Yes
          </Button>
        </ButtonGroup>
      </FormGroup>
    </div>
  );
};

export default App;
