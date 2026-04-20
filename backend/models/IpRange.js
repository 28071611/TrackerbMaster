const mongoose = require('mongoose');

const ipRangeSchema = new mongoose.Schema({
  start_ip: String,
  end_ip: String,
  start_num: Number,
  end_num: Number,
  country: String,
  region: String,
  city: String,
  isp: String,
  lat: Number,
  lon: Number
});

module.exports = mongoose.model('IpRange', ipRangeSchema);

module.exports = mongoose.model('IpRange', ipRangeSchema);
