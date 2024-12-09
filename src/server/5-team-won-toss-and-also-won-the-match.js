const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function teamWonTossAndWonMatchesAlso() {
  const tossWinnerAndMatches = matches.reduce((accumulator, value) => {
    // checks if team won both toss and match
    if (value.toss_winner === value.winner) {
      // if it is create a key of name of team and assign 0
      if (!accumulator[value.toss_winner]) {
        accumulator[value.toss_winner] = 0;
      }
      // if teams comes again and again increment it by 1
      accumulator[value.toss_winner] += 1;
    }
    // returns the accumulator
    return accumulator;
  }, {});
  return tossWinnerAndMatches;
}

// console.log(teamWonTossAndWonMatchesAlso());

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/5-team-won-toss-and-also-won-the-match.json",
  JSON.stringify(teamWonTossAndWonMatchesAlso())
);
