import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Company from "./components/company/Companies";
import Anex from "./components/anexForm/AnexForm";
import Otp from "./components/auth/login/otp";
import OtpVerify from "./components/auth/login/otpverify";
import CreateCompany from "./components/auth/createCompany/CreateCompany";
import Test from "./components/auth/createCompany/Test";
import Form from "./components/anexForm/Form";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
