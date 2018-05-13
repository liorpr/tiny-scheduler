
const { expect }            = require('chai');
const { useFakeTimers }     = require('sinon');
const cronParser            = require('cron-parser');
const scheduleJob           = require('../lib');
const { getNextTimestamp }  = require('../lib/utils');

let clock;
const logDone = () => console.log('done!');
const toTimestamp = cronString =>
  getNextTimestamp(cronParser.parseExpression(cronString));

describe('job scheduling', () => {
  beforeEach(() => {
    clock = useFakeTimers();
  });
  
  afterEach(() => {
    clock.restore();
  });
  
  it('schedules a job based on timestamp', done => {
    const myJob = scheduleJob(Date.now() + 4000, logDone);
    expect(myJob.spec).to.exist;
    expect(myJob.method).to.exist;
    setTimeout(
      done,
      4100,
    );
    
    clock.tick(4100);
  });
  
  it('schedules a job based on cron string', done => {
    const cronString = '* * 5 * * *';
    const timestamp = toTimestamp(cronString);
    const myJob = scheduleJob(cronString, logDone);
    expect(myJob.spec).to.exist;
    expect(myJob.method).to.exist;
    setTimeout(
      done,
      timestamp
    );
    
    clock.tick(timestamp);
  });
  
  it('throws on incorrect spec', () => {
    const withIncorrectSpec = () => {
      const myJob = scheduleJob('zzzzzzz', logDone);
    };
    
    expect(withIncorrectSpec).to.throw();
  });
  
  it('throws when no method provided', () => {
    const withNoMethod = () => {
      const myJob = scheduleJob(Date.now() + 4000);    
    };
    
    expect(withNoMethod).to.throw();
  });
});

