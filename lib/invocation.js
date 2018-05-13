
const {
  isCronDate,
  getNextTimestamp,
} = require('./utils');

class Invocation {
  constructor(spec = Date.now()) { // hmmm using types here would have helped
    this.spec = spec;
  }
  
  getStartDate() {
    const { spec } = this;
    if (typeof spec === 'number') {
      return spec;
    }
    
    else if (isCronDate(spec)) {
      return getNextTimestamp(spec);
    }
  }
  
  shouldRecur() {
    return isCronDate(this.spec) &&
      this.spec._endDate === null;
  }
}

module.exports = Invocation;
