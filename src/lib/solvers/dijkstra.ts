import Grid, { GridCoordinates } from "lib/maze";

function dijkstra(grid: Grid, startPoint: GridCoordinates): DijkstraSolution {
  const distances: Array<number> = new Array(grid.height * grid.width).fill(
    undefined
  );

  let frontier = [startPoint];
  let distance = 1;
  distances[coordinateToIndex(grid.width, startPoint)] = 0;

  while (frontier.length > 0) {
    const newFrontier: Array<GridCoordinates> = [];

    frontier.forEach(coordinates => {
      grid.neighbors(coordinates).forEach(cell => {
        const index = coordinateToIndex(grid.width, cell.coordinates);

        if (distances[index] === undefined) {
          distances[index] = distance;
          newFrontier.push(cell.coordinates);
        }
      });
    });

    frontier = newFrontier;
    distance++;
  }

  return { grid, distances };
}

type DijkstraSolution = {
  grid: Grid;
  distances: Array<number>;
};

export default dijkstra;

function distanceAt(solution: DijkstraSolution) {
  return function(coordinates: GridCoordinates): number {
    return solution.distances[
      coordinateToIndex(solution.grid.width, coordinates)
    ];
  };
}

export { distanceAt };

function coordinateToIndex(
  rowWidth: number,
  coordinates: GridCoordinates
): number {
  return coordinates.y * rowWidth + coordinates.x;
}
