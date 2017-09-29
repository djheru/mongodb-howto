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
  postCount: Number,
  posts: [PostSchema]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
