import { gameData } from "./data";
type returnType = boolean;
// const gameData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
// Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
// Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
// Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
// Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
function helper(OneDayGames: string): returnType {
  const thresholds: { [key: string]: number } = {
    red: 12,
    blue: 14,
    green: 13,
  };
  const regexPattern = /(\d+)\s*(red|blue|green)/;
  //   const totalCollection: { [key: string]: number } = {
  //     red: 0,
  //     blue: 0,
  //     green: 0,
  //   };
  let breakoutOuter: boolean = false;
  OneDayGames.split(";").forEach((singleGame) => {
    let breakout: boolean = false;

    singleGame.split(",").forEach((singleBall) => {
      const match: any = singleBall.match(regexPattern);
      if (thresholds[match[2]] < parseInt(match[1])) {
        console.log(match[2], match[1], thresholds[match[2]]);
        breakout = true;
        return false;
      }
    });
    if (breakout) {
      breakoutOuter = true;
      return false;
    }
  });
  if (!breakoutOuter) {
    return true;
  }
  return false;
  return true;
}

function secondSolution(OneDayGames: string): number {
  let total = 1;
  const newThresholds: { [key: string]: number } = {
    red: -1,
    blue: -1,
    green: -1,
  };
  const regexPattern = /(\d+)\s*(red|blue|green)/;
  OneDayGames.split(";").forEach((singleGame) => {
    singleGame.split(",").forEach((singleBall) => {
      const match: any = singleBall.match(regexPattern);
      newThresholds[match[2]] = Math.max(
        parseInt(match[1]),
        newThresholds[match[2]]
      );
    });
  });
  const keys = Object.keys(newThresholds);
  console.log(newThresholds);
  keys.forEach((key) => {
    if (newThresholds[key] != -1) {
      total = total * newThresholds[key];
    }
  });
  return total;
}

let ans: number = 0;
// let count: number = 0;
gameData.split("\n").forEach((item) => {
  const daySplit: string[] = item.split(":");
  // part 1
  //   const res = helper(daySplit[1]);
  //   if (daySplit[1] && res) {
  //     count += 1;
  //     const regexPattern = /Game (\d+)/;
  //     const regexMatch = daySplit[0].match(regexPattern);
  //     if (regexMatch) {
  //       console.log(regexMatch);
  //       ans += parseInt(regexMatch[1]);
  //     }
  //   }

  // part 2
  console.log(secondSolution(daySplit[1]));
  ans += secondSolution(daySplit[1]);
});
console.log(ans);
