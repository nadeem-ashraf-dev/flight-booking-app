const express = require('express');
const router = express.Router();
const { getFlights, getFlightById, bookFlight } = require('../controllers/flightController');

router.get('/', getFlights);
router.get('/:id', getFlightById);
router.post('/book', bookFlight);

module.exports = router;