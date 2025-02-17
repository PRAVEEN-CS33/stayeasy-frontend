import React, { useEffect, useState } from 'react';
import './booking.css';
import BookingCard from '../../components/bookingCard/BookingCard';
import { BookingService } from '../../services/api';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await BookingService.getAll();
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error('Response data is not an array:', response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.error('Too many requests. Please try again later.');
      } else {
        console.error('Error fetching bookings:', error);
      }
    }
  };

  const handleDelete = async (id, data) => {
    try {
      const res = await BookingService.update(id, data);
      console.log(res.data);
    } catch (e) {
      console.error("Error on deleting:", e)
    } finally {
      getBookings();
    }
  }

  const handleEdit = async (id) => {

  }

  return (
    <div className='bookingsPage'>
      <div className='bookingContainer'>
        <h1>Bookings</h1>
        <div className='parentCards'>
          {bookings.map((booking) => (
            <BookingCard page={"booking"} key={booking.id} row={booking} status={booking.booking_status} handleDelete={handleDelete} handleEdit={handleEdit} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bookings;
