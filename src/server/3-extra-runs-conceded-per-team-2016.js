const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of matches.csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");
// passing path of matches.csv file as parameter to csvTOJson
const deliveries = csvToJson("../data/deliveries.csv");

function extraRunsConcededPerTeam2016() {
  // storing Ids of matches which was played in the year 2016
  const id2016 = matches
    .filter((val) => {
      return val.season === "2016";
    })
    .map((value) => {
      return value.id;
    });

  const result = id2016.reduce((accumulator, value) => {
    deliveries.forEach((element) => {
      //checks if both the ids matches
      if (value == element.match_id) {
        if (!accumulator[element.bowling_team]) {
          accumulator[element.bowling_team] = 0;
        }
        // increment the extra runs to the bowling team
        accumulator[element.bowling_team] += Number(element.extra_runs);
      }
    });
    // returns accumulator
    return accumulator;
  }, {});

  return result;
}

// console.log(extraRunsConcededPerTeam2016());

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/3-extra-runs-conceded-per-team-2016.json",
  JSON.stringify(extraRunsConcededPerTeam2016())
);
