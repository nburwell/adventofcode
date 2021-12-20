fs = require('fs');

class DataLoader {
  constructor(fileName) {
    this.fileName = fileName;
    this._load();
  }

  get data() {
    return this._data;
  }

  set data(val) {
    this._data = val;
  }

  _load() {
    this.data = fs.readFileSync(this.fileName, 'utf8');
  }
}

module.exports = DataLoader;