import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const location = useLocation(); // Get the location object to access passed state
  const navigate = useNavigate(); // To navigate back to home or other pages
  const { metric, data } = location.state || {}; // Access the state passed through the route

  // Prepare data for the graph (Chart.js)
  const prepareChartData = () => {
    if (!data) return null;

    const dates = data.map((item) => item.date);
    const values = data.map((item) => item.value);

    const chartData = {
      labels: dates,
      datasets: [
        {
          label: metric,
          data: values,
          borderColor: "rgba(75, 192, 192, 1)",
          tension: 0.1,
        },
      ],
    };

    return chartData;
  };

  // Render Metric Data as a Table
  const renderMetricData = () => {
    if (!data) return null;

    return (
      <div className="metric-data-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>{metric}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="analytics-page">
      <button onClick={() => navigate("/home")}>Back to Home</button>
      <h2>{metric} Analytics</h2>
      {/* Graph */}
      <div className="graph-container">
        <Line data={prepareChartData()} />
      </div>

      {/* Table */}
      {renderMetricData()}
    </div>
  );
}

export default Analytics;

