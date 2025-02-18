import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../dashboard/Dashboard";
const Login = () => {
  const [isCompany, setIsCompany] = useState(true);
  const navigation = useNavigate();
  const handleClick = () => {
    setIsCompany(false);

    navigation("/dashboard");
  };
  return (
    <div className="container">
      <div className="left-panel">
        <h1>ANNEX</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. Sed at odio pellentesque
          vulputate eget tellus massa dignissim justo.
        </p>
      </div>
      <div className="right-panel">
        <div className="toggle-buttons">
          <button
            className={isCompany ? "active" : ""}
            onClick={() => setIsCompany(true)}
          >
            Login as Company
          </button>
          <button className={!isCompany ? "active" : ""} onClick={handleClick}>
            Login as Admin
          </button>
        </div>
        <div className="login-box">
          <h2>Login</h2>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Request new password</a>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
