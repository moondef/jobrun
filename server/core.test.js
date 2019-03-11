const mongoose = require('mongoose');

const JobRunner = require('./core');

const { Schema, model } = mongoose;

const userShema = new Schema({
  name: String,
  type: String,
  date: Number
})

const User = model('User', userShema);

const myJb = new JobRunner('mongodb://localhost:27017/jobrunner');

myJb.createJob('delete Stas Ivanov', (job, done) => {
  User.deleteOne({name: 'Stas Ivanov'}, (err) => {
    if (err) throw err;
    console.log('done');
  })
});

(async () => {
  await myJb.start()
  await myJb.every(5000, 'delete Stas Ivanov')
})();
