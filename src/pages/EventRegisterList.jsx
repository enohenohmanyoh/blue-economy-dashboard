import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventRegisterList.css"; // import your CSS

const API_BASE = "http://localhost:8080/api/admin"; // Replace with your backend URL

const EventRegisterList = () => {
  const [members, setMembers] = useState([]);

  // Fetch all members
  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE}/get/all/event/member`);
      setMembers(response.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Delete member
  const deleteMember = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`${API_BASE}/delete/member/${id}`);
      fetchMembers();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  return (
    <div className="events-container">
      <div className="events-card">
        <h2>Event Registration List</h2>

        <table className="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age Group</th>
              <th>Nationality</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.fullName}</td>
                <td>{m.email}</td>
                <td>{m.phone}</td>
                <td>{m.ageGroup}</td>
                <td>{m.nationality}</td>
                <td>{m.gender}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteMember(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegisterList;
