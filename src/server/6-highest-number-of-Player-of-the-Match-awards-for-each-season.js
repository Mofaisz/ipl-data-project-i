const fs = require("fs");
const csvToJson = require("../utils/csvtojson.js");
const matches = csvToJson("../data/matches.csv");
const deliveries = csvToJson("../data/deliveries.csv");

function highestPlayerOfTheMatchAwardsPerSeason() {
  const manOfTheMatchOfEveryYear = {};

  for (let value of matches) {
    //checks if year is assigned or not, if not assigns it 
    if (!manOfTheMatchOfEveryYear[value.season]) {
      manOfTheMatchOfEveryYear[value.season] = {};
    }
    //now checks if player is assigned or not if not assigns it 
    if (!manOfTheMatchOfEveryYear[value.season][value.player_of_match]) {
      manOfTheMatchOfEveryYear[value.season][value.player_of_match] = 0;
    }
    //if both is assigned and he got name as player of the match increment it by 1
    manOfTheMatchOfEveryYear[value.season][value.player_of_match] += 1;
  }
  // to print the highest number of time 
  const result = [];
  for (let year in manOfTheMatchOfEveryYear) {
    let players = manOfTheMatchOfEveryYear[year];
    let total = 0;
    let manOfTheMatch = null;
    for (let player in players) {
      if (players[player] > total) {
        total = players[player];
        manOfTheMatch = player;
      }
    }
    result.push({ Year: year, PlayerName: manOfTheMatch, total: total });
  }
  return result;
}
fs.writeFileSync("/home/faiz/ipl_data_project_1/src/public/output/6-highest-number-of-player-of-the-match-awards-per-season.json",
  JSON.stringify(highestPlayerOfTheMatchAwardsPerSeason())
);

