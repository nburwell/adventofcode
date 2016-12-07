fs = require('fs')
const INPUT_FILE = 'input/day2.in'

fs.readFile(INPUT_FILE, 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  part1(data)
  part2(data)
})

/*
1 2 3
4 5 6
7 8 9
*/

function moveUp(num) {
  if (num - 3 > 0) {
    return num - 3
  } else {
    return num
  }
}

function moveDown(num) {
  if (num + 3 < 10) {
    return num + 3
  } else {
    return num
  }
}

function moveLeft(num) {
  if (num % 3 === 1) {
    return num
  } else {
    return num - 1
  }
}

function moveRight(num) {
  if (num % 3 === 0) {
    return num
  } else {
    return num + 1
  }
}

function part1(input) {
  var code = ''
  var lastNum = 5;

  input.split("\n").forEach(function(line) {
    for (var i = 0; i < line.length; i++) {
      switch(line[i]) {
        case 'U':
          lastNum = moveUp(lastNum)
          break

        case 'D':
          lastNum = moveDown(lastNum)
          break

        case 'L':
          lastNum = moveLeft(lastNum)
          break

        case 'R':
          lastNum = moveRight(lastNum)
          break

        default:
          console.log("Unknown dir", line[1])
          process.exit()
      }
    }

    code += lastNum.toString()
  })
  
  console.log("==============")
  console.log("Part 1")
  console.log(code)
}

/*
    1
  2 3 4
5 6 7 8 9
  A B C
    D

      1
   2  3  4
5  6  7  8  9
  10 11 12
     15

*/

function moveUp2(num) {
  if (num === 5 || num === 9) {
    return num
  }

  if (num === 3) {
    return 1
  }

  if (num - 4 > 0) {
    return num - 4
  } else {
    return num
  }
}

function moveDown2(num) {
  if (num === 5 || num === 9 || num === 10 || num === 12) {
    return num
  }

  if (num === 1) {
    return 3
  }

  if (num + 4 <= 15) {
    return num + 4
  } else {
    return num
  }
}

function moveLeft2(num) {
  switch(num) {
    case 1:
    case 2:
    case 5:
    case 10:
    case 15:
      return num

    default:
      return num - 1
  }
}

function moveRight2(num) {
  switch(num) {
    case 1:
    case 4:
    case 9:
    case 12:
    case 15:
      return num

    default:
      return num + 1
  }
}

function part2(input) {
  var code = []
  var lastNum = 5

  input.split("\n").forEach(function(line) {
    for (var i = 0; i < line.length; i++) {
      switch(line[i]) {
        case 'U':
          lastNum = moveUp2(lastNum)
          break

        case 'D':
          lastNum = moveDown2(lastNum)
          break

        case 'L':
          lastNum = moveLeft2(lastNum)
          break

        case 'R':
          lastNum = moveRight2(lastNum)
          break

        default:
          console.log("Unknown dir", line[1])
          process.exit()
      }
    }

    code.push(lastNum)
  })

  var decoded = code.map(function(val) {
    switch(val) {
      case 10:
        return 'A'

      case 11:
        return 'B'

      case 12:
        return 'C'

      case 15:
        return 'D'

      default:
        if (val < 1 || val > 9) {
          console.log('unexpected val', val)
        }
        return val.toString()
    }
  })

  console.log("==============")
  console.log("Part 2")
  //console.log(code)
  console.log(decoded.join(''))

}