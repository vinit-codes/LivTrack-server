// src/utils/auth.js

// Function to set the token to localStorage
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("authToken", token);
  } else {
    localStorage.removeItem("authToken");
  }
};

// Function to get the token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Function to check if user is authenticated (token exists)
export const isAuthenticated = () => {
  return !!getAuthToken(); // Returns true if the token exists
};

