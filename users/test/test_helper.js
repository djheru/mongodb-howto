const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test', {
    useMongoClient: true
  });
  mongoose.connection
    .once('open', done)
    .on('error', (e) => console.warn('Warning: ', e));
});

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done();
  });
});
