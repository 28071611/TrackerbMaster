const axios = require('axios');

exports.lookup = async (ip) => {
  const response = await axios.get(`https://ipapi.co/${ip}/json/`);
  return {
    ip,
    city: response.data.city,
    region: response.data.region,
    country: response.data.country_name,
    isp: response.data.org,
    lat: response.data.latitude,
    lon: response.data.longitude
  };
};
