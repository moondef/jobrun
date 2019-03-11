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
      isDone: false
    }

    this.jobs.push(job);
  }

  start() {
    mongoose.connect(this.dbLink, { useNewUrlParser: true });
  }

  every(timeout, url) {
    const currJob = this.jobs.find(job => job.url === url);
    setInterval(currJob.cb, timeout);
  }
}

module.exports = JobRunner;
