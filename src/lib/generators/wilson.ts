import sample from "utils/sample";
import Grid from "lib/maze";

function wilson(grid: Grid) {
  grid.clear();

  grid.randomCell().visit();

  while (!grid.allVisited()) {
    let current = sample(grid.notVisited());
    let path = [current];

    while (!current.isVisited()) {
      current = sample(grid.neighbors(current));
      const index = path.findIndex(cell => cell === current);
      if (index >= 0) {
        path.splice(index);
      }
      path.push(current);
    }

    path.slice(0, -1).forEach((cell, i) => {
      grid.connect(cell.coordinates, path[i + 1].coordinates);
      cell.visit();
    });
  }
}

export default wilson;
