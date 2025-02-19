import React, { useState, useRef } from "react";
import "./otp.css"; // Style file

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Handle OTP Input Change
  const handleChange = (index, event) => {
    let value = event.target.value;

    if (!isNaN(value) && value.length <= 1) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
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

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP: ${otp.join("")}`);
  };

  return (
    
      <div className="otp-container">
          {/* <div className="main-header">
              <h1>Annex</h1>
          </div> */}
          
          <img src="right.png" alt="Email Icon" className="email-icon" />
          <h2>Verified</h2>
          <p>You have successfully verified your email.</p>
          <p className="resend-code">Review ANNEX</p>
      </div>
  );
};

export default OTPVerification;
