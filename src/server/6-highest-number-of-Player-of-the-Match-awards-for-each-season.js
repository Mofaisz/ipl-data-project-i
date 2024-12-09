const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function highestPlayerOfTheMatchAwardsPerSeason() {
  const manOfTheMatchOfEveryYear = matches.reduce((accumulator, value) => {
    //checks if year is assigned or not, if not assigns it
    if (!accumulator[value.season]) {
      accumulator[value.season] = {};
    }
    //now checks if player is assigned or not if not assigns it
    if (!accumulator[value.season][value.player_of_match]) {
      accumulator[value.season][value.player_of_match] = 0;
    }
    //if both is assigned and he got name as player of the match increment it by 1
    accumulator[value.season][value.player_of_match] += 1;
    return accumulator;
  }, {});

  // to print the highest number of time
  const result = Object.keys(manOfTheMatchOfEveryYear).reduce((accu, year) => {
    let players = manOfTheMatchOfEveryYear[year];
    let count = 0;
    let manOfTheMatch = null;

    Object.keys(players).forEach((player) => {
      if (players[player] > count) {
        count = players[player];
        manOfTheMatch = player;
      }
    });
    accu.push({ year: year, Player_Name: manOfTheMatch, Total: count });
    // returns the accumulator
    return accu;
  }, []);
  return result;
}

// console.log(highestPlayerOfTheMatchAwardsPerSeason());

fs.writeFileSync("/home/faiz/ipl_data_project_1/src/public/output/6-highest-number-of-player-of-the-match-awards-per-season.json",
  JSON.stringify(highestPlayerOfTheMatchAwardsPerSeason())
);
