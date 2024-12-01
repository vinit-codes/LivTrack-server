import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Home.css";

function Home() {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [metricData, setMetricData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state to handle API errors
  const navigate = useNavigate(); // Initialize useNavigate hook

  const mockData = {
    Cholesterol: [
      { date: "2024-11-01", value: 190 },
      { date: "2024-11-05", value: 195 },
      { date: "2024-11-10", value: 180 },
    ],
    Blood: [
      { date: "2024-11-01", value: 120 },
      { date: "2024-11-05", value: 118 },
      { date: "2024-11-10", value: 122 },
    ],
    EyeReports: [
      { date: "2024-11-01", value: "Normal" },
      { date: "2024-11-05", value: "Normal" },
      { date: "2024-11-10", value: "Normal" },
    ],
  };

  const handleMetricClick = (metric) => {
    setSelectedMetric(metric);
    setLoading(true);
    setError(null); // Clear previous error message

    // Simulate data fetching (replace axios call with mock data)
    setTimeout(() => {
      const data = mockData[metric];
      setMetricData(data);
      setLoading(false);

      // Navigate to Analytics page and pass the metric and data as state
      navigate("/analytics", { state: { metric, data } });
    }, 1000); // Simulate a 1 second delay for fetching data
  };

  return (
    <div className="home">
      <div className="metrics-header">
        <img src="/icons/healthmet.jpeg" alt="Health Metrics Logo" />
      </div>

      <div className="metrics-triangle">
        <div className="top-row">
          <div className="metric-card" onClick={() => handleMetricClick("Cholesterol")}>
            <img src="/icons/chloe.jpeg" alt="Cholesterol" />
            <span>Cholesterol</span>
          </div>
          <div className="metric-card" onClick={() => handleMetricClick("Blood")}>
            <img src="/icons/blood_866772.png" alt="Blood" />
            <span>Blood</span>
          </div>
        </div>
        <div className="bottom-row">
          <div className="metric-card" onClick={() => handleMetricClick("EyeReports")}>
            <img src="/icons/vision_2662920.png" alt="Eye Reports" />
            <span>Eye Reports</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

