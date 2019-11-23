import sample from "utils/sample";
import Mask from "lib/mask";

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
    this.buildCells();
  }

  private buildCells() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.cells.push(new Cell(x, y));
      }
    }
  }

  connect(from: GridCoordinates, to: GridCoordinates) {
    const fromCell = this.cellAt(from);
    const toCell = this.cellAt(to);

    if (fromCell && toCell && !this.hasConnection(from, to)) {
      this.connections.push(new Connection(fromCell, toCell));
    }
  }

  hasConnection(from: GridCoordinates, to: GridCoordinates): boolean {
    return this.connections.some(connection => connection.matches(from, to));
  }

  protected cellAt(coordinates: GridCoordinates): Cell | undefined {
    if (
      coordinates.x < 0 ||
      coordinates.x >= this.width ||
      coordinates.y < 0 ||
      coordinates.x >= this.height
    ) {
      return;
    }

    const cell = this.cells[coordinates.y * this.width + coordinates.x];
    return cell;
  }

  clear() {
    this.connections = [];
    this.cells.forEach(cell => cell.clear());
  }

  neighbors(cell: Cell): Set<Cell> {
    const neighbors = new Set<Cell>();

    const westNeighbor = this.cellAt({
      x: cell.coordinates.x - 1,
      y: cell.coordinates.y
    });
    if (westNeighbor) {
      neighbors.add(westNeighbor);
    }

    const eastNeighbor = this.cellAt({
      x: cell.coordinates.x + 1,
      y: cell.coordinates.y
    });
    if (eastNeighbor) {
      neighbors.add(eastNeighbor);
    }

    const northNeighbor = this.cellAt({
      x: cell.coordinates.x,
      y: cell.coordinates.y - 1
    });
    if (northNeighbor) {
      neighbors.add(northNeighbor);
    }

    const southNeighbor = this.cellAt({
      x: cell.coordinates.x,
      y: cell.coordinates.y + 1
    });
    if (southNeighbor) {
      neighbors.add(southNeighbor);
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

  orderedCellsBottomLeftTopRight(): Array<Cell> {
    const cells = [];

    for (let y = 0; y <= this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.cellAt({ x, y });

        if (cell) {
          cells.push(cell);
        }
      }
    }

    return cells;
  }

  orderedCellsTopLeftBottomRight(): Array<Cell> {
    const cells = [];

    for (let y = this.height - 1; y >= 0; y--) {
      for (let x = 0; x < this.width; x++) {
        const cell = this.cellAt({ x, y });

        if (cell) {
          cells.push(cell);
        }
      }
    }

    return cells;
  }

  allVisited(): boolean {
    return (
      this.cells.filter(cell => cell.isVisited()).length === this.getSize()
    );
  }

  notVisited(): Set<Cell> {
    return new Set(this.cells.filter(cell => !cell.isVisited()));
  }

  visitedNeighbors(cell: Cell): Set<Cell> {
    return new Set(
      Array.from(this.neighbors(cell)).filter(cell => cell.isVisited())
    );
  }

  notVisitedNeighbors(cell: Cell): Set<Cell> {
    return new Set(
      Array.from(this.neighbors(cell)).filter(cell => !cell.isVisited())
    );
  }
}

export default Grid;

export type GridCoordinates = { x: number; y: number };

class MaskedGrid extends Grid {
  readonly mask: Mask;

  constructor(mask: Mask) {
    super(mask.width, mask.height);
    this.mask = mask;
    this.removeMaskedCells();
  }

  private removeMaskedCells() {
    this.cells = this.cells.filter(cell =>
      this.mask.enabled(cell.coordinates.x, cell.coordinates.y)
    );
  }

  getSize(): number {
    return this.mask.getSize();
  }

  protected cellAt(coordinates: GridCoordinates): Cell | undefined {
    return this.cells.find(
      cell =>
        cell.coordinates.x === coordinates.x &&
        cell.coordinates.y === coordinates.y
    );
  }
}

export { MaskedGrid };

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
