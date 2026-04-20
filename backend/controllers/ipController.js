const geoService = require('../services/geoService');
const History = require('../models/History');

exports.trackIP = async (req, res) => {
  const { ip } = req.body;
  try {
    const data = await geoService.lookup(ip);
    // Save to history
    await History.create({ ...data, timestamp: new Date() });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch location' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }).limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
