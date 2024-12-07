const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function highestNumberOfTimeOnePlayerDismisedByAnotherPlayer() {
  // Object to store dismissal data for each batsman against each bowler
  const batsmanAndBowler = {}; 

  // 1. Aggregate dismissal data from deliveries
  for (let element of deliveries) {
    // Check if a player was dismissed in the delivery
    if (element.player_dismissed) { 
      if (!batsmanAndBowler[element.player_dismissed]) {
        // Initialize object for the dismissed batsman
        batsmanAndBowler[element.player_dismissed] = {}; 
      }

      if (!batsmanAndBowler[element.player_dismissed][element.bowler]) {
        // Initialize count for the bowler
        batsmanAndBowler[element.player_dismissed][element.bowler] = 0; 
      }
       // Increment dismissal count
      batsmanAndBowler[element.player_dismissed][element.bowler] += 1;
    }
  }

  // 2. Find the bowler with the highest dismissals for each batsman
  let result = {};
  for (let batsman in batsmanAndBowler) {
    let bowlers = batsmanAndBowler[batsman];
    let new_bowler = null;
    let count = 0;

    for (let bowler in bowlers) {
      // Check for the bowler with the highest dismissals
      if (bowlers[bowler] > count) { 
        // if found uodate the bowler and count
        count = bowlers[bowler];
        new_bowler = bowler;
      }
    }

    if (!result[batsman]) {
      result[batsman] = {}; // Initialize result for the batsman
    }
    result[batsman] = { bowler: new_bowler, count: count }; // Store the bowler with the highest dismissals and the count
  }

  // 3. Find the batsman-bowler pair with the highest number of dismissals
  let total = 0;
  let batsmanName = null;
  let bowlerName = null;

  for (let outBatsman in result) {
    let keyBowlersAndCount = result[outBatsman];
    if (keyBowlersAndCount.count > total) { // Check for the highest dismissal count
      total = keyBowlersAndCount.count;
      batsmanName = outBatsman;
      bowlerName = keyBowlersAndCount.bowler;
    }
  }

  // Return the pair with the highest dismissals
  return { batsman: batsmanName, bowler: bowlerName, count: total };
}



// console.log(highestNumberOfTimeOnePlayerDismisedByAnotherPlayer())
fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/8-highest-number-of-times-one-player-dismissed-by-another-player.json",
  JSON.stringify(highestNumberOfTimeOnePlayerDismisedByAnotherPlayer())
);
