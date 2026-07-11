import React from 'react';

const FlightCard = ({ flight, onBook }) => {
  const getClassDisplay = (classes) => {
    if (classes.includes('First')) return 'First';
    if (classes.includes('Business')) return 'Business';
    if (classes.includes('Premium')) return 'Premium';
    return 'Economy';
  };

  return (
    <div className="flight-card">
      <div className="flight-info">
        <div className="flight-airline">
          <img src={flight.image} alt={flight.airline} />
          <div>
            <div className="airline-name">{flight.airline}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{flight.flightNumber}</div>
          </div>
        </div>
        <div className="flight-route">
          <div>
            <span className="route-city">{flight.fromCode}</span>
            <span className="route-time"> {flight.departureTime}</span>
          </div>
          <i className="fas fa-arrow-right" style={{ color: '#94a3b8' }}></i>
          <div>
            <span className="route-city">{flight.toCode}</span>
            <span className="route-time"> {flight.arrivalTime}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: '#475569' }}>
          <span><i className="far fa-clock"></i> {flight.duration}</span>
          <span><i className="fas fa-chair"></i> {getClassDisplay(flight.classes)}</span>
          {flight.amenities && flight.amenities.length > 0 && (
            <span><i className="fas fa-wifi"></i> {flight.amenities.slice(0, 2).join(', ')}</span>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div className="flight-price">${flight.price} <small>pp</small></div>
        <button className="book-btn" onClick={() => onBook(flight)}>
          <i className="fas fa-ticket-alt"></i> Book
        </button>
      </div>
    </div>
  );
};

export default FlightCard;