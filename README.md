# tiny-scheduler

so you want to schedule jobs, that's cool, here's how to:

```
const scheduleJob = require('tiny-scheduler');

const logWow = () => console.log('wow');
const myJob = scheduleJob(Date.now() + 4000, logWow); // execute in 4 seconds
const myOtherJob = scheduleJob('* /2 * * * *', logWow); // execute every 2 minutes

for more information about cron strings, you can check out https://github.com/harrisiirak/cron-parser
```
