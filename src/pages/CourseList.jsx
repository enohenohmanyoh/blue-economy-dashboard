// src/pages/CourseList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CourseList.css";

// Use environment variable, fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/admin";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    category: "",
    duration: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/get/all/course`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await axios.put(`${API_URL}/update/course/${editingCourse.id}`, formData);
        setEditingCourse(null);
      } else {
        await axios.post(`${API_URL}/create/course`, formData);
      }
      setFormData({ courseCode: "", courseTitle: "", category: "", duration: "" });
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      courseCode: course.courseCode,
      courseTitle: course.courseTitle,
      category: course.category,
      duration: course.duration
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/course/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="events-container">
      <div className="events-card">
        <h2>{editingCourse ? "Edit Course" : "Add New Course"}</h2>
        <form className="event-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="courseTitle"
            placeholder="Course Title"
            value={formData.courseTitle}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
          <div className="form-buttons">
            <button type="submit" className="edit-btn">
              {editingCourse ? "Update" : "Create"}
            </button>
            {editingCourse && (
              <button type="button" className="delete-btn" onClick={() => setEditingCourse(null)}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2>All Courses</h2>
        <table className="events-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Code</th>
              <th>Title</th>
              <th>Category</th>
              <th>Duration</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.courseCode}</td>
                <td>{c.courseTitle}</td>
                <td>{c.category}</td>
                <td>{c.duration}</td>
                <td>{new Date(c.createdAt).toLocaleString()}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(c)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CourseList;
