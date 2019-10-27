export default function<T>(n: number, callback: (i: number) => T): Array<T> {
  return new Array(n).fill(undefined).map((_, i) => callback(i));
}
