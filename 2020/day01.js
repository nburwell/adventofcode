const DataLoader = require('../DataLoader.js');
const INPUT_FILE = 'input/day01.txt'

const loader = new DataLoader(INPUT_FILE);
const data = loader.data;

part1(data);
part2(data);

function find2NumbersBySum() {
  const TARGET = 2020;
  const list = data.split('\n').filter(e => e).map(e => parseInt(e));
  let numbers;

  list.forEach(function(row, outerIndex) {
    list.forEach(function(innerRow, innerIndex) {
      if (outerIndex !== innerIndex) {
        if (row + innerRow === TARGET) {
          numbers = [row, innerRow];
          return;
        }
      }
    });
  });

  if (numbers) {
    return numbers;
  } else {
    throw new Error("Nothing found");  
  }
}

function find3NumbersBySum() {
  const TARGET = 2020;
  const list = data.split('\n').filter(e => e).map(e => parseInt(e));
  let numbers;

  list.forEach(function(row, outerIndex) {
    list.forEach(function(innerRow, innerIndex) {
      list.forEach(function(innerMostRow, innerInnerIndex) {
        if (outerIndex !== innerIndex && innerIndex !== innerInnerIndex && outerIndex !== innerInnerIndex) {
          if (row + innerRow + innerMostRow === TARGET) {
            numbers = [row, innerRow, innerMostRow];
            return;
          }
        }
      });
    });
  });

  if (numbers) {
    return numbers;
  } else {
    throw new Error("Nothing found");  
  }
}

function part1(data) {
  const [a, b] = find2NumbersBySum();

  const answer = a * b;
  console.log(`Day 1 - part 1: ${answer}`);

  return;
}

function part2(data) {
  const [a, b, c] = find3NumbersBySum();

  const answer = a * b * c;
  console.log(`Day 5 - part 2: ${answer}`);
}
