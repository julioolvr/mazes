import sample from "utils/sample";
import Grid from "lib/maze";

function huntAndKill(grid: Grid) {
  grid.clear();

  const start = grid.randomCell();
  start.visit();
  const stack = [start];

  while (stack.length > 0) {
    while (
      stack.length > 0 &&
      grid.notVisitedNeighbors(stack[stack.length - 1]).size === 0
    ) {
      stack.pop();
    }

    if (stack.length > 0) {
      const next = sample(grid.notVisitedNeighbors(stack[stack.length - 1]));
      grid.connect(stack[stack.length - 1].coordinates, next.coordinates);
      next.visit();
      stack.push(next);
    }
  }
}

export default huntAndKill;
