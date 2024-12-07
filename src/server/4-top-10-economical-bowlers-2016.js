const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

// 1. Extract match IDs for the 2015 season
function top10EconomicalBowlersYear2015() {
  // Array to store match IDs for 2015 season
  const idOf2015 = [];
  for (let value of matches) {
    if (value.season == "2015") {
      // Check if the season is 2015
      idOf2015.push(value.id);
    }
  }

  // 2. Aggregate bowler data based on deliveries in 2015 matches
  let bowlerData = {};
  for (let id of idOf2015) {
    // Iterate through match IDs for 2015
    for (let element of deliveries) {
      // Iterate through deliveries
      if (element.match_id == id) {
        // Check if the delivery belongs to the current match
        const isValidBall =
          Number(element.wide_runs) === 0 && Number(element.noball_runs) == 0; // Determine if the ball is valid (not wide or no-ball)
        if (!bowlerData[element.bowler]) {
          // Initialize bowler data if not present
          bowlerData[element.bowler] = { runs: 0, balls: 0 };
        }
        bowlerData[element.bowler].runs += Number(element.total_runs);
        if (isValidBall) {
          // Increment ball count for valid deliveries
          bowlerData[element.bowler].balls += 1;
        }
      }
    }
  }

  // 3. Calculate the economy for each bowler
  const economyOfBowler = [];
  for (let bowler in bowlerData) {
    const runs = bowlerData[bowler].runs; // Total runs conceded by the bowler
    const bowls = bowlerData[bowler].balls; // Total balls bowled
    const overs = bowls / 6; // Convert balls to overs
    let economy = parseFloat(runs) / parseFloat(overs);
    // Store bowler name and economy rate
    economyOfBowler.push({ bowler: bowler, economy: economy }); 
  }

  // 4. Sort bowlers by economy in ascending order
  economyOfBowler.sort((a, b) => a.economy - b.economy);

  // 5. Get the top 10 economical bowlers
  const top10 = economyOfBowler.slice(0, 10); // Extract the top 10 bowlers
  return top10; // Return the top 10 economical bowlers
}
// console.log(top10EconomicalBowlersYear2015());


fs.writeFileSync(
  "/home/faiz/ipl_data_project_1/src/public/output/4-top-10-economical-bowlers-2016.json",
  JSON.stringify(top10EconomicalBowlersYear2015()) // Save top 10 economical bowlers to file
);
