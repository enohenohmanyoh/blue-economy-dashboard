// src/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Force register as USER
      await axios.post("http://localhost:8080/api/auth/admin/register", formData);

      setMessage("✅ Registration successful! You can now log in.");
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        birthDate: "",
        gender: "",
      });

      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthDate"
          placeholder="Birth Date"
          value={formData.birthDate}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        {/* Removed Role Dropdown */}

        <button type="submit">Register</button>
        {message && <p className="message">{message}</p>}

        <p className="back-to-login">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="back-button"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
