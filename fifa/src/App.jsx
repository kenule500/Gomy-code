import React from 'react';
import PlayersList from './PlayersList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '40px 0' }}>
      <h1 className="text-center mb-5 fw-bold" style={{ color: '#1a1a1a' }}>
        BRCA Royal Legends FIFA Collection
      </h1>
      <PlayersList />
    </div>
  );
}

export default App;