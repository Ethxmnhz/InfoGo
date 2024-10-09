// src/components/Header.js
import React from "react";
import { useUser } from "../context/UserContext"; // Import the user context
import "./Header.css"; // Import the CSS file for the header

function Header() {
  const { user } = useUser(); // Get the user from context
  const connectionStatus = true; // Placeholder for database connection status

  return (
    <div className="header">
      <div className="logo-text">InfoGo</div>
      <div className="flex items-center">
        <span style={{ color: connectionStatus ? 'green' : 'red' }}>
          {connectionStatus ? 'Connected' : 'Disconnected'}
        </span>
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-photo" />
        <div className="name-circle">{user ? user.name : 'Guest'}</div>
      </div>
    </div>
  );
}

export default Header;
