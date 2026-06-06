import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map centering when coordinates change
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 12);
  }, [center, map]);
  return null;
}

function MapView({ lat, lon, city, country, isp }) {
  const position = [lat, lon];

  return (
    <MapContainer
      center={position}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <ChangeView center={position} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div style={{ color: '#333' }}>
            <strong>{city}</strong>, {country}<br />
            <span style={{ fontSize: '0.8rem' }}>{isp}</span>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
