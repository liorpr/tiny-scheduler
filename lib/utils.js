
const cronDate = require('cron-parser/lib/date');

function isCronDate(spec) {
  return spec._currentDate instanceof cronDate;
}

function getNextTimestamp(spec) {
  const nextStr = spec.next().toString();
  return new Date(nextStr).getTime();
}

module.exports = {
  isCronDate,
  getNextTimestamp,
};