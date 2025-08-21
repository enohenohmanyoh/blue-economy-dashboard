import React, { useEffect, useState } from "react";
import "./EventsList.css"; // make sure you have a CSS file

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEvent, setEditingEvent] = useState(null);

  // Fetch events from backend
  const fetchEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/get/all-event");
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
      const response = await fetch(
        `http://localhost:8080/api/delete/event/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Start editing
  const startEdit = (event) => {
    setEditingEvent(event);
  };

  // Save edited event
  const saveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/update/event/${editingEvent.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingEvent),
        }
      );

      if (response.ok) {
        const updated = await response.json();
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e.id === updated.id ? updated : e))
        );
        setEditingEvent(null);
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div className="events-container">
      <h2>Events List</h2>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
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
            {events.map((event) =>
              editingEvent && editingEvent.id === event.id ? (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>
                    <input
                      value={editingEvent.title}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          title: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingEvent.description}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          description: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      value={editingEvent.location}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          location: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editingEvent.startDate}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          startDate: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editingEvent.endDate}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          endDate: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={editingEvent.allDay}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          allDay: e.target.checked,
                        })
                      }
                    />
                  </td>
                  <td>
                    <button onClick={saveEdit} className="save-btn">
                      Save
                    </button>
                    <button
                      onClick={() => setEditingEvent(null)}
                      className="cancel-btn"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={event.id}>
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.startDate}</td>
                  <td>{event.endDate}</td>
                  <td>{event.allDay ? "Yes" : "No"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(event)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEvent(event.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EventsList;
