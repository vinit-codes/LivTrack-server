import React from "react";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header-icon">
        <img src="/icons/doctor.png" alt="Doctor Icon" />
      </div>
      <div className="header-title">
            <h1>LivTrack</h1>
      </div>
      <div className="header-icon">
        <img src="/icons/notification-bell-svgrepo-com.svg" alt="Notification Icon" />
      </div>
    </div>
  );
}

export default Header;

