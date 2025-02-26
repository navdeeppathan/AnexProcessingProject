import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import "./Login.css";

const Login = () => {
  const [activeTab, setActiveTab] = useState("company");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://annex.sofinish.co.uk/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 200) {
        if (data.data.role_id === 1 && activeTab === "admin") {
          Swal.fire({
            title: "Success!",
            text: "Admin Login Successful",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            console.log(data.data.role_id);
            localStorage.setItem("user", JSON.stringify(data.data));
            localStorage.setItem("role_id", JSON.stringify(data.data.role_id));
            window.location.href = "/admin/dashboard";
          });
        } else if (data.data.role_id === 2 && activeTab === "company") {
          Swal.fire({
            title: "Success!",
            text: "Company Login Successful",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            localStorage.setItem("user", JSON.stringify(data.data));
            localStorage.setItem("role_id", JSON.stringify(data.data.role_id));
            window.location.href = "/dashboard";
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Invalid Role. Please select the correct login type.",
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Login Failed",
          text: data.message || "Please check your credentials.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Network Error",
        text: "Please try again later.",
        icon: "error",
      });
    }
  };

  return (
    <div className="main-div">
      {/* Left Side */}
      <div className="main-div-left-section">
        <h1 className="annex-text">ANNEX</h1>
        <p>Lorem ipsum dolor sit amet consectetur...</p>
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
        <div className="items-center justify-center py-20 md:px-36 space-y-4">
          <h2 className="text-2xl font-bold">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-right text-xs font-sans font-medium">
              Request new password
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
