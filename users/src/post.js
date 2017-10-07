const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Just need a schema because it is a subdocument
const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
