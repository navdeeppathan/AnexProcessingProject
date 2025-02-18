import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="container">
      {/* Left Side */}
      <div className="left-section">
        <h1>ANNEX</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Sed at odio pellentesque
            vulputate eget tellus massa dignissim justo. Nisi aliquet velit
            elementum eget interdum vitae nisi nunc consequat. Ornare sit arcu
            turpis posuere. Dui malesuada.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="right-section">
        {/* Toggle Buttons */}
        <div className="toggle-buttons">
          <button
            className={activeTab === "company" ? "active" : ""}
            onClick={() => setActiveTab("company")}
          >
            Login as Company
          </button>
          <button
            className={activeTab === "admin" ? "active" : ""}
            onClick={() => setActiveTab("admin")}
          >
            Login as Admin
          </button>
        </div>

        {/* Login Form */}
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="forgot-password">Request new password</div>
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
