import React, { useState } from "react";
import Login from "../components/auth/Login"; // Login Component
import Register from "../components/auth/Register"; // Register Component
import './AuthPage.css'; // Import the scoped CSS for this page

const AuthPage = ({ onAuthentication }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="authPage">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />

        {/* Signup form */}
        <div className="signup">
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="chk" aria-hidden="true">
              Sign Up
            </label>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Login form */}
        <div className="login">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // After successful login, call onAuthentication to set the user as authenticated
              onAuthentication();
            }}
          >
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

