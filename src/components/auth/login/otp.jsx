import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./otpverify.css"; // Style file
import Swal from "sweetalert2";
import DashboardHeader from "../../utils/DashboardHeader";
import SimpleHeader from "../../utils/SimpleHeader";
import { ImgContainer } from "../../../assets/ImgContainer";

const OTPVerification = () => {
  const { emaildata } = useParams();
  console.log(emaildata);

  useEffect(() => {
    if (emaildata) {
      sendOTP();
    }
  }, [emaildata]); // Added emaildata as a dependency

  const [otp, setOtp] = useState(["", "", "", ""]);
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
    if (!emaildata) {
      setMessage("Please enter an email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://annex.sofinish.co.uk/api/send-otp/${emaildata}`, // Corrected URL
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log("email data:-", data);
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
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emaildata, otp: otpCode }),
        }
      );

      const data = await response.json();
      console.log("verify-data", data);
      if (data.success === true) {
        Swal.fire({
          title: "Success!",
          text: data.message,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("formData", JSON.stringify(data));
          localStorage.setItem("emailData", emaildata);
          window.location.href = "/pdf-maker";
        });
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <SimpleHeader />
      </div>
      <div className="flex flex-col items-center mt-36 space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/image.png"
            alt="Email Icon"
            // className="email-icon"
            className="w-24 h-24"
          />
          <h2 className="text-xl font-bold">Verify your email</h2>
          <div className="flex space-x-2">
            <p>Please enter the 4 digit code sent to</p>
            <p>{emaildata}</p>
          </div>
        </div>

        {/* <p>{message}</p> */}

        <form onSubmit={handleSubmit} className="space-y-4">
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
          {/* <button onClick={sendOTP} className="send-otp-btn" disabled={loading}>
            {loading ? "Sending..." : "Send OTP"}
          </button> */}
          <div className="flex flex-col items-center">
            <p className="text-[#6d4db0] cursor-pointer" onClick={sendOTP}>
              Resend Code
            </p>

            <button type="submit" className="confirm-btn" disabled={loading}>
              {loading ? "Verifying..." : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
