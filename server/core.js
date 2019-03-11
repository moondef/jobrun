const mongoose = require('mongoose');

class JobRunner {
  constructor(dbLink) {
    this.dbLink = dbLink;
    this.jobs = [];
  }

  createJob(url, cb) {
    const job = {
      url,
      cb
    }

    this.jobs.push(job);
  }

  start() {
    mongoose.connect(this.dbLink, { useNewUrlParser: true });
  }

  every(timeout, url) {
    const currJob = this.jobs.find(job => job.url === url);
    const interval = setInterval(currJob.cb, timeout);
    currJob.interval = interval;
  }

  stop(url) {
    const currJob = this.jobs.find(job => job.url === url);
    clearInterval(currJob.interval);
  }
}

module.exports = JobRunner;
