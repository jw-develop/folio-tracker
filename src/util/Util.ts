

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