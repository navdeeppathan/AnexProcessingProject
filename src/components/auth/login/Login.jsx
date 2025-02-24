import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("company");

  return (
    <div className="main-div">
      {/* Left Side */}
      <div className="main-div-left-section">
        {/* <h1>ANNEX</h1> */}
        {/* <img src={ImgContainer.logo} alt="Logo Icon" className="logo" /> */}

        <h1 className="annex-text">ANNEX</h1>

        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur. Sed at odio pellentesque
            vulputate eget tellus massa dignissim justo. Nisi aliquet velit
            elementum eget interdum vitae nisi nunc consequat. Ornare sit arcu
            turpis posuere. Dui malesuada.
          </p>
        </div>
        <img src="vite.png" alt="Vite Logo" className="vite-image" />
      </div>

      {/* Right Side */}
      <div className="main-div-right-section">
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
        <div className="items-center justify-center py-20 md:px-36 space-y-4 ">
          <h2 className="text-2xl font-bold">Login</h2>
          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" />
            </div>
            <div className="text-right text-xs font-sans font-medium">
              Request new password
            </div>
            <button className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
