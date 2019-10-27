import React from "react";

import Grid from "lib/maze";
import times from 'utils/times';

import './Maze.css';

function Maze({ grid }: Props) {
  return (
    <table>
      <tbody>
        {
          times(grid.height, i => {
            const y = grid.height - i - 1;

            return (
              <tr key={y}>
                {times(grid.width, x => {
                  const style: {
                    borderLeft?: string
                    borderRight?: string
                    borderTop?: string
                    borderBottom?: string
                  } = {};

                  if (grid.hasConnection({ x, y }, { x: x - 1, y })) {
                    style.borderLeft = 'none';
                  }

                  if (grid.hasConnection({ x, y }, { x: x + 1, y })) {
                    style.borderRight = 'none';
                  }

                  if (grid.hasConnection({ x, y }, { x, y: y - 1 })) {
                    style.borderBottom = 'none';
                  }

                  if (grid.hasConnection({ x, y }, { x, y: y + 1 })) {
                    style.borderTop = 'none';
                  }

                  return <td key={x} style={style}></td>
                })}
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

type Props = {
  grid: Grid;
};

export default Maze;
