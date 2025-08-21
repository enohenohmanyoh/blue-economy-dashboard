import React, { useState, useEffect } from "react";
import "./EventForm.css";

const EventForm = ({ initialData, onSuccess }) => {
  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    allDay: false,
  });

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setEvent({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 16),
        endDate: initialData.endDate?.slice(0, 16),
      });
    } else {
      setEvent({
        title: "",
        description: "",
        location: "",
        startDate: "",
        endDate: "",
        allDay: false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent({ ...event, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/create/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("Failed to save event");
      }

      const savedEvent = await response.json();

      if (onSuccess) {
        onSuccess(savedEvent); // notify parent component
      }

      alert("Event created successfully!");
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Error saving event.");
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Event" : "Create Event"}</h3>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={event.title}
        onChange={handleChange}
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={event.description}
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={event.location}
        onChange={handleChange}
      />

      <input
        type="datetime-local"
        name="startDate"
        value={event.startDate}
        onChange={handleChange}
        required
      />

      <input
        type="datetime-local"
        name="endDate"
        value={event.endDate}
        onChange={handleChange}
        required
      />

      <label className="checkbox-label">
        <input
          type="checkbox"
          name="allDay"
          checked={event.allDay}
          onChange={handleChange}
        />
        All Day Event
      </label>

      <button type="submit">
        {initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
};

export default EventForm;
