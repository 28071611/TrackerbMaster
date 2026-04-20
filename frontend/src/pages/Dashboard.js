import React from 'react';
import Tracker from '../components/Tracker';

function Dashboard() {
  return (
    <div style={{maxWidth:600,margin:'40px auto',padding:24}}>
      <h1>IP-Based Mobile Network Location Tracker</h1>
      <Tracker />
    </div>
  );
}

export default Dashboard;
