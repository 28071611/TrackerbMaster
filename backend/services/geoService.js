const axios = require('axios');
const IpRange = require('../models/IpRange');

// Convert IPv4 string to number
function ipToNumber(ip) {
  return ip.split('.').reduce((acc, part) => acc * 256 + parseInt(part), 0);
}

// Lookup IP location: DB first, then API fallback
exports.lookup = async (ip) => {
  const ipNum = ipToNumber(ip);
  // Try to find in DB
  const range = await IpRange.findOne({
    start_num: { $lte: ipNum },
    end_num: { $gte: ipNum }
  });
  if (range) {
    return {
      ip,
      city: range.city,
      region: range.region,
      country: range.country,
      isp: range.isp,
      lat: range.lat,
      lon: range.lon
    };
  }
  // Fallback: call API
  const response = await axios.get(`https://ipapi.co/${ip}/json/`);
  // Store as a /32 range (single IP)
  const newRange = await IpRange.create({
    start_ip: ip,
    end_ip: ip,
    start_num: ipNum,
    end_num: ipNum,
    country: response.data.country_name,
    region: response.data.region,
    city: response.data.city,
    isp: response.data.org,
    lat: response.data.latitude,
    lon: response.data.longitude
  });
  return {
    ip,
    city: newRange.city,
    region: newRange.region,
    country: newRange.country,
    isp: newRange.isp,
    lat: newRange.lat,
    lon: newRange.lon
  };
};
