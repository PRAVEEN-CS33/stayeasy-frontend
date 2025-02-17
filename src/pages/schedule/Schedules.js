import React, { useEffect, useState } from 'react';
import BookingCard from '../../components/bookingCard/BookingCard';
import { ScheduledVisitService } from '../../services/api';

function Schedules() {
  const [schedule, setSchedules] = useState([]);
  useEffect(() => {
    gets();
  }, []);
  const gets = async () => {
    try {
      const response = await ScheduledVisitService.getAll();
      if (Array.isArray(response.data)) {
        setSchedules(response.data);
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
  const handleDelete = async (id, data)=>{
      try{
        const res = await ScheduledVisitService.update(id, data);
        console.log(res.data);
      }catch(e){
        console.error("Error on deleting:", e)
      }finally{
        gets();
      }
    }
  
    const handleEdit = async (id)=> {
  
    }

  return (
    <div className='bookingsPage'>
      <div className='bookingContainer'>
        <h1>Scheduled Visites</h1>
        <div className='parentCards'>
          {schedule.map((schedul) => (
            <BookingCard page={"schedules"} key={schedul.visit_id} row={schedul} status={schedul.status} handleDelete={handleDelete} handleEdit={handleEdit}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Schedules;
