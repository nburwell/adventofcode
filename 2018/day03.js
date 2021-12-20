const DataLoader = require('./DataLoader.js');
const INPUT_FILE = 'input/day03.in'

const loader = new DataLoader(INPUT_FILE);
const data = loader.data;

const gridConfig = part1(data);
part2(data, gridConfig);

function part1(data) {
  let squareInches = 0;
  let grid = [];
  let maxW = 0, maxH = 0;

  data.split("\n").forEach(function(line) {
    let { id, x: left, y: top, w, h } = parseId(line);

    // console.log(`${left}, ${top} // ${w}x${h}`);

    for (let row = 0; row < w; row++) {
      for (let col = 0; col < h; col++) {
        let x = left + row;
        let y = top + col;

        if (x > maxW) {
          maxW = x;
        }

        if (y > maxH) {
          maxH = y;
        }

        if (!grid[y]) {
          grid[y] = [];
        }
    
        if (!grid[y][x]) {
          grid[y][x] = id;
        } else if (grid[y][x] !== 'X') {
          // space is already occupied, so count as a square inch and mark as shared
          squareInches++;
          grid[y][x] = 'X';
        }
      }
    }
  });

  // Display pattern that is stored:
  // for (let row = 0; row <= maxW; row++) {
  //   let rowOutput = "";
  //   for (let col = 0; col <= maxH; col++) {
  //     rowOutput += ((grid[row] && grid[row][col]) || ".");
  //   }
    
  //   console.log(rowOutput);
  // }

  console.log(`Day 3 - part 1: ${squareInches}`);

  return { grid, maxW, maxH };
}

function part2(data, { grid, maxW, maxH }) {
  data.split("\n").forEach(function(line) {
    let { id, x, y, w, h } = parseId(line);
    let targetSquareInches = w * h;

    let actualSquareInches = 0;
    for (let row = x; row <= x + w; row++) {
      for (let col = y; col <= y + h; col++) {
        if (grid[col] && grid[col][row] === id) {
          // console.log(`${id} ${targetSquareInches}, ${actualSquareInches}`);
          actualSquareInches++;
        }
      }
    }

    if (actualSquareInches >= targetSquareInches) {
      console.log(`Day 3 - part 2: ${id} has all square inches uncovered`);
    }
  });

  console.log(`Done`);
}

function parseId(line) {
  // #1280 @ 554,299: 29x28
  let [ id, _, coords, size ] = line.split(" ");
  let [ x, y ] = coords.split(",");
  let [ w, h ] = size.split("x");
  return { 
    id: id.replace('#', ''), 
    x: parseInt(x), 
    y: parseInt(y), 
    w: parseInt(w),
    h: parseInt(h) };
}