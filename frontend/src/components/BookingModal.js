import React, { useState } from 'react';
import { bookFlight } from '../services/api';

const BookingModal = ({ flight, onClose }) => {
  const [passengers, setPassengers] = useState(1);
  const [seatClass, setSeatClass] = useState('Economy');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBook = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await bookFlight({
        flightId: flight.id,
        passengers,
        class: seatClass,
        options: ['Wi-Fi', 'Meal']
      });
      setBooking(result.booking);
    } catch (err) {
      setError('Booking failed. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <h2 style={{ marginBottom: '16px' }}>
          <i className="fas fa-ticket-alt" style={{ color: '#2563eb', marginRight: '10px' }}></i>
          Book Flight
        </h2>

        {booking ? (
          <div className="booking-success">
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#059669' }}></i>
              <h3>Booking Confirmed!</h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
                Reference: <strong>{booking.reference}</strong>
              </p>
            </div>
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px' }}>
              <p><strong>{flight.airline}</strong> • {flight.flightNumber}</p>
              <p>{flight.from} → {flight.to}</p>
              <p>{flight.departureTime} - {flight.arrivalTime}</p>
              <p>{passengers} passenger(s) • {seatClass}</p>
              <p style={{ fontWeight: 'bold', marginTop: '8px' }}>
                Total: ${flight.price * passengers}
              </p>
            </div>
            <button className="search-btn" onClick={onClose} style={{ marginTop: '16px', width: '100%' }}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flight-summary" style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <img src={flight.image} alt={flight.airline} style={{ width: '40px', height: '40px', borderRadius: '8px' }} />
                  <strong style={{ marginLeft: '8px' }}>{flight.airline}</strong>
                </div>
                <div>
                  <span className="route-city">{flight.fromCode}</span>
                  <i className="fas fa-arrow-right" style={{ margin: '0 8px', color: '#94a3b8' }}></i>
                  <span className="route-city">{flight.toCode}</span>
                </div>
                <div className="flight-price" style={{ fontSize: '1.2rem' }}>${flight.price}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div className="field">
                <label><i className="fas fa-user"></i> Passengers</label>
                <select value={passengers} onChange={(e) => setPassengers(Number(e.target.value))}>
                  {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="field">
                <label><i className="fas fa-chair"></i> Class</label>
                <select value={seatClass} onChange={(e) => setSeatClass(e.target.value)}>
                  {flight.classes.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
            </div>

            {error && <div style={{ color: '#dc2626', marginTop: '12px' }}>{error}</div>}

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button className="book-btn" onClick={handleBook} disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>
                {loading ? <i className="fas fa-spinner fa-spin"></i> : <><i className="fas fa-lock"></i> Confirm Booking</>}
              </button>
              <button className="search-btn" onClick={onClose} style={{ flex: 0.5, background: '#e2e8f0', color: '#1e293b', boxShadow: 'none' }}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 32px;
          padding: 32px;
          max-width: 480px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 1.2rem;
          color: #64748b;
          cursor: pointer;
        }
        .booking-success {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BookingModal;