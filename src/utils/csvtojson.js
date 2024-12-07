const fs = require("fs");

function csvToJson(filePath) {
  const dataFromFile = fs.readFileSync(filePath, "utf-8");

  const arrayOflines = dataFromFile.split("\n");

  const keysOfArray = arrayOflines[0].split(",");

  const valuesOfArray = arrayOflines.slice(1);

  const splittedValuesOfArrays = [];

  for (let index = 0; index < valuesOfArray.length; index++) {
    let temp = valuesOfArray[index].split(",");

    splittedValuesOfArrays.push(temp);
  }

  let output = [];

  for (let valueIdx = 0; valueIdx < splittedValuesOfArrays.length; valueIdx++) {
    let nobj = {};

    for (let keyIdx = 0; keyIdx < keysOfArray.length; keyIdx++) {
      nobj[keysOfArray[keyIdx]] = splittedValuesOfArrays[valueIdx][keyIdx];
    }

    output.push(nobj);
  }
  output.pop();
  return output;
}

module.exports = csvToJson;
