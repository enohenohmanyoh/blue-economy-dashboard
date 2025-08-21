import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseForm from "./CourseForm";
import "./CourseList.css";

const API_URL = "http://localhost:8080/api";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/get/all-courses`);
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleCreate = async (course) => {
    try {
      await axios.post(`${API_URL}/create-courses`, course);
      fetchCourses();
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleUpdate = async (course) => {
    try {
      await axios.put(`${API_URL}/update/${editingCourse.id}`, {
        ...editingCourse, // keep ID
        ...course,        // overwrite updated fields
      });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/delete/${id}`);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="course-container">
      <h2>{editingCourse ? "Edit Course" : "Add New Course"}</h2>
      <CourseForm
        onSubmit={editingCourse ? handleUpdate : handleCreate}
        initialData={editingCourse}
      />

      <h2>All Courses</h2>
      <table className="course-table">
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
                <button onClick={() => setEditingCourse(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseList;
