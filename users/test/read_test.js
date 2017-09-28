const assert = require('assert');
const User = require('../src/user');

describe('Read a record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => { done(); });
  });
  it('retrieves all users named Joe', (done) => {
   User.find({name: 'Joe'})
     .then((users) => {
        assert(users[0]._id.toString() === joe._id.toString());
        done();
     });
  });

  it('retrieves a specific user by ID', (done) => {
    User.findOne({ _id: joe._id })
      .then((user) => {
        assert(user._id.toString() === joe._id.toString());
        assert(user.name === 'Joe');
        done();
      });
  });
});
