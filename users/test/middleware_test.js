const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS IS GREAT!', content: 'LOL JK!!!' });

    joe.blogPosts.push(blogPost); // Uses magic to only add the document _id

    Promise.all([joe, blogPost].map(e => e.save()))
      .then(() => { done(); });
  });

  it('users clean up dangling blog post on remove', (done) => {
    joe.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});
