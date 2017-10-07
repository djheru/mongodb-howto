const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, min: 0 },
  yearsActive: { type: Number, min: 0 },
  image: { type: String },
  genre: { type: String },
  website: { type: String },
  netWorth: { type: Number },
  labelName: { type: String },
  retired: { type: Boolean },
  albums: [ AlbumSchema ]
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;
