const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function highestNumberOfTimeOnePlayerDismisedByAnotherPlayer() {
  const batsmanAndBowler = deliveries.reduce((accumulator, value) => {
    // Check if a player was dismissed in the delivery
    if (value.player_dismissed != "") {
      if (!accumulator[value.player_dismissed]) {
        // Initialize object for the dismissed batsman
        accumulator[value.player_dismissed] = {};
      }
      if (!accumulator[value.player_dismissed][value.bowler]) {
        // Initialize count for the bowler
        accumulator[value.player_dismissed][value.bowler] = 0;
      }
      // Increment dismissal count
      accumulator[value.player_dismissed][value.bowler] += 1;
    }
    return accumulator;
  });

  // Find the bowler with the highest dismissals for each batsman
  let result = Object.keys(batsmanAndBowler).reduce((accumulator, batsman) => {
    let bowlers = batsmanAndBowler[batsman];
    let new_bowler = null;
    let count = 0;
    Object.keys(bowlers).forEach((bowler) => {
      // Check for the bowler with the highest dismissals
      if (bowlers[bowler] > count) {
        // update if found
        count = bowlers[bowler];
        new_bowler = bowler;
      }
    });
    // Initialize result for the batsman
    if (!accumulator[batsman]) {
      accumulator[batsman] = {};
    }
    // Store the bowler with the highest dismissals and the count
    accumulator[batsman] = { Bowler: new_bowler, count: count };
    return accumulator;
  }, {});

  // 3. Find the batsman-bowler pair with the highest number of dismissals

  let total = 0;
  let batsmanName = null;
  let bowlerName = null;
  Object.keys(result).forEach((outBatsman) => {
    // Check for the highest dismissal count
    if (result[outBatsman].count > total) {
      // update if found
      batsmanName = outBatsman;
      bowlerName = result[outBatsman].Bowler;
      total = result[outBatsman].count;
    }
  });

  //   // Return the pair with the highest dismissals
  return { batsman: batsmanName, bowler: bowlerName, count: total };
  //
}

// console.log(highestNumberOfTimeOnePlayerDismisedByAnotherPlayer());

console.log(highestNumberOfTimeOnePlayerDismisedByAnotherPlayer());
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/8-highest-number-of-times-one-player-dismissed-by-another-player.json",
  JSON.stringify(highestNumberOfTimeOnePlayerDismisedByAnotherPlayer())
);
