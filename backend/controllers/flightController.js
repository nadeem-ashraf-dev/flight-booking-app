const fs = require('fs');
const path = require('path');

const flightsDataPath = path.join(__dirname, '../data/flights.json');

const readFlights = () => {
  try {
    const data = fs.readFileSync(flightsDataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeFlights = (flights) => {
  fs.writeFileSync(flightsDataPath, JSON.stringify(flights, null, 2));
};

exports.getFlights = (req, res) => {
  const { from, to, date, passengers, class: seatClass, direct } = req.query;
  let flights = readFlights();

  if (from) {
    flights = flights.filter(f => 
      f.from.toLowerCase().includes(from.toLowerCase()) || 
      f.fromCode.toLowerCase().includes(from.toLowerCase())
    );
  }
  if (to) {
    flights = flights.filter(f => 
      f.to.toLowerCase().includes(to.toLowerCase()) || 
      f.toCode.toLowerCase().includes(to.toLowerCase())
    );
  }
  if (date) {
    flights = flights.filter(f => f.departureDate === date);
  }
  if (direct === 'true') {
    flights = flights.filter(f => f.direct);
  }
  if (seatClass && seatClass !== 'all') {
    flights = flights.filter(f => f.classes.includes(seatClass));
  }

  res.json({
    success: true,
    count: flights.length,
    data: flights
  });
};

exports.getFlightById = (req, res) => {
  const flights = readFlights();
  const flight = flights.find(f => f.id === parseInt(req.params.id));
  
  if (!flight) {
    return res.status(404).json({ success: false, message: 'Flight not found' });
  }
  
  res.json({ success: true, data: flight });
};

exports.bookFlight = (req, res) => {
  const { flightId, passengers, class: seatClass, options } = req.body;
  
  if (!flightId) {
    return res.status(400).json({ success: false, message: 'Flight ID required' });
  }

  const flights = readFlights();
  const flightIndex = flights.findIndex(f => f.id === parseInt(flightId));
  
  if (flightIndex === -1) {
    return res.status(404).json({ success: false, message: 'Flight not found' });
  }

  const bookingRef = 'SKW' + Math.random().toString(36).substring(2, 8).toUpperCase();
  flights[flightIndex].availableSeats -= passengers || 1;
  writeFlights(flights);

  res.json({
    success: true,
    booking: {
      reference: bookingRef,
      flight: flights[flightIndex],
      passengers: passengers || 1,
      class: seatClass || 'Economy',
      options: options || [],
      bookedAt: new Date().toISOString()
    }
  });
};