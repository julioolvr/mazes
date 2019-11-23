import { BooleanMatrix } from "./mask";

export const spaceInvader = parseMask(`
  ...............
  ....XX...XX....
  .....X...X.....
  ....XXXXXXX....
  ...XX.XXX.XX...
  ..XXXXXXXXXXX..
  ..X.XXXXXXX.X..
  ..X.X.....X.X..
  ....XXX.XXX....
`);

function parseMask(definition: string): BooleanMatrix {
  return flipMatrix(
    definition
      .split("\n")
      .filter(s => s.length > 0)
      .map(s =>
        s
          .trim()
          .split("")
          .map(c => c === "X")
      )
  );
}

function flipMatrix<T>(matrix: Array<Array<T>>): Array<Array<T>> {
  const flippedMatrix: Array<Array<T>> = [];
  const width = matrix.length;
  const height = matrix[0].length;

  for (let x = 0; x < height; x++) {
    flippedMatrix.push([]);

    for (let y = 0; y < width; y++) {
      flippedMatrix[x][width - y - 1] = matrix[y][x];
    }
  }

  return flippedMatrix;
}
