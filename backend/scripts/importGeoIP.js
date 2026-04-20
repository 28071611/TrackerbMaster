// Script to import GeoIP CSV dataset into MongoDB as IP ranges
// Usage: node scripts/importGeoIP.js <csvfile>

const mongoose = require('mongoose');
const fs = require('fs');
const readline = require('readline');
const IpRange = require('../models/IpRange');

function ipToNumber(ip) {
  return ip.split('.').reduce((acc, part) => acc * 256 + parseInt(part), 0);
}

async function importCSV(file) {
  await mongoose.connect('mongodb://localhost:27017/iptracker');
  const rl = readline.createInterface({ input: fs.createReadStream(file), crlfDelay: Infinity });
  let count = 0;
  for await (const line of rl) {
    if (line.startsWith('start_ip')) continue; // skip header
    const [start_ip, end_ip, country, region, city, isp, lat, lon] = line.split(',');
    await IpRange.create({
      start_ip,
      end_ip,
      start_num: ipToNumber(start_ip),
      end_num: ipToNumber(end_ip),
      country,
      region,
      city,
      isp,
      lat: parseFloat(lat),
      lon: parseFloat(lon)
    });
    count++;
    if (count % 1000 === 0) console.log(`${count} records imported...`);
  }
  console.log('Import complete.');
  process.exit(0);
}

if (process.argv.length < 3) {
  console.error('Usage: node scripts/importGeoIP.js <csvfile>');
  process.exit(1);
}

importCSV(process.argv[2]);
