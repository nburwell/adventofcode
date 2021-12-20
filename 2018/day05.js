const DataLoader = require('./DataLoader.js');
const INPUT_FILE = 'input/day05.in'

const POLAR_OPPOSITES_OFFSET = 32;

const loader = new DataLoader(INPUT_FILE);
const data = loader.data;

part1(data);
part2(data);

function isPolarOpposite(a, b) {
  return Math.abs(a.charCodeAt(0) - b.charCodeAt(0)) === POLAR_OPPOSITES_OFFSET;
}

function react(polymer) {
  let i = 0;

  while (i < polymer.length - 1) {
    if (isPolarOpposite(polymer[i], polymer[i+1])) {
      polymer.splice(i, 2);
      i = Math.max(0, i - 2); // move pointer back to account for missing elements
    } else {
      i++;
    }
  }

  return polymer;
}

function part1(data) {
  let polymer = react(data.split(''));
  
  console.log(polymer);
  console.log(`Day 5 - part 1: ${polymer.length}`);

  return;
}

function part2(data) {
  let shortest = data.length;

  const types = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for(var i = 0; i < types.length; i++) {
    const type = types.charAt(i);

    let polymer = data.replace(new RegExp(type, 'ig'), '').split('');
    let reacted = react(polymer);

    if (reacted.length < shortest) {
      shortest = reacted.length;
    }
  }

  console.log(`Day 5 - part 2: ${shortest}`);
}
