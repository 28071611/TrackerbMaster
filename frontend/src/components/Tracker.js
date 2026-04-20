import React, { useState } from 'react';
import { trackIP } from '../services/api';
import ResultCard from './ResultCard';
import MapView from './MapView';

function Tracker() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await trackIP(ip);
      setData(res.data);
    } catch (err) {
      setError('Invalid IP or server error');
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>IP Location Tracker</h2>
      <input
        type="text"
        placeholder="Enter IP Address"
        value={ip}
        onChange={e => setIp(e.target.value)}
      />
      <button onClick={handleTrack} disabled={loading}>
        {loading ? 'Tracking...' : 'Track'}
      </button>
      {error && <p style={{color:'red'}}>{error}</p>}
      {data && <ResultCard data={data} />}
      {data && <MapView lat={data.lat} lon={data.lon} city={data.city} country={data.country} isp={data.isp} />}
    </div>
  );
}

export default Tracker;
