import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ExtraOptions from './components/ExtraOptions';
import FlightList from './components/FlightList';
import StatsDashboard from './components/StatsDashboard';
import BookingModal from './components/BookingModal';
import { getFlights } from './services/api';

function App() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    from: 'New York',
    to: 'London',
    date: '2026-07-15',
    passengers: 2,
    class: 'all',
    direct: false
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, [filters]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const data = await getFlights(filters);
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
    setLoading(false);
  };

  const handleSearch = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleBookFlight = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedFlight(null);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="booking-card">
        <SearchBar onSearch={handleSearch} filters={filters} />
        <ExtraOptions />
        <FlightList 
          flights={flights} 
          loading={loading} 
          onBook={handleBookFlight} 
        />
      </div>

      <StatsDashboard />

      {showModal && selectedFlight && (
        <BookingModal 
          flight={selectedFlight} 
          onClose={closeModal} 
        />
      )}

      <div className="footer-note">
        <i className="fas fa-calendar-alt" style={{marginRight: '8px'}}></i>
        2026 flight trends • flexible fares • carbon neutral options • AI price prediction
      </div>
    </div>
  );
}

export default App;