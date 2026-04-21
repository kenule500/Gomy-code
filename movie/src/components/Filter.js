import React from 'react';

const Filter = ({ setTitleFilter, setRateFilter }) => {
  return (
    <div className="filter-section" style={{ margin: '20px' }}>
      <input 
        type="text" 
        placeholder="Search by title..." 
        onChange={(e) => setTitleFilter(e.target.value)} 
        style={{ padding: '8px', marginRight: '10px' }}
      />
      <input 
        type="number" 
        placeholder="Min Rating" 
        onChange={(e) => setRateFilter(e.target.value)} 
        style={{ padding: '8px', width: '100px' }}
      />
    </div>
  );
};

export default Filter;