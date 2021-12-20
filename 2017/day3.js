fs = require('fs')
const INPUT_FILE = 'input/day3.in'

fs.readFile(INPUT_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  part1(data)
  part2(data)
})

function collapseWhitespace(val) {
  return val.trim().replace(/\s{2,}/g, ' ')
}

function isPossible(x, y, z) {
  return x + y > z &&
    x + z > y &&
    y + z > x
}

function part1(input) {
  var possible = 0
  var lines = input.split("\n")

  lines.forEach(function(line) {
    var [x, y, z] = collapseWhitespace(line).
      split(" ").
      map(function(v) { return parseInt(v) })

    if (isPossible(x, y, z)) possible++
  })

  console.log("==============")
  console.log("Part 1")
  console.log(possible)
}

function part2(input) {
  var possible = 0
  var lines = input.split("\n")

  for (var i = 0; i < lines.length; i += 3) {
    var [x1, x2, x3] = collapseWhitespace(lines[i]).
      split(" ").
      map(function(v) { return parseInt(v) })

    var [y1, y2, y3] = collapseWhitespace(lines[i+1]).
      split(" ").
      map(function(v) { return parseInt(v) })

    var [z1, z2, z3] = collapseWhitespace(lines[i+2]).
      split(" ").
      map(function(v) { return parseInt(v) })

    if (isPossible(x1, y1, z1)) possible++
    if (isPossible(x2, y2, z2)) possible++
    if (isPossible(x3, y3, z3)) possible++
  }

  console.log("==============")
  console.log("Part 2")
  console.log(possible)
}