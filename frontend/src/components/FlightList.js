import React from 'react';
import FlightCard from './FlightCard';

const FlightList = ({ flights, loading, onBook }) => {
  if (loading) {
    return (
      <div className="flight-results">
        <div className="section-title">
          <h2><i className="fas fa-plane-arrival" style={{ color: '#2563eb', marginRight: '10px' }}></i>Searching flights...</h2>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#2563eb' }}></i>
        </div>
      </div>
    );
  }

  if (!flights || flights.length === 0) {
    return (
      <div className="flight-results">
        <div className="section-title">
          <h2><i className="fas fa-plane-arrival" style={{ color: '#2563eb', marginRight: '10px' }}></i>No flights found</h2>
        </div>
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          <i className="fas fa-plane" style={{ fontSize: '2rem', marginBottom: '12px', display: 'block' }}></i>
          Try adjusting your search filters
        </div>
      </div>
    );
  }

  return (
    <div className="flight-results">
      <div className="section-title">
        <h2><i className="fas fa-plane-arrival" style={{ color: '#2563eb', marginRight: '10px' }}></i>Available flights · 2026</h2>
        <span><i className="far fa-clock"></i> {flights.length} results</span>
      </div>
      {flights.map(flight => (
        <FlightCard key={flight.id} flight={flight} onBook={onBook} />
      ))}
    </div>
  );
};

export default FlightList;