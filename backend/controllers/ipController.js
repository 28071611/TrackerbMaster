const geoService = require('../services/geoService');
const History = require('../models/History');

// Validate IPv4 format
const isValidIP = (ip) => {
  const regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return regex.test(ip);
};

exports.trackIP = async (req, res) => {
  const { ip } = req.body;

  if (!ip || !isValidIP(ip)) {
    return res.status(400).json({ error: 'Please enter a valid IPv4 address.' });
  }

  try {
    // 1. Check database for cached result
    const cachedData = await History.findOne({ ip });
    if (cachedData) {
      console.log(`Serving from cache for IP: ${ip}`);
      return res.json(cachedData);
    }

    // 2. Call Geolocation API if not found
    console.log(`Calling API for IP: ${ip}`);
    const data = await geoService.lookup(ip);

    // 3. Store in database
    const savedData = await History.create(data);

    res.json(savedData);
  } catch (error) {
    console.error('Track IP Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to fetch location' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
