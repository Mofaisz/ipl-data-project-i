const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of matches.csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");
// passing path of matches.csv file as parameter to csvTOJson
const deliveries = csvToJson("../data/deliveries.csv");

//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear() {
  const result = matches.reduce((accumulator, value) => {
    // checks if season is added as key or not
    if (!accumulator[value.season]) {
      // if not add season as key and create an empty object
      accumulator[value.season] = {};
    }
    // checks again if winning team is added as key for season or not
    if (!accumulator[value.season][value.winner]) {
      accumulator[value.season][value.winner] = 0;
    }
    // if winner is found increment by 1
    accumulator[value.season][value.winner] += 1;
    // returns accumulator
    return accumulator;
  }, {});
  return result;
}

console.log(matchesWonPerTeamPerYear());

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/2-matches-won-per-team-per-year.json",
  JSON.stringify(matchesWonPerTeamPerYear())
);
