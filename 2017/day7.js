fs = require('fs')
const INPUT_FILE = 'input/day7.in'

fs.readFile(INPUT_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  part1(data)
  //part2(data)
})

function containsAbba(val) {
  // search for any pair, then look at the two surrounding (ensuring all 4 aren't the same)
  var current

  for (var i = 0; i < val.length; ++i) {
    var next = val[i]

    if (next === current) {
      if (val[i - 2] === val[i+1] && val[i+1] !== current) {
        return true
      }
    }

    current = next
  }

  return false
}

function isTLS(val) {
  var nextToken = '['
  var nextMatchIndex = null
  var lastMatchIndex = 0
  var chunk = ''
  var hasValidAbba = false

  while ((nextMatchIndex = val.indexOf(nextToken, lastMatchIndex)) !== -1) {
    chunk = val.substring(lastMatchIndex, nextMatchIndex)
    lastMatchIndex = nextMatchIndex

    if (containsAbba(chunk)) {
      if (nextToken === '[') {
        hasValidAbba = true
      } else {
        return false
      }
    }

    nextToken = nextToken === '[' ? ']' : '['
  }

  chunk = val.substring(lastMatchIndex)
  
  if (containsAbba(chunk)) {
    if (nextToken === '[') {
      hasValidAbba = true
    } else {
      console.log("Shouldn't get to end of string with just an open bracket...", val)
      return false
    }
  }

  return hasValidAbba
}

function part1(input) {
  var supportTLSCount = 0
  var lines = input.split("\n")

  lines.forEach(function(line) {
    if (isTLS(line)) supportTLSCount++
  })

  console.log("==============")
  console.log("Part 1")
  console.log(supportTLSCount)
}
