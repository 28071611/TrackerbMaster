import React from 'react';

function ResultCard({ data }) {
  return (
    <div style={{border:'1px solid #ccc',padding:16,marginTop:16}}>
      <p><b>IP:</b> {data.ip}</p>
      <p><b>City:</b> {data.city}</p>
      <p><b>Region:</b> {data.region}</p>
      <p><b>Country:</b> {data.country}</p>
      <p><b>ISP:</b> {data.isp}</p>
      <p><b>Latitude:</b> {data.lat}</p>
      <p><b>Longitude:</b> {data.lon}</p>
    </div>
  );
}

export default ResultCard;
