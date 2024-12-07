const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of matches.csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");
// passing path of matches.csv file as parameter to csvTOJson
const deliveries = csvToJson("../data/deliveries.csv");

//Number of matches won per team per year in IPL.
function matchesWonPerTeamPerYear() {
  //Creates an empty object
  const result = {};
  // Iterating over the value of matches
  for (let value of matches) {
    // checks if team is initialized or not
    if (!result[value.winner]) {
      // if it is not initialise with empty object
      result[value.winner] = {};
    }
    // checks if year is created as key or not if not create it
    if (!result[value.winner][value.season]) {
      result[value.winner][value.season] = 0;
    }
    result[value.winner][value.season] += 1;
  }
  // return the result
  return result;
}

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/2-matches-won-per-team-per-year.json",
  JSON.stringify(matchesWonPerTeamPerYear())
);
