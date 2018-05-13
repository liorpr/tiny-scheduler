
const Job = require('./job');

function scheduleJob(spec, method) {
  return new Job(spec, method)
    .schedule();
}

module.exports = scheduleJob;
