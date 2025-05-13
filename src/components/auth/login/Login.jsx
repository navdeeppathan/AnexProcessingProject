import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import "./Login.css";

const Login = () => {
  const { sendRequest, loading } = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("company");
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Check if cookies are already accepted
    const consent = Cookies.get("user_cookie_consent");
    if (consent === "accepted") {
      setCookiesAccepted(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    Cookies.set("user_cookie_consent", "accepted", { expires: 30 });
    setCookiesAccepted(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = await sendRequest("login", "POST", {
      email,
      password,
      action: "login",
    });

    if (data && data.status === 200) {
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
          console.log("localStorage", localStorage);
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
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="py-1 flex items-center text-xs font-semibold justify-end">
          <Link
            to="/privacy"
            className="text-gray-600 text-xs font-semibold hover:text-blue-600 mx-2"
          >
            Privacy Policy
          </Link>
          |
          <Link
            to="/terms"
            className="text-gray-600 text-xs font-semibold hover:text-blue-600 mx-2"
          >
            Terms & Conditions
          </Link>
        </footer>
      </div>

      {/* Cookie Consent Popup */}
      {!cookiesAccepted && (
        <div className="fixed inset-0 flex items-center justify-center ">
          <div className="bg-white p-2 rounded-lg shadow-lg text-center" style={{ marginTop: "36rem" }}>
          <h2 className="text-xl font-bold text-gray-800">We Use Cookies</h2>
            <p className="mt-2 text-gray-600">
              We use cookies to enhance your experience. By clicking "Accept", you
              agree to our <Link to="/cookie" className="text-blue-500 underline">Cookie Policy</Link>.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleAcceptCookies}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Accept Cookies
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Login;
