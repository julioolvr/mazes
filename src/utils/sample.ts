function sample<T>(arrayLike: Set<T>): T;
function sample<T>(arrayLike: ArrayLike<T>): T;
function sample<T>(arrayLike: ArrayLike<T> | Set<T>): T {
  const arr = Array.from(arrayLike);
  return arr[Math.floor(Math.random() * arr.length)];
}

export default sample;
