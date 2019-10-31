import Grid from "lib/maze";

function sidewinder(grid: Grid) {
  grid.clear();

  for (let y = 0; y < grid.height; y++) {
    let run = [];

    for (let x = 0; x < grid.width; x++) {
      if (x === grid.width - 1 && y === grid.height - 1) {
        break;
      }

      if (y === grid.height - 1) {
        grid.connect({ x, y }, { x: x + 1, y });
        continue;
      }

      run.push({ x, y });

      if (x < grid.width - 1 && Math.random() >= 0.5) {
        grid.connect({ x, y }, { x: x + 1, y });
        continue;
      }

      const randomInRun = run[Math.floor(Math.random() * run.length)];
      grid.connect(randomInRun, { x: randomInRun.x, y: randomInRun.y + 1 });
      run = [];
    }
  }
}

export default sidewinder;
