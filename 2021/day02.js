const DAY = '02';
const DaySolver = require('../DaySolver.js');

const solver = new DaySolver(DAY);

solver.part1 = function(data) {
  const list = data.split('\n').filter(e => e).map(e => parseInt(e));

  let lastDepth = null;
  let counter = 0;
  list.forEach(function(depth) { 
    if (lastDepth && lastDepth < depth) {
      counter++;
    }

    lastDepth = depth;
  });

  return counter;
}

solver.part2 = function(data) {
  function rollingWindow(list, index) {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    return list.slice(index - 3, index).reduce(reducer, 0);
  }

  const list = data.split('\n').filter(e => e).map(e => parseInt(e));

  let lastRollingDepth = null;
  let counter = 0;
  list.forEach(function(_depth, index) {
    if (index >= 2) {
      rollingDepth = rollingWindow(list, index + 1);

      if (lastRollingDepth && rollingDepth > lastRollingDepth) {
        counter++;
      }

      lastRollingDepth = rollingDepth;
    }
  });

  return counter;
}

solver.solve();
