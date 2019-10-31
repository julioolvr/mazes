import sample from "utils/sample";
import Grid from "lib/maze";

function aldousBroder(grid: Grid) {
  grid.clear();

  let current = grid.randomCell();
  current.visit();

  while (!grid.allVisited()) {
    const next = sample(Array.from(grid.neighbors(current)));

    if (!next.isVisited()) {
      grid.connect(current.coordinates, next.coordinates);
      next.visit();
    }

    current = next;
  }
}

export default aldousBroder;
