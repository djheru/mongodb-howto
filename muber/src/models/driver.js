const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = Schema({
  email: { type: String, required: true },
  isDriving: { type: Boolean, default: false },
  //location: { }
});

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;
