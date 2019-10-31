import sample from "utils/sample";

export type GridCoordinates = { x: number; y: number };

class Cell {
  coordinates: GridCoordinates;
  visited: boolean;

  constructor(x: number, y: number) {
    this.coordinates = { x, y };
    this.visited = false;
  }

  hasCoordinates(coordinates: GridCoordinates) {
    return (
      this.coordinates.x === coordinates.x &&
      this.coordinates.y === coordinates.y
    );
  }

  visit() {
    this.visited = true;
  }

  isVisited() {
    return this.visited;
  }

  clear() {
    this.visited = false;
  }
}

class Connection {
  from: Cell;
  to: Cell;

  constructor(from: Cell, to: Cell) {
    this.from = from;
    this.to = to;
  }

  includesCoordinates(coordinates: GridCoordinates): boolean {
    return (
      this.from.hasCoordinates(coordinates) ||
      this.to.hasCoordinates(coordinates)
    );
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

  clear() {
    this.connections = [];
    this.cells.forEach(cell => cell.clear());
  }

  neighbors(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    if (cell.coordinates.x > 0) {
      neighbors.add(
        this.cellAt({ x: cell.coordinates.x - 1, y: cell.coordinates.y })
      );
    }

    if (cell.coordinates.x < this.width - 1) {
      neighbors.add(
        this.cellAt({ x: cell.coordinates.x + 1, y: cell.coordinates.y })
      );
    }

    if (cell.coordinates.y > 0) {
      neighbors.add(
        this.cellAt({ x: cell.coordinates.x, y: cell.coordinates.y - 1 })
      );
    }

    if (cell.coordinates.y < this.height - 1) {
      neighbors.add(
        this.cellAt({ x: cell.coordinates.x, y: cell.coordinates.y + 1 })
      );
    }

    return neighbors;
  }

  connected(coordinates: GridCoordinates): Set<Cell> {
    const cells = this.connections
      .filter(connection => connection.includesCoordinates(coordinates))
      .flatMap(connection => [connection.from, connection.to]);

    return new Set(cells);
  }

  randomCell(): Cell {
    return sample(this.cells);
  }

  getSize(): number {
    return this.width * this.height;
  }

  allVisited(): boolean {
    return (
      this.cells.filter(cell => cell.isVisited()).length === this.getSize()
    );
  }

  notVisited(): Set<Cell> {
    return new Set(this.cells.filter(cell => !cell.isVisited()));
  }
}

export default Grid;
