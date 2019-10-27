type GridCoordinates = { x: number; y: number };

class Cell {
  coordinates: GridCoordinates;

  constructor(x: number, y: number) {
    this.coordinates = { x, y };
  }

  hasCoordinates(coordinates: GridCoordinates) {
    return (
      this.coordinates.x === coordinates.x &&
      this.coordinates.y === coordinates.y
    );
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
    return (
      (this.from.hasCoordinates(from) && this.to.hasCoordinates(to)) ||
      (this.from.hasCoordinates(to) && this.to.hasCoordinates(from))
    );
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
      throw new Error(
        `Couldn't find cell at x: ${coordinates.x}, y: ${coordinates.y}`
      );
    }

    return cell;
  }

  clearConnections() {
    this.connections = [];
  }
}

export default Grid;
