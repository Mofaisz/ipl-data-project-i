const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");

function matchesPerYear() {
  // Initializes an empty object with name result
  const result = {};
  // Iterates the value of matches
  for (let values of matches) {
    if (!result[values.season]) {
      result[values.season] = 0;
    }
    // Increase the season by 1
    result[values.season] += 1;
  }
  return result;
}

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/1-matches-per-year.json",
  JSON.stringify(matchesPerYear())
);
