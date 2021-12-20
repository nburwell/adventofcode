const DataLoader = require('../DataLoader.js');
const INPUT_FILE = 'input/day02.txt'

const loader = new DataLoader(INPUT_FILE);

part1(loader.data);
part2(loader.data);

function PasswordRules1(row) {
  /* 
  1-8 n: dpwpmhknmnlglhjtrbpx
  11-12 n: frpknnndpntnncnnnnn
  */ 
  
  const matches = row.match(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)/);
  if (!matches) {
    throw new Error(`Unable to parse row: ${row}`);
  }

  const min = matches[1];
  const max = matches[2];
  const char = matches[3];
  const password = matches[4];
  const numOccurrences = Array.from(password).reduce(
    function(prevCount, currentChar, index) { 
      if (currentChar === char) {
        return prevCount + 1;
      } else {
        return prevCount;
      }
    },
    0
  );

  return {
    numOccurrences,
    isValid: function() {
      return numOccurrences >= min && numOccurrences <= max;
    }
  };
}

function PasswordRules2(row) {
  /* 
  1-8 n: dpwpmhknmnlglhjtrbpx
  11-12 n: frpknnndpntnncnnnnn
  */ 
  
  const matches = row.match(/(\d+)-(\d+)\s([a-z]):\s([a-z]+)/);
  if (!matches) {
    throw new Error(`Unable to parse row: ${row}`);
  }

  const pos1 = matches[1];
  const pos2 = matches[2];
  const char = matches[3];
  const passwordArray = Array.from(matches[4]);

  return {
    isValid: function() {
      return passwordArray[pos1 - 1] === char ^ passwordArray[pos2 - 1] === char;
    }
  };
}

function findValidPasswords(data, ruleClass) {
  const list = data.split('\n').filter(e => e);
  let validCount = 0;

  list.forEach(function(row, _outerIndex) {
    const pwRules = new ruleClass(row);
    if (pwRules.isValid()) {
      validCount++;
    }
  });

  return validCount;
}


function part1(data) {
  const answer = findValidPasswords(data, PasswordRules1);
  console.log(`Day 1 - part 1: ${answer}`);

  return;
}

function part2(data) {
  const answer = findValidPasswords(data, PasswordRules2);
  console.log(`Day 1 - part 2: ${answer}`);
}
