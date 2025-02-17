import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Select, MenuItem, FormControl } from '@mui/material';
import './adminbooking.css';
import { BookingService } from '../../services/api';
import { toast } from 'react-toastify';


const paginationModel = { page: 0, pageSize: 10 };

function AdminBooking() {
  const [bookings, setBookings] = useState();

  const handleBookingStatusChange = async (bookingId, newStatus) => {
    try {
      setBookings(bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
      await BookingService.ownerUpdate(bookingId, { status: newStatus });
      toast.success("Booking status updated successfully!");
    } catch (e) {
      console.log("error: ", e);
      toast.error("Unable to Booking status update! Try again");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#1ee0ac';
      case 'pending': return '#f4bd0e';
      case 'canceled': return '#f40e0ee6';
      default: return 'black';
    }
  };

  useEffect(() => {
    getBookings();
  }, [])

  const getBookings = async () => {
    try {
      const response = await BookingService.ownerView();
      if (Array.isArray(response.data)) {
        const formattedRows = response.data.map(
          ({
            id,
            accommodation_id,
            accommodation_name,
            user_id,
            user_name,
            check_in,
            check_out,
            amount,
            booking_status,
            booking_date,
            payment_status,
            sharing_rent_type_id,
            no_of_slots
          }) => ({
            id,
            accomId: accommodation_id,
            accomName: accommodation_name,
            userId: user_id,
            userName: user_name,
            checkIn: check_in,
            checkOut: check_out,
            Amount: amount,
            bookingDate: booking_date,
            paymentStatus: payment_status,
            status: booking_status,
            typeId:sharing_rent_type_id,
            slots:no_of_slots,
            actions: "",
          })
        );

        setBookings(formattedRows);
      }
    } catch (e) {
      console.error("Error:", e);
    }
  };



  return (
    <div className="adminBookingContainer">
      <div className="admin-booking-body">
        <div className="admin-booking-head">
          <h2>Bookings</h2>
        </div>
        <Paper>
          <DataGrid
            rows={bookings}
            columns={[
              { field: 'accomId', headerName: 'Accom ID', flex: 1, renderCell: (params) => <span style={{ color: '#6576ff', fontWeight: 'bold' }}>{params.value}</span> },
              { field: 'accomName', headerName: 'Accom Name', flex: 1 },
              { field: 'userId', headerName: 'User ID', flex: 1 },
              { field: 'userName', headerName: 'User Name', flex: 1 },
              { field: 'typeId', headerName: 'sharing ID', flex: 1 },
              { field: 'slots', headerName: 'No of Beds', flex: 1 },
              { field: 'checkIn', headerName: 'Check-in', flex: 1 },
              { field: 'checkOut', headerName: 'Check-out', flex: 1 },
              { field: 'Amount', headerName: 'Amount', flex: 1 },
              { field: 'bookingDate', headerName: 'Booking Date', flex: 1 },
              { field: 'paymentStatus', headerName: 'Payment Status', flex: 1 },
              {
                field: 'status',
                headerName: 'Booking Status',
                width: 150,
                renderCell: (params) => (
                  <FormControl fullWidth>
                    <Select
                      value={params.row.status}
                      onChange={(e) => handleBookingStatusChange(params.row.id, e.target.value)}
                      sx={{
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        },
                        color: getStatusColor(params.row.status)
                      }}
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="confirmed">Confirmed</MenuItem>
                      <MenuItem value="canceled">Canceled</MenuItem>
                    </Select>
                  </FormControl>
                ),
              },
            ]}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
            sx={{
              border: 0,
              '& .MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: '#f5f5f5' },
            }}
          />
        </Paper>
      </div>
    </div>
  );
}

export default AdminBooking;
