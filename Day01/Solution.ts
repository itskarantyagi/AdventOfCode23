import { calibrationData } from "./data";

// Part 1
function Solution(calibrationData: string): number {
  let totalCalibration: number = 0;
  calibrationData.split("\n").forEach((calibrationLine) => {
    const numericRegex: RegExp = /\d/g;
    const digitsInString = calibrationLine.match(numericRegex);
    totalCalibration += digitsInString
      ? parseInt(digitsInString[0] + digitsInString[digitsInString.length - 1])
      : 0;
  });

  return totalCalibration;
}

// console.log(Solution(calibrationData));

function findDigitInString(input: string): { number: string; index: number }[] {
  const numericRegex: RegExp = /\d/g;
  let match;
  const digits: { number: string; index: number }[] = [];
  while ((match = numericRegex.exec(input)) !== null) {
    digits.push({ number: match[0], index: match.index });
  }
  return digits;
}

function findStringNumberInString(
  input: string
): { number: string; index: number }[] {
  const numberLookupMap: { [key: string]: string } = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const wordsToCheck: string[] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];

  const indices: { number: string; index: number }[] = [];

  wordsToCheck.forEach((stringNumber) => {
    let index = input.indexOf(stringNumber);
    while (index !== -1) {
      indices.push({ number: numberLookupMap[stringNumber], index });
      index = input.indexOf(stringNumber, index + 1);
    }
  });

  return indices;
}

function Solution2(calibrationData: string): number {
  let totalCalibration: number = 0;
  calibrationData.split("\n").forEach((calibrationLine) => {
    const findDigitInStringAns = findDigitInString(calibrationLine);
    const findStringNumberInStringAns =
      findStringNumberInString(calibrationLine);
    const mergedResults = [
      ...findDigitInStringAns,
      ...findStringNumberInStringAns,
    ].sort((a, b) => a.index - b.index);
    const numberOnlyResult = mergedResults.map((item) => item.number);
    console.log(
      parseInt(
        numberOnlyResult[0] + numberOnlyResult[numberOnlyResult.length - 1]
      )
    );
    totalCalibration += parseInt(
      numberOnlyResult[0] + numberOnlyResult[numberOnlyResult.length - 1]
    );
  });
  return totalCalibration;
}

console.log(Solution2(calibrationData));
