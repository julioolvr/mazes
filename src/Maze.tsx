import React, { useMemo } from "react";

import Grid, { GridCoordinates } from "lib/maze";
import times from "utils/times";
import dijkstra from "lib/solvers/dijkstra";

import "./Maze.css";

function Maze({ grid, startPoint, endPoint, showSolution = true }: Props) {
  const solution = useMemo(
    () => (showSolution ? dijkstra(grid, startPoint, endPoint) : []),
    [grid, startPoint, endPoint, showSolution]
  );
  const maxDistance = solution.length;

  return (
    <table>
      <tbody>
        {times(grid.height, i => {
          const y = grid.height - i - 1;

          return (
            <tr key={y}>
              {times(grid.width, x => {
                const style: {
                  borderLeft?: string;
                  borderRight?: string;
                  borderTop?: string;
                  borderBottom?: string;
                  backgroundColor?: string;
                } = {};

                if (grid.hasConnection({ x, y }, { x: x - 1, y })) {
                  style.borderLeft = "none";
                }

                if (grid.hasConnection({ x, y }, { x: x + 1, y })) {
                  style.borderRight = "none";
                }

                if (grid.hasConnection({ x, y }, { x, y: y - 1 })) {
                  style.borderBottom = "none";
                }

                if (grid.hasConnection({ x, y }, { x, y: y + 1 })) {
                  style.borderTop = "none";
                }

                if (
                  showSolution &&
                  solution.some(
                    coordinates => x === coordinates.x && y === coordinates.y
                  )
                ) {
                  const distance = solution.findIndex(
                    coordinates => x === coordinates.x && y === coordinates.y
                  );
                  style.backgroundColor = `hsl(10, ${(distance / maxDistance) *
                    100}%, 50%)`;
                }

                return <td key={x} style={style}></td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

type Props = {
  grid: Grid;
  startPoint: GridCoordinates;
  endPoint: GridCoordinates;
  showSolution?: boolean;
};

export default Maze;
