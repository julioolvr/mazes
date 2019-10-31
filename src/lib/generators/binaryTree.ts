import Grid from "lib/maze";

function binaryTree(grid: Grid) {
  grid.clear();

  for (let x = 0; x < grid.width; x++) {
    for (let y = 0; y < grid.height; y++) {
      if (x === grid.width - 1 && y === grid.height - 1) {
        break;
      }

      if (x === grid.width - 1) {
        grid.connect({ x, y }, { x, y: y + 1 });
        continue;
      }

      if (y === grid.height - 1) {
        grid.connect({ x, y }, { x: x + 1, y });
        continue;
      }

      if (Math.random() >= 0.5) {
        grid.connect({ x, y }, { x, y: y + 1 });
      } else {
        grid.connect({ x, y }, { x: x + 1, y });
      }
    }
  }
}

export default binaryTree;
