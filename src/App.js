import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import './App.css';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Bookings from './pages/bookings/Bookings';
import NavBar from './components/navbar/NavBar';
import Footer from './components/footer/footer';
import AdminBooking from './pages/adminBooking/AdminBooking';
import AdminSchedules from './pages/adminSchedules/AdminSchedules';
import AdminDashBoard from './pages/adminDashBoard/AdminDashBoard';
import AdminAccommodations from './pages/adminAccommodations/AdminAccommodations';
import { ToastContainer } from "react-toastify";
import { Schedule } from '@mui/icons-material';
import Schedules from './pages/schedule/Schedules';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Details from './pages/details/Details';

function App() {
  return (
    <BrowserRouter>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppWithNavBar />
      </LocalizationProvider>
    </BrowserRouter>
  );
}

function AppWithNavBar() {
  const location = useLocation();
  const [role, setRole] = useState('');
  const isAdminDashboard = location.pathname === '/owner/admin';

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  const shouldRenderNavBar = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <div className='appContainer'>
      {shouldRenderNavBar && <NavBar />}
      <div className={`routes ${isAdminDashboard ? 'admin-bg' : ''}`}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Public Routes */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/details' element={<Details />} />

          {/* User Routes */}
          {role === 'user' && (
            <>
              <Route path='/user/bookings' element={<Bookings />} />
              <Route path='/user/schedules' element={<Schedules />} />
            </>
          )}

          {/* Owner Routes */}
          {role === 'owner' && (
            <>
              <Route path='/owner/admin' element={<AdminDashBoard />} />
              <Route path='/owner/accommodations' element={<AdminAccommodations />} />
              <Route path='/owner/bookings' element={<AdminBooking />} />
              <Route path='/owner/schedules' element={<AdminSchedules />} />
            </>
          )}
        </Routes>
      </div>
      {shouldRenderNavBar && <Footer />}
    </div>
  );
}

export default App;
