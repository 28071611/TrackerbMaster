import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResultCard from './ResultCard';
import MapView from './MapView';

const API_BASE = 'http://localhost:5000/track-ip';

function Tracker() {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

  const handleTrack = async (targetIp) => {
    const searchIp = targetIp || ip;
    if (!searchIp) return;

    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${API_BASE}/`, { ip: searchIp });
      setData(res.data);
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to track IP address');
      setData(null);
    }
    setLoading(false);
  };

  return (
    <div className="tracker-container">
      <div className="tracker-card">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by IPv4 Address (e.g. 8.8.8.8)"
            value={ip}
            onChange={e => setIp(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleTrack()}
          />
          <button onClick={() => handleTrack()} disabled={loading}>
            {loading ? 'Searching...' : 'Explore IP'}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {data && <ResultCard data={data} />}
      </div>

      {data && (
        <div className="map-wrapper">
          <MapView
            lat={data.lat}
            lon={data.lon}
            city={data.city}
            country={data.country}
            isp={data.isp}
            key={`${data.lat}-${data.lon}`}
          />
        </div>
      )}

      {history.length > 0 && (
        <section className="history-section">
          <h2 className="history-title">Recent Searches</h2>
          <div className="history-list">
            {history.map((item, index) => (
              <div
                key={index}
                className="history-item"
                onClick={() => {
                  setIp(item.ip);
                  handleTrack(item.ip);
                }}
              >
                <div>
                  <span style={{ fontWeight: 600 }}>{item.ip}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '1rem' }}>
                    {item.city}, {item.country}
                  </span>
                </div>
                <div style={{ color: 'var(--accent-color)', fontSize: '0.9rem' }}>
                  View Details →
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Tracker;
