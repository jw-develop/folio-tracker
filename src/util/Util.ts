

export function simplifyCSV(headers: string[],arrays: string[][]) {
  let toReturn = "";
  headers.forEach(h => {
    toReturn += h + ",";
  })
  toReturn += "\n";
  arrays.forEach(array => {
    array.forEach(x => {
      toReturn += x + ",";
    })
    toReturn += "\n";
  });
  return toReturn;
}

export function capTier(cap: number) {
  if (cap > 85000000000) return 0;
  else if (cap > 10000000000) return 1;
  else if (cap > 2000000000) return 2;
  else return 3;
}