import React, { useState } from "react";
import "./login.css";
import loginImage from "../../assets/login.png";
import { TextField, Select, MenuItem, Button, InputLabel, FormControl, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { // Default role set to 'owner'
    e.preventDefault();
    setError(null);
    setSuccess(null);
    localStorage.setItem("role", formData.role);

    const url =
      formData.role === "owner"
        ? "http://127.0.0.1:8000/api/owners/login"
        : "http://127.0.0.1:8000/api/users/login";

    try {
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setSuccess("Login successful!");
        localStorage.setItem("token", response.data.token);
        toast.success("Log in successfully!");

        setTimeout(() => {
          if (formData.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/home");
          }
        });
      } else {
        setError("Login failed. Please try again.");
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="loginContainer">
        <div className="left">
          <img src={loginImage} alt="Login" className="loginImage" />
          <div className="text-ontop">
            <span className="stay">Stay</span>
            <span className="easy">Easy</span>
          </div>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit} action='/home' method="post">
            <h1>Login</h1>

            {/* Display success or error messages */}
            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {/* Email */}
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Password */}
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Role Selection */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Role</InputLabel>
              <Select name="role" value={formData.role} onChange={handleChange} label="Role">
                <MenuItem value="user">User</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              sx={{ marginTop: "10px", marginBottom: "10px", width: "60%", background: '#3252DF' }}
            >
              Login
            </Button>
            <p>I don't have account <a href='/register'>Register</a></p>
          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;
