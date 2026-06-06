import React from 'react';

function ResultCard({ data }) {
  return (
    <div className="results-grid">
      <div className="info-item">
        <span className="info-label">IP Address</span>
        <span className="info-value">{data.ip}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Location</span>
        <span className="info-value">{data.city}, {data.region}, {data.country}</span>
      </div>
      <div className="info-item">
        <span className="info-label">ISP / Network</span>
        <span className="info-value">{data.isp || 'Unknown'}</span>
      </div>
      <div className="info-item">
        <span className="info-label">Coordinates</span>
        <span className="info-value">{parseFloat(data.lat).toFixed(4)}, {parseFloat(data.lon).toFixed(4)}</span>
      </div>
    </div>
  );
}

export default ResultCard;
