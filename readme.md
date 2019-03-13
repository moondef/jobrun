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

const DELETE_UNACTIVE_USERS = 'delete unactive users';

myJb.createJob(DELETE_UNACTIVE_USERS, () => {
  User.remove({lastLogIn: {$lt: yourDate}});
});

(async () => {
  await myJb.start();
  await myJb.every(3000, DELETE_UNACTIVE_USERS);
})();
```

## Documentation
- createJob(url, cb)
- start()
- every(timeout, url)
- stop(url)
