const mongoose = require('mongoose');
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
  postCount: Number
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
