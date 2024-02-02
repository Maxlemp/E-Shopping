import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginComponent = () => {
  const baseUrl = "http://localhost:5006/api";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        setError(null);
        console.log("Login successful");
        navigate("/list");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        console.error("Login failed:", errorData);
        // Handle login error, e.g., display error message
      }
    } catch (error) {
      setError("Error during login. Please try again.");
      console.error("Error during login:", error);
      // Handle general error, e.g., display a generic error message
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>User Login</h2>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
