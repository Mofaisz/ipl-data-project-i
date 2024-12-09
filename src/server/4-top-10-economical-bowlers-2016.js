const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

// 1. Extract match IDs for the 2015 season
function top10EconomicalBowlersYear2015() {
  // To store match IDs for 2015 season
  const idOf2015 = matches
    .filter((val) => {
      return val.season === "2015";
    })
    .map((value) => {
      return value.id;
    });

  // Aggregate bowler data based on deliveries in 2015 matches
  let bowlerData = idOf2015.reduce((accumulator, value) => {
    deliveries.forEach((element) => {
      // checks if both the id is matching or not
      if (element.match_id == value) {
        //  to store key as bowler
        if (!accumulator[element.bowler]) {
          accumulator[element.bowler] = { runs: 0, balls: 0 };
        }
        // if key as bowler is added if it is increment the runs
        accumulator[element.bowler].runs += Number(element.total_runs);
        // checks if ball is valid or not if it is increment by 1
        if (
          Number(element.wide_runs) === 0 &&
          Number(element.noball_runs) == 0
        ) {
          accumulator[element.bowler].balls += 1;
        }
      }
    });
    // returns the accumulator
    return accumulator;
  }, {});

  // Calculate the economy for each bowler
  const economyOfBowler = Object.keys(bowlerData).reduce((accu, bowler) => {
    const runs = bowlerData[bowler].runs;
    const balls = bowlerData[bowler].balls;
    const overs = balls / 6;
    const economy = parseFloat(runs) / parseFloat(overs);
    // Store bowler name and economy rate
    accu.push({ bowler: bowler, economy: economy });
    return accu;
  }, []);

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
