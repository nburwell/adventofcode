fs = require('fs')
const INPUT_FILE = 'input/day01.in'

fs.readFile(INPUT_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  part1(data);
  part2(data);
});

function part1(data) {
  let frequency = 0;
  data.split("\n").forEach(function(line) {
    let diff = changeFrequency(line.trim());
    frequency += diff;
  });

  console.log(`Day 1 - part 1: ${frequency}`);
}

function part2(data) {
  let frequency = 0;
  let frequencyMap = { 0: true };
  let duplicateFrequencyFound = false;

  while (duplicateFrequencyFound === false) {
    console.log("Looping through data");
    data.split("\n").forEach(function(line) {
      let trimmedLine = line.trim();
      if (trimmedLine !== "") {
        let diff = changeFrequency(trimmedLine);
        frequency += diff;

        if (duplicateFrequencyFound === false && frequencyMap[frequency]) {
          duplicateFrequencyFound = frequency;
        } else {
          frequencyMap[frequency] = true;
        }
      }
    });
  }

  console.log(`Day 1 - part 2: ${duplicateFrequencyFound} has been reached twice`);
}

function changeFrequency(deltaString) {
  let change = parseInt(deltaString);

  if (isNaN(change)) {
    return 0
  } else {
    return change;
  }
}