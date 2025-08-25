import React from "react";
import { Link } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  return (
    <div className="admin-home-container">

      {/* Quick Links */}
      <section className="quick-links">
        <h2>Quick Actions</h2>
        <div className="links-grid">
          <Link to="user/list" className="quick-btn">Manage Users</Link>
          <Link to="payment/list" className="quick-btn">Manage Payments</Link>
          <Link to="course/list" className="quick-btn">Manage Courses</Link>
          <Link to="event/list" className="quick-btn">Manage Events</Link>
          <Link to="settings" className="quick-btn">Settings</Link>
        </div>
      </section>

      {/* Welcome Header */}
      <header className="admin-home-header">
        <h1>Welcome Back, Admin!</h1>
        <p>Here’s a quick overview of your system.</p>
      </header>

      {/* Stats Cards */}
      <section className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p>1,245</p>
        </div>
        <div className="card">
          <h3>Total Payments</h3>
          <p>$32,410</p>
        </div>
        <div className="card">
          <h3>Courses</h3>
          <p>18</p>
        </div>
        <div className="card">
          <h3>Pending Approvals</h3>
          <p>7</p>
        </div>
      </section>

      {/* Recent Activity Table */}
      <section className="recent-activity">
        <h2>Recent Payments</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>John Doe</td>
              <td>$200</td>
              <td className="paid">Paid</td>
              <td>2025-08-24</td>
            </tr>
            <tr>
              <td>102</td>
              <td>Jane Smith</td>
              <td>$150</td>
              <td className="pending">Pending</td>
              <td>2025-08-23</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminHome;
