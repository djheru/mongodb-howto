const assert = require('assert');
const User = require('../src/user');

describe('Read a record', () => {
  let alex, joe, maria, zoe;
  beforeEach((done) => {
    alex = new User({ name: 'Alex' });
    joe = new User({ name: 'Joe' });
    maria = new User({ name: 'Maria' });
    zoe = new User({ name: 'Zoe' });
    Promise.all([ alex.save(), joe.save(), maria.save(), zoe.save()])
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

  it('skips and limits the result set', (done) => {
    User
      .find({})
      .sort({ name: 1})
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'Joe');
        assert(users[1].name === 'Maria');
        done();
      });
  });
});
