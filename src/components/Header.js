import React from "react";
import "./Header.css"; // Import the CSS file for the header

function Header() {
  return (
    <div className="header">
      <div className="logo-text">InfoGo</div>
      <div className="flex items-center">
      <img src="https://via.placeholder.com/150" alt="Profile" className="profile-photo" />

    <div className="name-circle">Minhaz</div>
</div>

    </div>
  );
}

export default Header;
