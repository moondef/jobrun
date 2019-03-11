const mongoose = require('mongoose');

class JobRunner {
  constructor(dbLink) {
    this.dbLink = dbLink;
    this.jobs = [];
  }

  createJob(url, cb) {
    const job = {
      url,
      cb,
      isRunning: false
    }

    this.jobs.push(job);
  }

  start() {
    mongoose.connect(this.dbLink, { useNewUrlParser: true });
  }

  every(timeout, url) {
    const currJob = this.jobs.find(job => job.url === url);
    currJob.isRunning = true;

    const interval = setInterval(currJob.cb, timeout, currJob);
    currJob.interval = interval;
  }

  stop(url) {
    const currJob = this.jobs.find(job => job.url === url);
    clearInterval(currJob.interval);
    currJob.isRunning = false;
  }
}

module.exports = JobRunner;
