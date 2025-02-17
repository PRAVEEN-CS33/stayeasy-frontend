import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Select, MenuItem, FormControl, } from '@mui/material';
import './adminschedules.css';
import { OwnerScheduledVisitService } from '../../services/api';
import { toast } from 'react-toastify';

const sampleSchedules = [
  {
    id: 1,
    accomId: 'A1001',
    accomName: 'Ocean View Apartment',
    userId: 'U101',
    userName: 'John Doe',
    visitDate: '2025-02-10',
    status: 'Scheduled',
  },
];

const paginationModel = { page: 0, pageSize: 10 };

function AdminSchedules() {
  const [schedules, setSchedules] = useState(sampleSchedules);

  const handleScheduleStatusChange = async(scheduleId, newStatus) => {
    try{
      setSchedules(schedules.map(schedule =>
        schedule.id === scheduleId ? { ...schedule, status: newStatus } : schedule
      ));
      await OwnerScheduledVisitService.update(scheduleId, {status:newStatus});
      toast.success("Schedule status updated successfully!");
    }catch(e){
      console.log("Error: ", e);
      toast.error("Unable to Schedule status update! Try again");
    }
  };
  useEffect(()=>{
    handleGetSchedule();
  },[])
  const handleGetSchedule = async (scheduleId, newStatus) => {
    try {
      const response = await OwnerScheduledVisitService.getAll();
      console.log(response.data);
      if (Array.isArray(response.data)) {
        const formatedData = response.data.map(
          ({
            visit_id,
            user_id,
            user_name,
            accommodation_id,
            accommodation_name,
            visit_date,
            status,
          }) => ({
            id: visit_id,
            accomId: accommodation_id,
            accomName: accommodation_name,
            userId: user_id,
            userName: user_name,
            visitDate: visit_date,
            status: status,
          })
        )
        setSchedules(formatedData)
      }
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted':
        return '#1ee0ac';
      case 'pending':
        return '#f4bd0e';
      case 'canceled':
        return '#f40e0ee6';
      default:
        return 'black';
    }
  };


  return (
    <div className="adminSchedulesContainer">
      <div className="admin-Schedules-body">
        <div className='admin-Schedules-head'>
          <h2>
            Visit Schedules
          </h2>
        </div>

        <Paper>
          <DataGrid
            rows={schedules}
            columns={[
              {
                field: 'accomId',
                headerName: 'Accom ID',
                flex: 1,
                renderCell: (params) => (
                  <span style={{ color: '#6576ff', fontWeight: 'bold' }}>{params.value}</span>
                ),
              },
              { field: 'accomName', headerName: 'Accom Name', flex: 1 },
              { field: 'userId', headerName: 'User ID', flex: 1 },
              { field: 'userName', headerName: 'User Name', flex: 1 },
              { field: 'visitDate', headerName: 'Visit Date', flex: 1 },
              {
                field: 'status',
                headerName: 'Schedule Status',
                width: 150,
                renderCell: (params) => (
                  <FormControl fullWidth>
                    <Select
                      value={params.row.status}
                      onChange={(e) => handleScheduleStatusChange(params.row.id, e.target.value)}
                      sx={{
                        border: 'none',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        },
                        color: getStatusColor(params.row.status),
                      }}
                    >
                      <MenuItem value="accepted">Accepted</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
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

export default AdminSchedules;
