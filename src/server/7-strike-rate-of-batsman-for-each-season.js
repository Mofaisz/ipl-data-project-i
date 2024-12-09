const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const { match } = require("assert");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");
function strikeRateBatsmanEachSeason() {
  // 1. Group match IDs by season
  const yearAndId = matches.reduce((accumulator, value) => {
    if (!accumulator[value.season]) {
      accumulator[value.season] = [];
    }
    // Collect match IDs for the season
    accumulator[value.season].push(value.id);
    return accumulator;
  }, {});

  // 2. Aggregate runs and balls for each batsman per season
  const resultObj = Object.keys(yearAndId).reduce((accumulator, year) => {
    deliveries.forEach((element) => {
      id = yearAndId[year];
      id.forEach((val) => {
        if (element.match_id == val) {
          if (!accumulator[year]) {
            // Initialize year object if not present
            accumulator[year] = {};
          }
          if (!accumulator[year][element.batsman]) {
            // Initialize batsman data
            accumulator[year][element.batsman] = { runs: 0, balls: 0 };
          }
          // Update runs scored by the batsman
          accumulator[year][element.batsman].runs += Number(
            element.batsman_runs
          );
          // Update ball count only for valid deliveries (not wide or no-ball)
          if (element.wide_runs == 0 && element.noball_runs == 0) {
            accumulator[year][element.batsman].balls += 1;
          }
        }
      });
    });
    return accumulator;
  }, {});

  //calculate strike rate of batsman
  const realResult = Object.keys(resultObj).reduce((accumulator, year) => {
    let players = resultObj[year];
    Object.keys(players).forEach((player) => {
      // Total runs scored by the batsman
      let runs = players[player].runs;
      // Total balls faced by the batsman
      let balls = players[player].balls;
      let strikeRate = (parseInt(runs) / parseInt(balls)) * 100;
      // Initialize season object if not present
      if (!accumulator[year]) {
        accumulator[year] = {};
      }
      // Initialize player data
      if (!accumulator[year][player]) {
        accumulator[year][player] = {};
      }
      // Store the calculated strike rate
      accumulator[year][player] = { strikeRate: strikeRate };
    });
    return accumulator;
  }, {});

  return realResult;
}

// console.log(strikeRateBatsmanEachSeason());

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/7-strike-rate-of-batsman-for-each-season.json",
  JSON.stringify(strikeRateBatsmanEachSeason())
);
