// Convert IPv4 string to number
function ipToNumber(ip) {
  return ip.split('.').reduce((acc, part) => acc * 256 + parseInt(part), 0);
}

module.exports = { ipToNumber };
