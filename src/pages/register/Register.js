import React, { useState } from 'react';
import './register.css';
import register from '../../assets/register.png';
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    role: '',
    address: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value !== "owner" ? { address: "" } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const url = formData.role === 'owner'
      ? 'http://127.0.0.1:8000/api/owners/register'
      : 'http://127.0.0.1:8000/api/users/register';

    try {
      const response = await axios.post(url, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        setSuccess('Registration successful!');
        setFormData({ name: '', email: '', password: '', password_confirmation: '', phone: '', role: 'user', address: '' });
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      setError(error.response?.data.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register'>
      <div className="registerContainer">
        <div className="left">
          <img src={register} alt="register" className="registerImage" />
          <div className="text-ontop">
            <span className="stay">Stay</span>
            <span className="easy">Easy</span>
          </div>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} className="formContainer">
            <h1>Register</h1>

            {/* Success & Error Messages */}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {/* Name */}
            <TextField label="Name" variant="outlined" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" size="small" />

            {/* Email */}
            <TextField label="Email" variant="outlined" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" size="small" />

            {/* Password */}
            <TextField label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" size="small" />

            {/* Confirm Password */}
            <TextField label="Confirm Password" variant="outlined" type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} fullWidth margin="normal" size="small" />

            {/* Phone Number */}
            <TextField label="Phone Number" variant="outlined" type="tel" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" size="small" />

            {/* Role Selection */}
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange} label="Role">
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </Select>
            </FormControl>

            {/* Address (only for Owner) */}
            {formData.role === "owner" && (
              <TextField label="Address" variant="outlined" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" size="small" />
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "10px",marginBottom: "10px", width: "50%", background:'#3252DF' }}
              disabled={loading} // Disable button while loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
            </Button>
            <p>I have account <a href='/login' >Login</a> </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
