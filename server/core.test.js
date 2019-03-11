const mongoose = require('mongoose');

const JobRunner = require('./core');

const { Schema, model } = mongoose;

const userShema = new Schema({
  name: String,
  type: String,
  date: Number
})

const User = model('User', userShema);

// init runner
const myJb = new JobRunner('mongodb://localhost:27017/jobrunner');

const DELETE_STAS = 'delete Stas Ivanov';
const CREATE_RANDOM_USER = 'create a random user';

myJb.createJob(DELETE_STAS, (job) => {
  User.deleteOne({name: 'Stas Ivanov'}, (err) => {
    if (err) throw err;
    console.log('done');
  })
});

myJb.createJob(CREATE_RANDOM_USER, (job) => {
  const newUser = new User({
    name: Math.random().toString(),
    type: 'user',
    date: Math.random().toString(),
  });

  newUser.save();
});

(async () => {
  await myJb.start();

  await myJb.every(5000, DELETE_STAS);
  await myJb.every(3000, CREATE_RANDOM_USER);

  setTimeout(() => {
    myJb.stop(DELETE_STAS);
    console.log('stopped');
  }, 15000);

  setTimeout(() => {
    console.log(myJb.jobs)
  }, 16000);

})();
