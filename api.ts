import axios from 'axios';

// Mock API call to fetch hotel booking data
export const fetchHotelData = async () => {
  const response = await axios.get('/path/to/hotel_bookings_1000.csv'); // Replace with correct path
  return response.data;
};
