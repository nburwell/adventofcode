var md5 = require("blueimp-md5")

const PASSWORD_LENGTH = 8

var input = "abbhdwsy"
//input = "abc"

function getValidIndex(val) {
  var result = md5(val)

  if (result.substring(0,5) === '00000') {
    return result[5]
  } else {
    return null
  }
}

function getValidIndexAndVal(val) {
  var result = md5(val)

  if (result.substring(0,5) === '00000') {
    var index = parseInt(result[5])
    
    if (index >= 0 && index < PASSWORD_LENGTH) {
      return { index: index, val: result[6] }
    } else {
      return null
    }
  } else {
    return null
  }
}

var count = 0
var indexFound

/* // part 1
var password = '';
for (var i = 0; i < PASSWORD_LENGTH; i++) {
  indexFound = false

  while (!indexFound) {
    count++
    var char = getValidIndex(input + count);

    if (char !== null) {
      console.log("Found", i, char)
      password += char
      indexFound = true
    }
  }
}

console.log("Part 1:")
console.log(password)
*/

var password2 = [];
function passwordDone() {
  for (var i = 0; i < PASSWORD_LENGTH; ++i) {
    if (!password2[i]) return false
  }

  return true
}

while (!passwordDone()) {
  indexFound = false

  while (!indexFound) {
    count++
    var char = getValidIndexAndVal(input + count);

    if (char !== null && !password2[char.index]) {
      console.log("Found", char)
      password2[char.index] = char.val
      indexFound = true
    }
  }
}

console.log("Part 2:")
console.log(password2.join(''))