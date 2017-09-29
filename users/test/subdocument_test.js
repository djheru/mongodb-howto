const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
  it('can create a subdocument on a new model instance', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      });
  });

  it('can add subdocuments on an existing model instance', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Another thing' });
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts[0].title === 'Another thing');
        done();
      });
  });

  it('can remove a subdocument from a model instance', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove();
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
