fs = require('fs')
const INPUT_FILE = 'input/day02.in'

fs.readFile(INPUT_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }

  part1(data);
  part2(data);
});

function part1(data) {
  let twoLetterCount = 0;
  let threeLetterCount = 0;

  data.split("\n").forEach(function(line) {
    if (containsNMatches(line, 2)) {
      // console.log(`Contains 2 char: ${line}`);
      twoLetterCount += 1;
    }

    if (containsNMatches(line, 3)) {
      // console.log(`Contains 3 char: ${line}`);
      threeLetterCount += 1;
    }
  });

  const checkSum = twoLetterCount * threeLetterCount;

  console.log(`Day 2 - part 1: ${checkSum}`);
}

function containsNMatches(line, count) {
  let charMap = {};
  [...line].forEach(function(char) {
    if (!charMap[char]) {
      charMap[char] = 1;
    } else {
      charMap[char] += 1;
    }
  });

  return Object.values(charMap).includes(count);
}

function part2(data) {
  let lines = data.split("\n");
  let finalString;

  lines.forEach(function(line) {
    let { match, index } = hasNearMatch(lines, line);
    
    if (match) {
      console.log(`Near match! ${line} and ${match} @ ${index}`);
      finalString = line.substring(0, index) + line.substring(index+1);
    }
  });

  console.log(`Day 2 - part 2: ${finalString}`);
}

function hasNearMatch(lines, line) {
  for (let i = 0; i < lines.length; i++) {
    let otherLine = lines[i];
    let otherChars = [...otherLine];
    let lineChars  = [...line];

    let differences = [];

    otherChars.forEach(function(otherChar, index) {
      if (differences.length <= 1 && otherChar !== lineChars[index]) {
        differences.push(index);
      }
    });

    if (differences.length === 1) {
      return { match: otherLine, index: differences[0] };
    }
  };

  return {};
}