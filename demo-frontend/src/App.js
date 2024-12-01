import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage"; // Authentication Page
import Home from "./components/Home"; // Home Page
import Analytics from "./components/Analytics"; // Analytics Page
import Header from "./components/Header"; // Header
import NavBar from "./components/NavBar"; // Navigation Bar
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle successful login or registration
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route for AuthPage (login/signup) */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                <AuthPage onAuthentication={handleAuthentication} />
              )
            }
          />

          {/* Protected Route for Home Page */}
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <>
                  <Header />
                  <Home />
                  <NavBar />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected Route for Analytics Page */}
          <Route
            path="/analytics"
            element={
              isAuthenticated ? (
                <>
                  <Header />
                  <Analytics />
                  <NavBar />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

