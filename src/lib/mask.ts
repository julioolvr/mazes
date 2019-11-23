import identity from "utils/identity";

type BooleanMatrix = Array<Array<boolean>>;

class Mask {
  mask: BooleanMatrix;

  constructor(mask: BooleanMatrix) {
    this.mask = mask;
  }

  get width() {
    return this.mask.length;
  }

  get height() {
    return this.mask[0].length;
  }

  getSize(): number {
    return this.mask.reduce(
      (total, row) => total + row.filter(identity).length,
      0
    );
  }

  enabled(x: number, y: number): boolean {
    return this.mask[x][y];
  }
}

export default Mask;
