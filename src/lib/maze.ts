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
    return (this.from.hasCoordinates(from) && this.to.hasCoordinates(to))
      || (this.from.hasCoordinates(to) && this.to.hasCoordinates(from));
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

  generateBinaryTree() {
    this.clearConnections();

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (x === this.width - 1 && y === this.height - 1) {
          break;
        }

        if (x === this.width - 1) {
          this.connect({ x, y }, { x, y: y + 1 });
          continue;
        }

        if (y === this.height - 1) {
          this.connect({ x, y }, { x: x + 1, y });
          continue;
        }

        if (Math.random() >= 0.5) {
          this.connect({ x, y }, { x, y: y + 1 });
        } else {
          this.connect({ x, y }, { x: x + 1, y });
        }
      }
    }
  }

  generateSidewinder() {
    this.clearConnections();

    for (let y = 0; y < this.height; y++) {
      let run = [];

      for (let x = 0; x < this.width; x++) {
        if (x === this.width - 1 && y === this.height - 1) {
          break;
        }

        if (y === this.height - 1) {
          this.connect({ x, y }, { x: x + 1, y });
          continue;
        }

        run.push({ x, y });

        if (x < this.width - 1 && Math.random() >= 0.5) {
          this.connect({ x, y }, { x: x + 1, y });
          continue;
        }

        const randomInRun = run[Math.floor(Math.random() * run.length)];
        this.connect(randomInRun, { x: randomInRun.x, y: randomInRun.y + 1 });
        run = [];
      }
    }
  }

  clearConnections() {
    this.connections = [];
  }
}

export default Grid;
