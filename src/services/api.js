import axios from "axios";

// ✅ Use environment variable (defined in .env file at project root)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // e.g. https://blue-economy-backend.vercel.app/api
  withCredentials: true, // if your backend requires cookies
});

export default api;
