type GridCoordinates = { x: number, y: number };

class Cell {
  coordinates: GridCoordinates;

  constructor(x: number, y: number) {
    this.coordinates = { x, y };
  }

  hasCoordinates(coordinates: GridCoordinates) {
    return this.coordinates.x === coordinates.x && this.coordinates.y === coordinates.y;
  }
}

class Connection {
  from: Cell;
  to: Cell;

  constructor(from: Cell, to: Cell) {
    this.from = from;
    this.to = to;
  }

  matches(from: GridCoordinates, to: GridCoordinates): boolean {
    return this.from.hasCoordinates(from) && this.to.hasCoordinates(to)
      || this.from.hasCoordinates(to) && this.to.hasCoordinates(from);
  }
}

class Grid {
  width: number;
  height: number;
  cells: Array<Cell>;
  connections: Array<Connection>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.connections = [];
    this.cells = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.cells.push(new Cell(x, y));
      }
    }
  }

  connect(from: GridCoordinates, to: GridCoordinates) {
    if (!this.hasConnection(from, to)) {
      this.connections.push(new Connection(this.cellAt(from), this.cellAt(to)));
    }
  }

  hasConnection(from: GridCoordinates, to: GridCoordinates): boolean {
    return this.connections.some(connection => connection.matches(from, to));
  }

  cellAt(coordinates: GridCoordinates): Cell {
    const cell = this.cells[coordinates.y * this.width + coordinates.x];

    if (!cell) {
      throw new Error(`Couldn't find cell at x: ${coordinates.x}, y: ${coordinates.y}`);
    }

    return cell;
  }
}

export default Grid;

const grid = new Grid(20, 20)

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

function drawGrid(grid: Grid) {
  // Loop from top to bottom, left to right
  for (let y = grid.height - 1; y >= 0; y--) {
    // Each row draws two lines, one for the top border and one for the cells themselves
    // The bottom line of the grid will be added last, and it's always full
    // First the one for the top border
    let chars = [];

    for (let x = 0; x < grid.width; x++) {
      // Each cell draws two characters, one for the left border and one for the center
      // The rightmost border of the grid is drawn last, and it's always full
      chars.push('-')

      if (grid.hasConnection({ x, y }, { x, y: y + 1 })) {
        chars.push(' ');
      } else {
        chars.push('-');
      }
    }

    // Right most char of the top line for the row
    chars.push('-')
    console.log(chars.join(''));

    chars = [];
    for (let x = 0; x < grid.width; x++) {
      if (grid.hasConnection({ x, y }, { x: x - 1, y })) {
        chars.push(' ');
      } else {
        chars.push('|');
      }

      chars.push(' ')
    }

    chars.push('|')
    console.log(chars.join(''));
  }

  console.log(new Array(grid.width * 2 + 1).fill('-').join(''))
}

console.log('Grid:');
drawGrid(grid);
