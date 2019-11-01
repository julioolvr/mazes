import React, { useMemo } from "react";

import Grid, { GridCoordinates } from "lib/maze";
import times from "utils/times";
import dijkstra, { distancesFrom } from "lib/solvers/dijkstra";

import "./Maze.css";

function Maze({
  grid,
  startPoint,
  endPoint,
  showSolution = true,
  showDistanceGradient = false
}: Props) {
  const distances = useMemo(
    () =>
      showDistanceGradient
        ? distancesFrom(grid, {
            x: Math.floor(grid.width / 2),
            y: Math.floor(grid.height / 2)
          })
        : [],
    [grid, showDistanceGradient]
  );
  const maxDistance = Math.max(...distances.flat());

  const solution = useMemo(
    () => (showSolution ? dijkstra(grid, startPoint, endPoint) : []),
    [grid, startPoint, endPoint, showSolution]
  );

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

                if (showDistanceGradient) {
                  const distance = distances[x][y];
                  style.backgroundColor = `hsl(150, ${((maxDistance -
                    distance) /
                    maxDistance) *
                    100}%, ${((maxDistance - distance) / maxDistance) * 40 +
                    10}%)`;
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
                  style.backgroundColor = `hsl(10, ${(distance /
                    solution.length) *
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
  showDistanceGradient?: boolean;
};

export default Maze;
