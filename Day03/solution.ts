import { engineSchematic } from "./data";
// const engineSchematic = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

type Coordinate = [number, number];
const seen: Set<Coordinate> = new Set();

function convert2D(input: string): string[][] {
  const rows = input
    .trim()
    .split("\n")
    .map((row) => row.trim());
  const res = rows.map((row) => row.split("").map((element) => element.trim()));
  return res;
}

// function below will return the number
function getCompleteNumber(r: number, c: number): number {
  let NumberAsString: string = ans[r][c];
  // go left
  //   console.log("before going left", NumberAsString, "r ", r, "c ", c);
  for (let co = c - 1; co > -1; co--) {
    if (!isNaN(parseInt(ans[r][co]))) {
      seen.add([r, co]);
      NumberAsString = ans[r][co] + NumberAsString;
    } else {
      break;
    }
  }
  //   console.log("after going left", NumberAsString);
  // go right
  //   console.log("before going right", NumberAsString);
  for (let co = c + 1; co < columns; co++) {
    if (!isNaN(parseInt(ans[r][co]))) {
      NumberAsString = NumberAsString + ans[r][co];
      seen.add([r, co]);
    } else {
      break;
    }
  }
  //   console.log(NumberAsString, "$%^$%^");
  return parseInt(NumberAsString);
}

function coordinatesTraversedBefore(r: number, c: number): boolean {
  const coordinatesExist = Array.from(seen).some(
    (coord) => coord[0] === r && coord[1] === c
  );
  return !coordinatesExist;
}

function lookIn8Directions(row: number, col: number): [boolean, number] {
  let sum: number = 0;
  const arrNumbers: number[] = [];
  const directions: number[][] = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  for (const [r, c] of directions) {
    const nr: number = row + r;
    const nc: number = col + c;
    // check if a number exists at this position
    if (
      nr >= 0 &&
      nc >= 0 &&
      nc < columns &&
      nr < rows &&
      coordinatesTraversedBefore(nr, nc) &&
      !isNaN(parseInt(ans[nr][nc]))
    ) {
      //   console.log(seen);
      // part 1
      //   sum += getCompleteNumber(nr, nc);

      // part 2
      arrNumbers.push(getCompleteNumber(nr, nc));
    }
  }
  if (arrNumbers.length == 2) {
    sum += arrNumbers[0] * arrNumbers[1];
    return [true, sum];
  }
  return [false, sum];

  // part 1
  // return sum
}

// get 2D array
const ans = convert2D(engineSchematic);
const rows: number = ans.length,
  columns: number = ans[0].length;
// nested for loop
let total: number = 0;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < columns; c++) {
    // part 1
    // check if not "." and not a number THEN look in 8Directions
    // if (ans[r][c] != "." && isNaN(parseInt(ans[r][c]))) {
    //   // checks if the current val is a symbol
    //   total += lookIn8Directions(r, c);
    // }

    // part 2
    if (ans[r][c] == "*") {
      const tempAns = lookIn8Directions(r, c);
      if (tempAns[0]) {
        total += tempAns[1];
      }
    }
  }
}

// console.log(ans.length, ans[0].length);
console.log(total);
// engineSchematic.split("\n").forEach((singleLine) => {
//   console.log(singleLine);
// });
// seen.add([100, 100]);
// console.log(seen, seen.has([100, 100]));

// part 2
