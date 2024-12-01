import React from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const HomePage = () => {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/login");  // Redirect if not authenticated
  }

  return <div>Welcome to the protected Home page!</div>;
};

export default HomePage;

