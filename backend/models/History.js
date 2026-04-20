const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  ip: String,
  city: String,
  region: String,
  country: String,
  isp: String,
  lat: Number,
  lon: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);
