import React, { useState, useRef } from "react";
import "./otpverify.css"; // Style file

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
      <img src="image.png" alt="Email Icon" className="email-icon" />
      <h2>Verify your email</h2>
      <p>Please enter the 4-digit code sent to info@yourcompany.co.uk</p>

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

        <p className="resend-code">Resend Code</p>

        <button type="submit" className="confirm-btn">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
