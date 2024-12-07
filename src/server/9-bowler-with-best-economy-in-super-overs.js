const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function bowlerWithBestEconomy() {
  // Object to store runs and balls for each bowler
  const bowlerNameRunsAndBalls = {};

  // 1. Aggregate runs conceded and balls bowled for each bowler during super overs
  for (let value of deliveries) {
    // Consider only deliveries in super overs
    if (value.is_super_over !== "0") {
      if (!bowlerNameRunsAndBalls[value.bowler]) {
        bowlerNameRunsAndBalls[value.bowler] = { runs: 0, balls: 0 }; // Initialize bowler data
      }

      // Update runs conceded by subtracting extras (byes, leg byes, penalties)
      bowlerNameRunsAndBalls[value.bowler].runs +=
        Number(value.total_runs) -
        Number(value.bye_runs) -
        Number(value.legbye_runs) -
        Number(value.penalty_runs);

      // Increment balls bowled only for valid deliveries (not wide or no-ball)
      if (value.noball_runs == "0" && value.wide_runs == "0") {
        bowlerNameRunsAndBalls[value.bowler].balls += 1;
      }
    }
  }

  // 2. Calculate economy rate for each bowler
  const result = {};
  for (let bowler in bowlerNameRunsAndBalls) {
    let runs = parseInt(bowlerNameRunsAndBalls[bowler].runs); // Total runs conceded
    let balls = parseInt(bowlerNameRunsAndBalls[bowler].balls); // Total balls bowled
    let over = balls / 6; // Calculate overs bowled
    let economy = runs / over; // Economy rate calculation

    if (!result[bowler]) {
      // Initialize economy data
      result[bowler] = { economy: 0 }; // Initialize economy data
    }
    // Store economy rate
    result[bowler].economy = economy;
  }

  // 3. Find the bowler with the best (lowest) economy rate
  let bowlerName = null;
  // Start with a high economy value since no one can acheive this much economy and make it easy to compare
  let economy = 100;

  for (let bowler in result) {
    // Check for the lowest economy
    if (result[bowler].economy < economy) {
      economy = result[bowler].economy; // update econonmy
      bowlerName = bowler; // Update bowler with the best economy
    }
  }

  // Return the bowler with the best economy rate
  return { bowler: bowlerName, economy: economy };
}

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/9-bowler-with-the-best-economy-in-super-over.json",
  JSON.stringify(bowlerWithBestEconomy())
);
