import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">My Dashboard</h1>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/list-event">Events</a>
        <a href="/list-course">Courses</a>
        <a href="/payment-list">Payments</a>
      </nav>
    </header>
  );
};

export default Header;
