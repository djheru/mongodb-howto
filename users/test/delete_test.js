const assert = require('assert');
const User = require('../src/user');

describe('Remove a record', () => {
  let joe;
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    joe.save()
      .then(() => { done(); });
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('model instance remove', (done) => {
    User.remove({ _id: joe._id })
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null);
        done();
      });

  });

  it('model instance remove', (done) => {
    User.findOneAndRemove({ name: 'Joe' })
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });

  });

  it('model instance remove', (done) => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ _id: joe._id }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
