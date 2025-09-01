// src/api.js
import axios from "axios";

// Get backend URL from environment variable
const API_BASE = import.meta.env.VITE_API_URL;

// ✅ Debug log to confirm the environment variable is loaded
console.log("API URL:", API_BASE);

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
