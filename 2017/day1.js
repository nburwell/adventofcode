// EXAMPLE
// var input = "R8, R4, R4, R8";
// output: 4 blocks to first destination

var input = "R3, L5, R2, L1, L2, R5, L2, R2, L2, L2, L1, R2, L2, R4, R4, R1, L2, L3, R3, L1, R2, L2, L4, R4, R5, L3, R3, L3, L3, R4, R5, L3, R3, L5, L1, L2, R2, L1, R3, R1, L1, R187, L1, R2, R47, L5, L1, L2, R4, R3, L3, R3, R4, R1, R3, L1, L4, L1, R2, L1, R4, R5, L1, R77, L5, L4, R3, L2, R4, R5, R5, L2, L2, R2, R5, L2, R194, R5, L2, R4, L5, L4, L2, R5, L3, L2, L5, R5, R2, L3, R3, R1, L4, R2, L1, R5, L1, R5, L1, L1, R3, L1, R5, R2, R5, R5, L4, L5, L5, L5, R3, L2, L5, L4, R3, R1, R1, R4, L2, L4, R5, R5, R4, L2, L2, R5, R5, L5, L2, R4, R4, L4, R1, L3, R1, L1, L1, L1, L4, R5, R4, L4, L4, R5, R3, L2, L2, R3, R1, R4, L3, R1, L4, R3, L3, L2, R2, R2, R2, L1, L4, R3, R2, R2, L3, R2, L3, L2, R4, L2, R3, L4, R5, R4, R1, R5, R3";

var coord = { x: 0, y: 0, dir: 0 };
var visited = [];
var firstVisitedCoord = null;

function walkToBlock(x, y) {
  visited[x] || (visited[x] = []); 
  if (!firstVisitedCoord && visited[x][y]) {
    firstVisitedCoord = { x: x, y: y };
  } else {
    visited[x][y] = true;
  }
}

input.split(", ").forEach(function(step) {
  var direction = step.substring(0,1);
  var steps = parseInt(step.substring(1));

  if (direction === "R") {
    coord.dir++;
  } else {
    coord.dir += 3;
  }

  switch(coord.dir % 4) {
    // north
    case 0:
      for (var i = coord.y + 1; i <= coord.y + steps; i++) {
        walkToBlock(coord.x, i)
      }
      coord.y = coord.y + steps;
      break;

    // east
    case 1:
      for (var i = coord.x + 1; i <= coord.x + steps; i++) {
        walkToBlock(i, coord.y)
      }
      coord.x = coord.x + steps;
      break;

    // south
    case 2:
      for (var i = coord.y - 1; i >= coord.y - steps; i--) {
        walkToBlock(coord.x, i)
      }
      coord.y = coord.y - steps;
      break;

    // west
    case 3:
      for (var i = coord.x - 1; i >= coord.x - steps; i--) {
        walkToBlock(i, coord.y)
      }
      coord.x = coord.x - steps;
      break;

    default: 
      console.log("Unsupported direction: ", coord.dir);
  }
});

coord.dir = coord.dir % 4;

console.log("==============");
console.log("Part 1")
console.log("Blocks to final destination:", Math.abs(coord.x) + Math.abs(coord.y));
console.log("==============")

console.log("==============");
console.log("Part 2")
console.log("Blocks for first location:", Math.abs(firstVisitedCoord.x) + Math.abs(firstVisitedCoord.y));
console.log("==============")