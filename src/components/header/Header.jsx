import React from "react";
import { useNavigate } from "react-router-dom";
import LoGo from "../../assets/react.svg";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // Add this line

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    
    // Navigate to the /register route
    navigate("/");
  };

  return (
    <header>
      <img className="header__logo" src={LoGo} alt="" />
      <h1>E-Shopping</h1>
      <button className="ui-change-btn" onClick={logout}>Logout</button>
    </header>
  );
};

export default Header;
