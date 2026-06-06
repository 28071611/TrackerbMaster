import React from 'react';
import Tracker from '../components/Tracker';

function Dashboard() {
  return (
    <main>
      <header>
        <h1>IP Network Tracker</h1>
        <p className="subtitle">Discover physical location and network intelligence for any IP address</p>
      </header>
      <Tracker />
    </main>
  );
}

export default Dashboard;
