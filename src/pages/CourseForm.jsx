import React, { useState, useEffect } from "react";
import "./CourseForm.css";

const CourseForm = ({ onSubmit, initialData }) => {
  const [course, setCourse] = useState({
    courseCode: "",
    courseTitle: "",
    category: "",
    duration: "",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setCourse(initialData);
    } else {
      setCourse({
        courseCode: "",
        courseTitle: "",
        category: "",
        duration: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(course);
    setCourse({
      courseCode: "",
      courseTitle: "",
      category: "",
      duration: "",
    });
  };

  return (
    <form className="course-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="courseCode"
        placeholder="Course Code"
        value={course.courseCode}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="courseTitle"
        placeholder="Course Title"
        value={course.courseTitle}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={course.category}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Duration"
        value={course.duration}
        onChange={handleChange}
        required
      />
      <button type="submit">
        {initialData ? "Update Course" : "Create Course"}
      </button>
    </form>
  );
};

export default CourseForm;
