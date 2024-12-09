const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function bowlerWithBestEconomy() {
  // 1. Aggregate runs conceded and balls bowled for each bowler during super overs
  const bowlerNameRunsAndBalls = deliveries.reduce((accumulator, value) => {
    // Consider only deliveries in super overs
    if (value.is_super_over !== "0") {
      if (!accumulator[value.bowler]) {
        accumulator[value.bowler] = { runs: 0, balls: 0 };
      }
      // Update runs conceded by subtracting extras (byes, leg byes, penalties)
      accumulator[value.bowler].runs +=
        Number(value.total_runs) -
        Number(value.bye_runs) -
        Number(value.legbye_runs) -
        Number(value.penalty_runs);

      // Increment balls bowled only for valid deliveries (not wide or no-ball)
      if (value.noball_runs == "0" && value.wide_runs == "0") {
        accumulator[value.bowler].balls += 1;
      }
    }

    return accumulator;
  }, {});

  // 2. Calculate economy rate for each bowler
  const result = Object.keys(bowlerNameRunsAndBalls).reduce(
    (accumulator, bowler) => {
      // Total runs conceded
      let runs = parseInt(bowlerNameRunsAndBalls[bowler].runs);
      // Total balls bowled
      let balls = parseInt(bowlerNameRunsAndBalls[bowler].balls);
      // Calculate overs bowled
      let over = balls / 6;
      // Economy rate calculation
      let economy = runs / over;

      if (!accumulator[bowler]) {
        // Initialize economy data
        accumulator[bowler] = { economy: 0 }; // Initialize economy data
      }
      // Store economy rate
      accumulator[bowler].economy = economy;

      return accumulator;
    },
    {}
  );

  // 3. To find the bowler with the best (lowest) economy rate
  let bowlerName = null;
  // Start with a high economy value since no one can acheive this much economy and make it easy to compare
  let economy = 100;

  Object.keys(result).forEach((bowler) => {
    if (result[bowler].economy < economy) {
      // update econonmy
      economy = result[bowler].economy;
      // Update bowler with the best economy
      bowlerName = bowler;
    }
  });

  // Return the bowler with the best economy rate
  return { bowler: bowlerName, economy: economy };
}

// console.log(bowlerWithBestEconomy());

fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/9-bowler-with-the-best-economy-in-super-over.json",
  JSON.stringify(bowlerWithBestEconomy())
);
