import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getFlights = async (filters = {}) => {
  try {
    const response = await api.get('/flights', { params: filters });
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};

export const getFlightById = async (id) => {
  try {
    const response = await api.get(`/flights/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching flight:', error);
    return null;
  }
};

export const bookFlight = async (bookingData) => {
  try {
    const response = await api.post('/flights/book', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error booking flight:', error);
    throw error;
  }
};

export default api;