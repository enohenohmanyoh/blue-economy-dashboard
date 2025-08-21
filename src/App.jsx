import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CourseCreate from "./pages/CourseCreate";
import CourseForm from "./pages/CourseForm";
import EventForm from "./pages/EventForm";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    
      <div className="app">
        <Header/>
        {/* ✅ Dashboard handles Courses, Events, Payments */}
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* If you want standalone routes outside dashboard */}
          <Route path="/create-course" element={<CourseCreate />} />
          <Route path="/course-form" element={<CourseForm />} />
          <Route path="/create-event" element={<EventForm />} />
        </Routes>

        <Footer/>
      </div>

  );
}

export default App;
