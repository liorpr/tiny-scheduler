
const cronParser = require('cron-parser');
const Invocation = require('./invocation');

const runOnDate = (date, method) => {
  const now = Date.now();
  const then = date;
  
  return setTimeout(
    method,
    then < now ? 0 : then - now,
  );
};

class Job {
  constructor(spec, method) {
    this.spec = spec;
    this.method = this.validateMethod(method) && method;
  }
  
  validateMethod(method) {
    if (typeof method === 'function') {
      return true;
    }
    
    throw new Error(`expected second paramter to be a function but got ${method}`);
  }
    
  scheduleInvocation(inv) {
    runOnDate(inv.getStartDate(), () => {
      if (inv.shouldRecur()) {
        this.scheduleRecurrence(inv.spec);
      }
      
      this.method();
    });
  }
  
  scheduleRecurrence(cronExp) {
    const inv = new Invocation(cronExp);
    this.scheduleInvocation(inv);
  }
  
  schedule() {
    const { spec } = this;
    try {
      const cronExp = cronParser.parseExpression(spec);
      this.scheduleRecurrence(cronExp);
    }
    
    catch(e) {
      if (typeof spec !== 'number') {
        throw new Error(`expected spec to be a cron-string|timestamp but got ${spec}`)
      }
      
      if (spec > Date.now()) {
        const inv = new Invocation(spec);
        this.scheduleInvocation(inv);
      }  
    }
    
    return this;
  }
}

module.exports = Job;
