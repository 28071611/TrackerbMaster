import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function MapView({ lat, lon, city, country, isp }) {
  return (
    <div style={{height:400,marginTop:16}}>
      <MapContainer center={[lat, lon]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]}>
          <Popup>
            {city}, {country} <br /> ISP: {isp}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;
