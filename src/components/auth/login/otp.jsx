import React, { useState, useRef } from "react";
import "./otpverify.css"; // Style file

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState(""); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle OTP Input Change
  const handleChange = (index, event) => {
    let value = event.target.value;
    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle Backspace Press
  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  // Send OTP API
  const sendOTP = async () => {
    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP sent successfully!");
      } else {
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");

    if (otpCode.length !== 4) {
      setMessage("Please enter a valid 4-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("OTP verified successfully!");
      } else {
        setMessage(data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <img src="image.png" alt="Email Icon" className="email-icon" />
      <h2>Verify your email</h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOTP} className="send-otp-btn" disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>

      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={inputRefs[index]}
            />
          ))}
        </div>

        <p className="resend-code" onClick={sendOTP}>
          Resend Code
        </p>

        <button type="submit" className="confirm-btn" disabled={loading}>
          {loading ? "Verifying..." : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
