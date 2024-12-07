const fs = require("fs");
// will change csv file to json
const csvToJson = require("../utils/csvtojson.js");
// passing path of matches.csv file as parameter to csvTOJson
const matches = csvToJson("../data/matches.csv");
// passing path of matches.csv file as parameter to csvTOJson
const deliveries = csvToJson("../data/deliveries.csv");

function extraRunsConcededPerTeam2016() {
  const id2016 = [];
  for (let value of matches) {
    // here 2016 is string so treat them as string
    if (value.season === "2016") {
      id2016.push(value.id);
    }
  }

  // creates an empty object 
  const result = {};
  for (let id of id2016) {
    for (let elements of deliveries) {
        //checks if both the ids matches
      if (id == elements.match_id) {
        if (!result[elements.bowling_team]) {
          result[elements.bowling_team] = 0;
        }
        result[elements.bowling_team] += Number(elements.extra_runs);
      }
    }
  }
  return result;
}

// Converting js file into json file and creating a write file as output of the solution
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/3-extra-runs-conceded-per-team-2016.json",
  JSON.stringify(extraRunsConcededPerTeam2016())
);
