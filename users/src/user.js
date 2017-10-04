const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name Required'],
    validate: {
      validator: (name) => (name.length > 2),
      message: 'Name must be at least 3 characters'
    }
  },
  posts: [PostSchema],
  blogPosts: [{ ref: 'blogPost', type: Schema.Types.ObjectId }],
  likes: Number
});

UserSchema.virtual('postCount')
  .get(function () {
    return this.posts.length;
  });

UserSchema.pre('remove', function (next) { // don't use arrow function. this === instance
  // Get a model that's been defined
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({ _id: { $in: this.blogPosts }}) // query operator $in
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
