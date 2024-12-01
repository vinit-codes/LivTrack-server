import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "./utils/auth";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return <div>Welcome to the protected Home page!</div>;
};

export default HomePage;

