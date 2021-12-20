const DataLoader = require('./DataLoader.js');
const INPUT_FILE = 'input/day04.in'

const loader = new DataLoader(INPUT_FILE);
const data = loader.data;

class GuardShift {
  constructor(guardId, startDate) {
    this.startDate = startDate;
    this.guardId = guardId;

    this.sleepingMinutes = [];
    this.state = "awake";
    this.startedSleepingIndex;
  }

  sleep(minute) {
    if (this.state === "asleep") {
      throw new Error(`Guard ${guardId} on ${startDate} is already asleep!`);
    }

    this.startedSleepingIndex = minute;
    this.state = "asleep";
  }

  wake(minute) {
    if (this.state === "awake") {
      throw new Error(`Guard ${guardId} on ${startDate} is already awake!`);
    }

    for (let i = this.startedSleepingIndex; i < minute; i++) {
      this.sleepingMinutes[i] = 1;
    }

    this.state = "awake";
  }

  amountAsleep() {
    return this.sleepingMinutes.reduce(function(prev, curr, index, list) {
      return prev + parseInt(curr);
    }, 0);
  }

  debug() {
    console.log(
      `${this.guardId} @ ${this.startDate}`,
      this._minutes(),
      this.amountAsleep()
    );
  }

  _minutes() {
    let output = '';
    for (let i = 0; i < 60; i++) {
      output += (this.sleepingMinutes[i] || '.').toString();
    }

    return output;
  }
}

class Guard {
  constructor(id) {
    this.id = id;
    this.shifts = [];
  }

  addShift(shift) {
    this.shifts.push(shift);
  }

  totalAmountAsleep() {
    return this.shifts.reduce(
      (prev, shift, _list, _index) => prev + shift.amountAsleep(),
      0
    )
  }

  mostAsleepMinute() {
    let minutes = [], maxMinute = 0;
    for (let i = 0; i < 60; i++) {
      let sum = 0;
      this.shifts.forEach(function(shift) {
        if (shift.sleepingMinutes[i]) {
          sum += shift.sleepingMinutes[i];
        }
      });

      minutes[i] = sum;
      if (sum > minutes[maxMinute]) {
        maxMinute = i;
      }
    }

    return maxMinute;
  }
}

class GuardLedger {
  constructor() {
    this.guards = {};
    this.activeShift;
    this.shifts = []; // debugging only
  }

  insertRow(row) {
    const data = this._parseRow(row);

    if (data.message.match(/begins shift/)) {
      // first time we've seen this guard
      if (!this.guards[data.guardId]) {
        this.guards[data.guardId] = new Guard(data.guardId);
      }

      this.activeShift = new GuardShift(data.guardId, data.date);
      this.guards[data.guardId].addShift(this.activeShift);

      // for debugging
      this.shifts.push(this.activeShift);
    } else {
      if (!this.activeShift) {
        throw new Error(`No activeShift for data: ${data.message}`);
      }

      if (data.message.match(/falls asleep/)) {
        this.activeShift.sleep(data.minute);
      } else if (data.message.match(/wakes up/)) {
        this.activeShift.wake(data.minute);
      } else {
        throw new Error(`Unexpected message found: ${data.message}`);
      }
    }
  }

  mostAsleepGuard() {
    let max = 0, guardIdWithMax;
    for (let guardId in this.guards) {
      let amountAsleep = this.guards[guardId].totalAmountAsleep();
      if (max < amountAsleep) {
        max = amountAsleep;
        guardIdWithMax = guardId;
      }
    }

    return guardIdWithMax;
  }

  mostAsleepMinute(guardId) {
    return this.guards[guardId].mostAsleepMinute();
  }

  mostAsleepMinuteByAnyGuard() {
    let minutes = [], maxMinute = 0;
    for (let i = 0; i < 60; i++) {
      for (let guardId in this.guards) {
        let guard = this.guards[guardId];
        let sumByGuard = 0;
        guard.shifts.forEach(function(shift) {
          if (shift.sleepingMinutes[i]) {
            sumByGuard += shift.sleepingMinutes[i];
          }
        });

        if (!minutes[i] || sumByGuard > minutes[i].amount) {
          minutes[i] = { guardId: guard.id, amount: sumByGuard };
        }
      };

      if (minutes[i].amount > minutes[maxMinute].amount) {
        maxMinute = i;
      }
    }

    return { guardId: minutes[maxMinute].guardId, minute: maxMinute };
  }

  debug() {
    this.shifts.forEach(shift => shift.debug());
  }

  _parseRow(row) {
    // [1518-11-03 00:05] Guard #10 begins shift
    const date = row.substring(1,11);
    const minute = parseInt(row.substring(15,17));
    const message = row.substring(18);
    const guardMatch = row.match(/Guard #(\d+)/);
    debugger;
    const guardId = (guardMatch && parseInt(guardMatch[1])) || null;

    return { 
      guardId,
      date,
      minute,
      message
    };
  }
}

let ledger = new GuardLedger();

data.split("\n").sort().forEach(function(line) {
  ledger.insertRow(line);
});
ledger.debug();

part1(ledger);
part2(ledger);

function part1(ledger) {  
  const guardId = ledger.mostAsleepGuard();
  console.log(guardId);
  const answer = guardId * ledger.mostAsleepMinute(guardId);
  console.log(`Day 4 - part 1: ${answer}`);

  return;
}

function part2(ledger) {
  const { guardId, minute } = ledger.mostAsleepMinuteByAnyGuard();
  console.log(guardId, minute);
  const answer = guardId * minute;
  console.log(`Day 4 - part 2: ${answer}`);
}
