const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");

function matchesPerYear() {
  const result = matches.reduce((accumulator, value) => {
    if (!accumulator[value.season]) {
      //checks if season is addes ak key or not
      accumulator[value.season] = 0;
    }
    // Increase the season by 1
    accumulator[value.season] += 1;

    //returns the accumulator
    return accumulator;
  }, {});

  return result;
}

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/1-matches-per-year.json",
  JSON.stringify(matchesPerYear())
);
