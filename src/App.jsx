import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Company from "./components/company/Companies";
import Anex from "./components/anexForm/AnexForm";
import AnexVII from "./components/anexForm/AnnexVII";
import AnexCreate from "./components/anexForm/AnexFormcreate";
import Otp from "./components/auth/login/otp";
import OtpVerify from "./components/auth/login/otpverify";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/anex" element={<Anex />} />
        <Route path="/anexV" element={<AnexVII />} />
        <Route path="/anexcreate" element={<AnexCreate />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        
      </Routes>
    </Router>
  );
};

export default App;
