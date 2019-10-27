export default function(n: number, callback: (i: number) => any) {
  return new Array(n).fill(undefined).map((_, i) => callback(i));
}
