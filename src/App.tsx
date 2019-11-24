import React, { useState, useRef, useEffect, useMemo } from "react";
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
  { name: "Binary Tree", algo: binaryTree, supportsMask: false },
  { name: "Sidewinder", algo: sidewinder, supportsMask: false },
  { name: "Aldous-Broder", algo: aldousBroder, supportsMask: true },
  { name: "Wilson", algo: wilson, supportsMask: true },
  { name: "Hunt & Kill", algo: huntAndKill, supportsMask: true },
  {
    name: "Recursive Backtracker",
    algo: recursiveBacktracker,
    supportsMask: true
  }
];

const App: React.FC = () => {
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(true);
  const [showDistanceGradient, setShowDistanceGradient] = useState(false);
  const [useMask, setUseMask] = useState(false);
  const mask = new Mask(spaceInvader);

  const maze = useMask ? new MaskedGrid(mask) : new Grid(20, 20);
  const mazeRef = useRef(maze);
  const [generatedAt, setGeneratedAt] = useState(new Date());

  const generate = (algorithmIndex: number, useMask: boolean) => {
    if (mazeRef.current instanceof MaskedGrid !== useMask) {
      mazeRef.current = useMask ? new MaskedGrid(mask) : new Grid(20, 20);
    }
    algorithms[algorithmIndex].algo(mazeRef.current);
    setGeneratedAt(new Date());
  };

  useEffect(() => generate(algorithmIndex, useMask), []);

  const [startPoint, endPoint] = useMemo(() => {
    const cells = mazeRef.current.orderedCellsBottomLeftTopRight();
    return [cells[0].coordinates, cells[cells.length - 1].coordinates];
  }, [mazeRef.current]);

  useEffect(() => {
    if (useMask && !algorithms[algorithmIndex].supportsMask) {
      const index = algorithms.findIndex(algorithm => algorithm.supportsMask);
      setAlgorithmIndex(index);
    }
  }, [useMask, algorithmIndex]);

  return (
    <div className="container">
      <FormGroup title="Generators">
        <ButtonGroup>
          {algorithms.map((algorithm, i) => (
            <Button
              key={algorithm.name}
              onClick={() => setAlgorithmIndex(i)}
              selected={algorithmIndex === i}
              disabled={useMask && !algorithm.supportsMask}
              title={
                useMask && !algorithm.supportsMask
                  ? "This algorithm doesn't support masking"
                  : undefined
              }
            >
              {algorithm.name}
            </Button>
          ))}
        </ButtonGroup>
      </FormGroup>

      <FormGroup title="Use mask">
        <ButtonGroup>
          <Button onClick={() => setUseMask(false)} selected={!useMask}>
            No
          </Button>

          <Button onClick={() => setUseMask(true)} selected={useMask}>
            Yes
          </Button>
        </ButtonGroup>
      </FormGroup>

      <div>
        <Button fullWidth onClick={() => generate(algorithmIndex, useMask)}>
          Generate
        </Button>
      </div>

      <Maze
        key={generatedAt.toISOString()}
        grid={mazeRef.current}
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
