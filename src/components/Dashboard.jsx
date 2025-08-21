// Dashboard.jsx
import React, { useState } from "react";
import EventsList from "../pages/EventsList";
import CourseList from "../pages/CourseList";
import PaymentsList from "../pages/PaymentsList"; 
import EventForm from "../pages/EventForm"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("events");

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <h2 className="sidebar-title">Admin</h2>
        <ul>
          <li 
            className={activeTab === "events" ? "active" : ""} 
            onClick={() => setActiveTab("events")}
          >
            📅 Events
          </li>
          <li 
            className={activeTab === "courses" ? "active" : ""} 
            onClick={() => setActiveTab("courses")}
          >
            🎓 Courses
          </li>
          <li 
            className={activeTab === "payments" ? "active" : ""} 
            onClick={() => setActiveTab("payments")}
          >
            💳 Payments
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </header>

        <div className="dashboard-content">
          {activeTab === "events" && (
            <div>
              <EventForm onSuccess={() => window.location.reload()} />
              <EventsList />
            </div>
          )}
          {activeTab === "courses" && <CourseList />}
          {activeTab === "payments" && <PaymentsList />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
