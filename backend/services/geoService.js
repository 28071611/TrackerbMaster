const axios = require('axios');

/**
 * Lookup IP location using ipapi.co
 * @param {string} ip - IPv4 address
 * @returns {Promise<object>} - Location data
 */
exports.lookup = async (ip) => {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);

    if (response.data.error) {
      throw new Error(response.data.reason || 'Invalid IP address');
    }

    return {
      ip: response.data.ip,
      city: response.data.city,
      region: response.data.region,
      country: response.data.country_name,
      isp: response.data.org,
      lat: response.data.latitude,
      lon: response.data.longitude
    };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};
