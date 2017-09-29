const assert = require('assert');
const User = require('../src/user');

describe('Virtual Types', () => {
  it('should return the count of the posts', (done) => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'Post Title' }]
    });

    joe.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
