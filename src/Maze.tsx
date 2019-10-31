import React, { useMemo } from "react";

import Grid from "lib/maze";
import times from "utils/times";
import dijkstra, { distanceAt } from "lib/solvers/dijkstra";

import "./Maze.css";

function Maze({ grid }: Props) {
  const start = { x: grid.height - 1, y: grid.width - 1 };
  const end = { x: 0, y: 0 };

  const solution = useMemo(() => dijkstra(grid, start), [grid, start]);
  const distanceAtCoordinates = distanceAt(solution);
  const solutionPath = useMemo(() => {
    const path = [end];
    let current = end;
    let distance = distanceAtCoordinates(end);

    while (distance > 0) {
      const neighbors = grid.connected(current);
      const nextNeighbor = Array.from(neighbors).find(
        cell => distanceAtCoordinates(cell.coordinates) < distance
      );
      const nextCoordinates = nextNeighbor!.coordinates;
      path.push(nextCoordinates);
      distance = distanceAtCoordinates(nextCoordinates);
      current = nextCoordinates;
    }

    return path;
  }, [distanceAtCoordinates, end, grid]);
  const maxDistance = distanceAtCoordinates(solutionPath[0]);

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
                  solutionPath.some(
                    coordinates => x === coordinates.x && y === coordinates.y
                  )
                ) {
                  style.backgroundColor = `hsl(10, ${(distanceAtCoordinates({
                    x,
                    y
                  }) /
                    maxDistance) *
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
};

export default Maze;
