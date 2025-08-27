import React from "react";
import { Routes, Route } from "react-router-dom";

import "./AdminDashboard.css";
import UserList from "../admin/UserList";
import CourseList from "../pages/CourseList";
import EventsList from "../pages/EventsList";
import PaymentsList from "../pages/PaymentsList";
import AdminHome from "../pages/AdminHome";

import EventRegisterList from "../pages/EventRegisterList";

import OnlineCourseList from "../pages/OnlineCourseList";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Nested Routes */}
        <Routes>
          <Route index element={<AdminHome />} /> {/* default home */}
          <Route path="user/list" element={<UserList />} />
          <Route path="payment/list" element={<PaymentsList />} />
          <Route path="course/list" element={<CourseList />} />
          <Route path="online/course" element={<OnlineCourseList/>} />
          <Route path="event/list" element={<EventsList />} />
           <Route path="event/register" element={<EventRegisterList />} />
          <Route path="settings" element={<p>Settings Page (Coming Soon)</p>} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
