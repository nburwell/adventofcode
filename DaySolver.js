DataLoader = require('./DataLoader.js');

class DaySolver {
  constructor(day) {
    const inputFile = `input/day${day}.txt${this._testMode() ? '.test' : ''}`

    this.day = day;
    this.loader = new DataLoader(inputFile);
  }

  solve() {
    if (this._testMode()) {
      this.log("In test mode");
    }
    
    this._part1(this.loader.data);
    this._part2(this.loader.data);
  }

  part1(data) {
    throw new Error("part1 must be implemented by your object!");
  }

  part2(data) {
    throw new Error("part2 must be implemented by your object!");
  }

  log(message, ...params) {
    console.log(`[Day ${this.day}] ${message}`, ...params);
  }

  _part1(data) {
    let answer;
    try {
      answer = this.part1(data);
    } catch(ex) {
      this.log("Error in part 1: ", ex);
    }

    this.log(`Part 1: ${answer}`);

    return;
  }

  _part2(data) {
    let answer;
    try {
      answer = this.part2(data);
    } catch(ex) {
      this.log("Error in part 2: ", ex);
    }

    this.log(`Part 2: ${answer}`);

    return;
  }

  _testMode() {
    return !!process.env['TEST'];
  }

  
}

module.exports = DaySolver;
