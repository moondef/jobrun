# Jobrun
### Simple job runner for MongoDB

## Usage
```
$ npm install --save jobrun
```
or
```
$ yarn add jobrun
```

### Example of usage

```js
const dbLink = 'mongodb://localhost:27017/jobrunner'; 

const myJb = new JobRun(dbLink);

const CREATE_RANDOM_USER = 'create a random user';

myJb.createJob(CREATE_RANDOM_USER, () => {
  const newUser = new User({
    name: Math.random().toString(),
    type: 'user',
    date: Math.random().toString(),
  });

  newUser.save();
});

(async () => {
  await myJb.start();
  await myJb.every(3000, CREATE_RANDOM_USER);
  
  setTimeout(() => {
    myJb.stop(CREATE_RANDOM_USER);
    console.log('stopped');
  }, 15000);
})();
```

## Documentation
- createJob(url, cb)
- start()
- every(timeout, url)
- stop(url)
