const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");
function strikeRateBatsmanEachSeason() {
  // 1. Group match IDs by season
  const yearAndId = {};
  for (let value of matches) {
    if (!yearAndId[value.season]) {
      yearAndId[value.season] = []; 
    }
    // Collect match IDs for the season
    yearAndId[value.season].push(value.id); 
  }

  // 2. Aggregate runs and balls for each batsman per season
  const resultObj = {};
  for (let year in yearAndId) {
    for (let element of deliveries) {
      for (let id of yearAndId[year]) {
        if (element.match_id == id) {
          // Check if the delivery belongs to the current match ID
          if (!resultObj[year]) {
            resultObj[year] = {}; // Initialize year object if not present
          }
          if (!resultObj[year][element.batsman]) {
            resultObj[year][element.batsman] = { runs: 0, balls: 0 }; // Initialize batsman data
          }

          // Update runs scored by the batsman
          resultObj[year][element.batsman].runs += Number(element.batsman_runs);

          // Update ball count only for valid deliveries (not wide or no-ball)
          if (element.wide_runs == 0 && element.noball_runs == 0) {
            resultObj[year][element.batsman].balls += 1;
          }
        }
      }
    }
  }

  // 3. Calculate strike rate for each batsman per season
  const realResult = {};
  for (let season in resultObj) {
    let players = resultObj[season];
    for (let player in players) {
      // Total runs scored by the batsman
      let runs = players[player].runs;
      // Total balls faced by the batsman
      let balls = players[player].balls;
      // calculate economy
      let strikeRate = (parseInt(runs) / parseInt(balls)) * 100;
      if (!realResult[season]) {
        realResult[season] = {}; // Initialize season object if not present
      }
      if (!realResult[season][player]) {
        realResult[season][player] = {}; // Initialize player data
      }
      // Store the calculated strike rate
      realResult[season][player] = { strikeRate: strikeRate };
    }
  }
  return realResult;
}

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/7-strike-rate-of-batsman-for-each-season.json",
  JSON.stringify(strikeRateBatsmanEachSeason())
);
