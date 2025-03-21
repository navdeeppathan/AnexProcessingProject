import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./otpverify.css"; // Style file
import Swal from "sweetalert2";
import DashboardHeader from "../../utils/DashboardHeader";
import SimpleHeader from "../../utils/SimpleHeader";

const OTPVerification = () => {
  const { emaildata } = useParams();
  const { id } = useParams();

  // Get Base64-encoded email from URL
  const [decodedEmail, setDecodedEmail] = useState("");

  const [decodeId, setDecodedId] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Decode Base64 function
  const decodeBase64 = (encodedEmail) => {
    try {
      return atob(encodedEmail);
    } catch (error) {
      console.error("Invalid Base64 string:", error);
      return null;
    }
  };

  useEffect(() => {
    if ((emaildata, id)) {
      const decoded = decodeBase64(emaildata);
      const id2 = decodeBase64(id);

      setDecodedEmail(decoded);
      setDecodedId(id2);

      sendOTP(decoded);
    }
  }, [emaildata]); // Runs when emaildata changes

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

  // const companyId = () => {
  //   const user = localStorage.getItem("user");
  //   const user_id = JSON.parse(user)?.company_id;
  //   return user_id || null;
  // };

  // const loginId = () => {
  //   const user = localStorage.getItem("user");
  //   const user_id = JSON.parse(user)?.login_id;
  //   return user_id || null;
  // };

  // Send OTP API
  const sendOTP = async (email) => {
    if (!email) {
      setMessage("Invalid email.");
      return;
    }

    // const companyId = () => {
    //   const user = localStorage.getItem("user");
    //   const user_id = JSON.parse(user)?.company_id;
    //   return user_id || null;
    // };

    // const loginId = () => {
    //   const user = localStorage.getItem("user");
    //   const user_id = JSON.parse(user)?.login_id;
    //   return user_id || null;
    // };

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `https://annex.sofinish.co.uk/api/send-otp/${email}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      console.log("email data:", data);
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
        `https://annex.sofinish.co.uk/api/verify-otp`,
        // `https://annex.sofinish.co.uk/api/verify-otp&action=VerifyOTP=${companyId()}&login_id=${loginId()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: decodedEmail,
            otp: otpCode,
            id: decodeId,
          }),
        }
      );

      const data = await response.json();
      console.log("verify-data:-", data);
      // localStorage.removeItem("formData");

      if (data.success === true) {
        if (data?.countSignature == 0) {
          Swal.fire({
            title: "Success!",
            text: data.message,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          }).then(() => {
            localStorage.setItem("formData", JSON.stringify(data?.data));
            localStorage.setItem("emailData", decodedEmail);
            window.location.href = "/pdf-maker";
          });
        } else {
          Swal.fire({
            title: "Already Signed!",
            text: "You already signed this Annex. For more clarity please connect Admin!!!",
            icon: "error",
            timer: 5000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            window.location.href = "/thankyou";
          }, 5000);
        }
      } else if (data.success === false) {
        Swal.fire({
          title: "Failed",
          text: data.message || "OTP verification failed.",
          icon: "error",
        });
        // setMessage(data.error || "OTP verification failed.");
      }
    } catch (error) {
      Swal.fire({
        title: "Failed",
        text: "OTP verification failed.",
        icon: "error",
      });
      // setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  // const formData3 = localStorage.getItem("formData");
  // const formData2 = JSON.parse(formData3);

  // console.log("localdata;-", formData2);

  // console.log("decodeId:-", decodeId);

  return (
    <div>
      <SimpleHeader />
      <div className="flex flex-col items-center mt-36 space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <img src="/image.png" alt="Email Icon" className="w-24 h-24" />
          <h2 className="text-xl font-bold">Verify your email</h2>
          <div className="flex space-x-2">
            <p>Please enter the 4-digit code sent to</p>
            <p>{decodedEmail}</p>
          </div>
        </div>

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
          <div className="flex flex-col items-center">
            <p
              className="text-[#6d4db0] cursor-pointer"
              onClick={() => sendOTP(decodedEmail)}
            >
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
