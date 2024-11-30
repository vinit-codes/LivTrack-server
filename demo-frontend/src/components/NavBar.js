import React from "react";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav-bar">
      <div className="nav-item">
        <img src="/icons/hospital-clinic.svg" alt="Health Doc" />
        <span>Health Doc</span>
      </div>
      <div className="nav-item">
        <img src="/icons/ocr.svg" alt="Scan OCR" />
        <span>Scan OCR</span>
      </div>
      <div className="nav-item">
        <img src="/icons/audience_2630913.png" alt="Insights" />
        <span>Insights</span>
        </div>
    </div>
  );
}

export default NavBar;

