import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle successful authentication (login or registration)
  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Route for Register/Login */}
          {!isAuthenticated && (
            <Route
              path="/"
              element={<Register onAuthentication={handleAuthentication} />}
            />
          )}

          {/* Protected Routes */}
          {isAuthenticated && (
            <>
              <Route
                path="/home"
                element={
                  <>
                    <Header />
                    <Home />
                    <NavBar />
                  </>
                }
              />
              {/* Redirect all undefined routes to the home page */}
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          )}

          {/* Redirect unauthenticated users to the login page */}
          {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

