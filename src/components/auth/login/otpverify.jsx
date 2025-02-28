import { Button } from "@mui/material";
import React, { useState, useRef } from "react";
import SimpleHeader from "../../utils/SimpleHeader";

const OTPVerification2 = () => {
  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen">
      <div>
        <SimpleHeader />
      </div>

      <div className="flex flex-col items-center text-center mt-32 space-y-8">
        <div className="">
          <img src="/right.png" alt="Email Icon" className="w-24 mb-4" />
        </div>
        <div className="flex flex-col space-y-6">
          <h2 className="text-xl font-semibold">Verified</h2>
          <p className="text-[#282D37]">
            You have successfully verified your email.
          </p>
          <Button variant="contained" sx={{ bgcolor: "#6d4db0" }}>
            Review ANNEX
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification2;
