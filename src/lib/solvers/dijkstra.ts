import Grid, { GridCoordinates } from "lib/maze";

type Solution = Array<GridCoordinates>;

function dijkstra(
  grid: Grid,
  startPoint: GridCoordinates,
  endPoint: GridCoordinates
): Solution {
  const distances = distancesFrom(grid, startPoint);

  const path = [endPoint];
  let current = endPoint;
  let distance = distances[endPoint.x][endPoint.y];

  while (distance > 0) {
    const neighbors = grid.connected(current);
    const nextNeighbor = Array.from(neighbors).find(
      cell => distances[cell.coordinates.x][cell.coordinates.y] < distance
    );
    const nextCoordinates = nextNeighbor!.coordinates;
    path.push(nextCoordinates);
    distance = distances[nextCoordinates.x][nextCoordinates.y];
    current = nextCoordinates;
  }

  return path;
}

function distancesFrom(
  grid: Grid,
  startPoint: GridCoordinates
): Array<Array<number>> {
  const distances: Array<Array<number>> = new Array(grid.width)
    .fill(undefined)
    .map(() => new Array(grid.height).fill(undefined));

  let frontier = [startPoint];
  let distance = 1;
  distances[startPoint.x][startPoint.y] = 0;

  while (frontier.length > 0) {
    const newFrontier: Array<GridCoordinates> = [];

    frontier.forEach(coordinates => {
      grid.connected(coordinates).forEach(cell => {
        if (distances[cell.coordinates.x][cell.coordinates.y] === undefined) {
          distances[cell.coordinates.x][cell.coordinates.y] = distance;
          newFrontier.push(cell.coordinates);
        }
      });
    });

    frontier = newFrontier;
    distance++;
  }

  return distances;
}

export default dijkstra;
export { distancesFrom };
