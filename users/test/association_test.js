const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS IS GREAT!', content: 'LOL JK!!!' });
    comment = new Comment({ content: 'CONGRATS!!!!'});

    joe.blogPosts.push(blogPost); // Uses magic to only add the document _id
    comment.user = joe; // Also magic
    blogPost.comments.push(comment); // magic

    Promise.all([joe, blogPost, comment].map(e => e.save()))
      .then(() => { done(); });
  });

  it('saves relation between user and blogPost', (done) => {
    User.findOne({name: 'Joe'})
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === blogPost.title);
        done();
      });
  });

  it('saves the full relation graph', (done) => {
    User.findOne({name: 'Joe'})
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
      .then(user => {
        assert(user.name === joe.name);
        assert(user.blogPosts[0].title === blogPost.title);
        assert(user.blogPosts[0].content === blogPost.content);
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
