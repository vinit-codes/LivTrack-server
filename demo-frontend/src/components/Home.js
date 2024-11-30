import React, { useState } from "react";
import "./Home.css";

function Home() {
  const [selectedMetric, setSelectedMetric] = useState(null);

  const metricsData = {
    Cholesterol: "Cholesterol level is 190 mg/dL. Maintain a healthy diet.",
    Blood: "Blood pressure is 120/80 mmHg. All readings are normal.",
    "Eye Reports": "Vision is normal. No signs of cataracts or glaucoma.",
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
  };

  return (
    <div className="home">
  
      {/* Health Metrics Title and Logo */}
      <div className="metrics-header">
        <img src="/icons/healthmet.jpeg" alt="Health Metrics Logo" />
      </div>

      {/* Metrics Cards in Triangle Layout */}
      <div className="metrics-triangle">
        <div className="top-row">
          <div
            className="metric-card"
            onClick={() => handleMetricClick("Cholesterol")}
          >
            <img src="/icons/chloe.jpeg" alt="Cholesterol" />
            <span>Cholesterol</span>
          </div>
          <div className="metric-card" onClick={() => handleMetricClick("Blood")}>
            <img src="/icons/blood_866772.png" alt="Blood" />
            <span>Blood</span>
          </div>
        </div>
        <div className="bottom-row">
          <div
            className="metric-card"
            onClick={() => handleMetricClick("Eye Reports")}
          >
            <img src="/icons/vision_2662920.png" alt="Eye Reports" />
            <span>Eye Reports</span>
          </div>
        </div>
      </div>

      {/* Selected Metric Data */}
      {selectedMetric && (
        <div className="metric-data-container">
          <div className="metric-data">
            <h2>{selectedMetric}</h2>
            <p>{metricsData[selectedMetric]}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;

