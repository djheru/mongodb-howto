const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// No model because it's just a subdocument
const AlbumSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date },
  copiesSold: { type: Number },
  numberTracks: { type: Number },
  image: { type: String },
  revenue: { type: Number }
});

module.exports =  AlbumSchema;
