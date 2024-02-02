import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const RegisterComponent = () => {
  const baseUrl = "http://localhost:5006/api";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    first_name: "",
    last_name: "",
    confirm: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container">
    <div className="register-container">
      <div className="register-card">
        <h2>User Registration</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
            />
          </label>
          <br />
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
          <label>
            Confirm Your Password:
            <input
              type="password"
              name="confirm"
              value={formData.confirm}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegisterComponent;
