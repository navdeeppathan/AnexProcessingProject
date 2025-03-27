import React, { useState } from "react";
import Swal from "sweetalert2";
import "./Login.css";
import useApi from "../../../hooks/useApi";

const Login = () => {
  const { sendRequest, loading } = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("admin");

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await sendRequest("login", "POST", {
      email,
      password,
      action: "login",
    });

    if (data && data.status === 200) {
      // Check the role_id and redirect accordingly. 1 for admin, 2 for company.
      const { role_id } = data.data;
      if (
        (role_id == 1 && activeTab === "admin") ||
        (role_id >= 2 && activeTab === "company")
      ) {
        Swal.fire({
          title: "Success!",
          text: "Login Successful",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("totaldata", JSON.stringify(data));
          localStorage.setItem("role_id", JSON.stringify(role_id));
          window.location.href =
            role_id == 1 ? "/admin/dashboard/" : "/dashboard";
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
        text: data?.message || "Please check your credentials.",
        icon: "error",
      });
    }
  };

  return (
    <div className="main-div">
      {/* Left Side */}
      <div className="main-div-left-section">
        <img src="/a-logo2.png" alt="Annex Logo" style={{ width: "34rem", height: "19rem" }}/>
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
              {/* {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : ( */}
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
