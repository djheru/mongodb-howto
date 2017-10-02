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

const User = mongoose.model('user', UserSchema);
module.exports = User;
