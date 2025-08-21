import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./CourseCreate.css";

const API_URL = "http://localhost:8080/api";

const CourseCreate = () => {
  const [course, setCourse] = useState({
    courseCode: "",
    courseTitle: "",
    category: "",
    duration: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/create-courses`, course);
      alert("✅ Course created successfully!");
      navigate("/"); // redirect to course list
    } catch (error) {
      console.error("Error creating course", error);
      alert("❌ Failed to create course");
    }
  };

  return (
    <div className="course-create">
      <h2>Create New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Course Code:</label>
        <input
          type="text"
          name="courseCode"
          value={course.courseCode}
          onChange={handleChange}
          required
        />

        <label>Course Title:</label>
        <input
          type="text"
          name="courseTitle"
          value={course.courseTitle}
          onChange={handleChange}
          required
        />

        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={course.category}
          onChange={handleChange}
          required
        />

        <label>Duration:</label>
        <input
          type="text"
          name="duration"
          value={course.duration}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Course</button>
      </form>

      <Link to="/">⬅ Back to Courses</Link>
    </div>
  );
};

export default CourseCreate;
