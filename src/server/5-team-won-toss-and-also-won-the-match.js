const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function teamWonTossAndWonMatchesAlso() {
  let tossWinnerAndMatches = {};
  for (let value of matches) {
    // checks if team won both toss and match
    if (value.toss_winner == value.winner) {
      // if it is create a key of name of team and assign 0
      if (!tossWinnerAndMatches[value.winner]) {
        tossWinnerAndMatches[value.winner] = 0;
      }
      // if teams comes again and again increment it by 1
      tossWinnerAndMatches[value.winner] += 1;
    }
  }
  return tossWinnerAndMatches;
}

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/5-team-won-toss-and-also-won-the-match.json",
  JSON.stringify(teamWonTossAndWonMatchesAlso())
);
