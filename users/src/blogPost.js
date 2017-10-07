const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Do a full model because the user has a collection of ids
const BlogPostSchema = new Schema({
  title: String,
  content: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;
