import sample from "utils/sample";
import Grid from "lib/maze";

function huntAndKill(grid: Grid) {
  grid.clear();

  let current = grid.randomCell();

  while (!grid.allVisited()) {
    current.visit();
    const next = sample(grid.notVisitedNeighbors(current));

    if (next) {
      grid.connect(current.coordinates, next.coordinates);
      current = next;
    } else {
      const candidate = grid
        .orderedCellsTopLeftBottomRight()
        .find(
          cell => !cell.isVisited() && grid.visitedNeighbors(cell).size > 0
        );

      if (candidate) {
        current = candidate;
        grid.connect(
          current.coordinates,
          sample(grid.visitedNeighbors(current)).coordinates
        );
      }
    }
  }
}

export default huntAndKill;
