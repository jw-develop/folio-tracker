

export function simplifyCSV(arrays: string[][]) {
    let toReturn = "";
    arrays.forEach(array => {
      array.forEach(x => {
        toReturn += x + ",";
      })
      toReturn += "\n";
    });
    return toReturn;
  }