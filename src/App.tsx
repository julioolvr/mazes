import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css";

import Maze from "Maze";
import FormGroup from "ui/FormGroup";
import ButtonGroup from "ui/ButtonGroup";
import Button from "ui/Button";
import Grid, { MaskedGrid } from "lib/maze";
import Mask from "lib/mask";
import { spaceInvader } from "lib/masks";
import {
  binaryTree,
  sidewinder,
  aldousBroder,
  wilson,
  huntAndKill,
  recursiveBacktracker
} from "lib/generators";

const algorithms = [
  { name: "Binary Tree", algo: binaryTree },
  { name: "Sidewinder", algo: sidewinder },
  { name: "Aldous-Broder", algo: aldousBroder },
  { name: "Wilson", algo: wilson },
  { name: "Hunt & Kill", algo: huntAndKill },
  { name: "Recursive Backtracker", algo: recursiveBacktracker }
];

const App: React.FC = () => {
  const mask = new Mask(spaceInvader);
  const maze = new MaskedGrid(mask);
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(true);
  const [showDistanceGradient, setShowDistanceGradient] = useState(false);

  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  const cells = maze.orderedCellsBottomLeftTopRight();
  const startPoint = cells[0].coordinates;
  const endPoint = cells[cells.length - 1].coordinates;

  const generate = useCallback(() => {
    algorithms[algorithmIndex].algo(mazeRef.current);
    setGeneratedAt(new Date());
  }, [algorithmIndex]);

  useEffect(() => generate(), []);

  return (
    <div className="container">
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
        mask={mask}
        startPoint={startPoint}
        endPoint={endPoint}
        showSolution={showSolution}
        showDistanceGradient={showDistanceGradient}
      />

      <h3>Options</h3>

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

      <FormGroup title="Show distance gradient">
        <ButtonGroup>
          <Button
            onClick={() => setShowDistanceGradient(false)}
            selected={!showDistanceGradient}
          >
            No
          </Button>

          <Button
            onClick={() => setShowDistanceGradient(true)}
            selected={showDistanceGradient}
          >
            Yes
          </Button>
        </ButtonGroup>
      </FormGroup>
    </div>
  );
};

export default App;
