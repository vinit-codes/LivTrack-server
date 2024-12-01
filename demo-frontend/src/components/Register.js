import React, { useState } from "react";

const Register = ({ onAuthentication }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(true); // Toggle between Register and Login
  const [error, setError] = useState(null); // To track error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegister
      ? "http://localhost:5001/api/v1/auth/register"
      : "http://localhost:5001/api/v1/auth/login"; // Toggle endpoint
    const payload = { email, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`${isRegister ? "Registration" : "Login"} successful:`, data);

        // Trigger the authentication handler on successful login
        onAuthentication();
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong."); // Display error message
        console.error("Error during registration:", errorData);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>{isRegister ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
      <p>
        {isRegister ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => setIsRegister(!isRegister)}
          style={{ marginLeft: "5px" }}
        >
          {isRegister ? "Login here" : "Register here"}
        </button>
      </p>
    </div>
  );
};

export default Register;

