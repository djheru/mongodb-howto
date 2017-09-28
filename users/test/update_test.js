const assert = require('assert');
const User = require('../src/user');

describe('Update a record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => { done(); });
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Jim');
        done();
      });
  }

  it('instance update', (done) => {
    assertName(joe.update({ name: 'Jim' }), done);

  });

  it('instance set and save update', (done) => {
    joe.set('name', 'Jim');
    assertName(joe.save(), done);
  });

  it('model update', (done) => {
    assertName(User.update({ name: 'Joe' }, { name: 'Jim'}), done);
  });

   it('model findOneAndUpdate', (done) => {
     assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Jim'}), done);
  });

  it('model findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Jim'}), done);
  });

  it('increment postCount by 1', (done) => {
    // example of update operator
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 }})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
