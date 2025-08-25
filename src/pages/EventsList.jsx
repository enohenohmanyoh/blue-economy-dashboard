import React, { useEffect, useState } from "react";
import "./EventsList.css";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null); // if set → edit mode
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    allDay: false,
  });

  // Fetch events from backend
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/admin/get/all/event");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/admin/delete/event/${id}`, { method: "DELETE" });
      if (response.ok) {
        setEvents(events.filter((e) => e.id !== id));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // Submit form for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingEvent
      ? `http://localhost:8080/api/admin/update/event/${editingEvent.id}`
      : "http://localhost:8080/api/admin/create/event";
    const method = editingEvent ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save event");

      const savedEvent = await response.json();

      if (editingEvent) {
        setEvents(events.map((e) => (e.id === savedEvent.id ? savedEvent : e)));
      } else {
        setEvents([...events, savedEvent]);
      }

      resetForm();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      allDay: false,
    });
    setEditingEvent(null);
    setShowForm(false);
  };

  // Open form for editing
  const startEditing = (event) => {
    setEditingEvent(event);
    setFormData({
      ...event,
      startDate: event.startDate?.slice(0, 16),
      endDate: event.endDate?.slice(0, 16),
    });
    setShowForm(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading events...</p>;

  return (
    <div className="events-container">
      <div className="events-card">
        <h2>Events Manager</h2>

        {!showForm && (
          <button onClick={() => setShowForm(true)} className="create-btn">
            + Create New Event
          </button>
        )}

        {showForm && (
          <form onSubmit={handleSubmit} className="event-form">
            <h3>{editingEvent ? "Edit Event" : "Create Event"}</h3>

            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />

            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />

            <input
              type="datetime-local"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />

            <label>
              <input
                type="checkbox"
                name="allDay"
                checked={formData.allDay}
                onChange={handleChange}
              />
              All Day Event
            </label>

            <div className="form-buttons">
              <button type="submit">
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
            </div>
          </form>
        )}

        <table className="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>All Day</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No events found.
                </td>
              </tr>
            ) : (
              events.map((event) => (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{new Date(event.startDate).toLocaleString()}</td>
                  <td>{new Date(event.endDate).toLocaleString()}</td>
                  <td>{event.allDay ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => startEditing(event)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsList;
