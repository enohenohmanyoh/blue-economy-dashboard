import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./auth/login";
import Register from "./auth/register";

import UserList from "./admin/UserList";
import CourseList from "./pages/CourseList";
import EventsList from "./pages/EventsList";
import PaymentsList from "./pages/PaymentsList";
import AdminHome from "./pages/AdminHome";

import "./App.css";
import EventRegisterList from "./pages/EventRegisterList";
import OnlineCourse from "./pages/OnlineCourseList";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  return (
  
      <div className="app">

        {/* Pass setIsAuthenticated so Header can handle logout */}
        <Header setIsAuthenticated={setIsAuthenticated} />

        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected dashboard routes */}
          <Route
            path="/user/dashboard/:id/*"
            element={
              isAuthenticated ? (
                <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
          >
            {/* Nested routes inside dashboard */}
            <Route index element={<AdminHome />} />
            <Route path="user/list" element={<UserList />} />
            <Route path="payment/list" element={<PaymentsList />} />
            <Route path="course/list" element={<CourseList />} />
            <Route path="online/course" element={<OnlineCourse />} />

            <Route path="event/list" element={<EventsList />} />
           <Route path="event/register" element={<EventRegisterList/>} />
            
            <Route path="settings" element={<p>Settings Page (Coming Soon)</p>} />
          </Route>

          {/* Default route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to={`/user/dashboard/${localStorage.getItem("userId")}`} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>

        <Footer />
      </div>

  );
}

export default App;


            