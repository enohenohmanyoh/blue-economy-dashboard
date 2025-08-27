import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OnlineCourseList.css";

const API_URL = "http://localhost:8080/api/admin";

const OnlineCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseTitle: "",
    category: "",
    instructorName: "",
    duration: ""
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch courses
  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/get/all/online/course`);
      setCourses(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to fetch courses. Please check your server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { courseCode, courseTitle, category, instructorName, duration } = formData;
    if (!courseCode || !courseTitle || !category || !instructorName || !duration) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setError("");
      if (editId) {
        await axios.put(`${API_URL}/update/online/course/${editId}`, formData);
        setEditId(null);
      } else {
        await axios.post(`${API_URL}/create/online/course`, formData);
      }
      setFormData({
        courseCode: "",
        courseTitle: "",
        category: "",
        instructorName: "",
        duration: ""
      });
      fetchCourses();
    } catch (err) {
      console.error("Error saving course:", err);
      setError("Failed to save course. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`${API_URL}/delete/online/course/${id}`);
        fetchCourses();
      } catch (err) {
        console.error("Error deleting course:", err);
        setError("Failed to delete course. Please try again.");
      }
    }
  };

  const handleEdit = (course) => {
    setFormData({
      courseCode: course.courseCode,
      courseTitle: course.courseTitle,
      category: course.category,
      instructorName: course.instructorName,
      duration: course.duration
    });
    setEditId(course.id);
  };

  const handleCancel = () => {
    setFormData({
      courseCode: "",
      courseTitle: "",
      category: "",
      instructorName: "",
      duration: ""
    });
    setEditId(null);
    setError("");
  };

  return (
    <div className="course-container">
      <div className="course-card">
        <h2>Online Course Management</h2>

        {/* Form */}
        <form className="course-form" onSubmit={handleSubmit}>
          <h3>{editId ? "Edit Course" : "Register New Course"}</h3>

          <input
            type="text"
            name="courseCode"
            placeholder="Course Code"
            value={formData.courseCode}
            onChange={handleChange}
          />
          <input
            type="text"
            name="courseTitle"
            placeholder="Course Title"
            value={formData.courseTitle}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <input
            type="text"
            name="instructorName"
            placeholder="Instructor Name"
            value={formData.instructorName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 6 weeks)"
            value={formData.duration}
            onChange={handleChange}
          />

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {editId ? "Update Course" : "Register Course"}
            </button>
            {editId && (
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {/* Table */}
        <h3>Registered Courses</h3>
        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : courses.length === 0 ? (
          <p className="no-courses">No courses registered yet.</p>
        ) : (
          <div className="table-container">
            <table className="course-table">
              <thead>
                <tr>
                  <th>Course Code</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Instructor</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.courseCode}</td>
                    <td>{course.courseTitle}</td>
                    <td>{course.category}</td>
                    <td>{course.instructorName}</td>
                    <td>{course.duration}</td>
                    <td>
                      <button className="edit-btn" onClick={() => handleEdit(course)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(course.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineCourseList;
