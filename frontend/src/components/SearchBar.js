import React, { useState } from 'react';

const SearchBar = ({ onSearch, filters }) => {
  const [from, setFrom] = useState(filters.from || '');
  const [to, setTo] = useState(filters.to || '');
  const [date, setDate] = useState(filters.date || '');
  const [passengers, setPassengers] = useState(filters.passengers || 1);
  const [seatClass, setSeatClass] = useState(filters.class || 'all');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ from, to, date, passengers, class: seatClass });
  };

  return (
    <form className="search-grid" onSubmit={handleSubmit}>
      <div className="field">
        <label><i className="fas fa-map-pin"></i> From</label>
        <input 
          type="text" 
          value={from} 
          onChange={(e) => setFrom(e.target.value)}
          placeholder="City or airport" 
        />
      </div>
      <div className="field">
        <label><i className="fas fa-location-dot"></i> To</label>
        <input 
          type="text" 
          value={to} 
          onChange={(e) => setTo(e.target.value)}
          placeholder="Destination" 
        />
      </div>
      <div className="field">
        <label><i className="fas fa-calendar-day"></i> Depart</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="field" style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <label><i className="fas fa-user"></i> Travellers</label>
          <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label><i className="fas fa-chair"></i> Class</label>
          <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)}>
            <option value="all">All</option>
            <option value="Economy">Economy</option>
            <option value="Premium">Premium</option>
            <option value="Business">Business</option>
            <option value="First">First</option>
          </select>
        </div>
      </div>
      <div className="field" style={{ gridColumn: 'span 1' }}>
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i> Search flights
        </button>
      </div>
    </form>
  );
};

export default SearchBar;