import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Company from "./components/company/Companies";

import AnexCreate from "./components/anexForm/AnexFormcreate";
import Otp from "./components/auth/login/otp";
import OtpVerify from "./components/auth/login/otpverify";
import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";
import PDFMaker from "./components/pdfMaker/PDFMaker";
import ShipmentDetails from "./components/pdfMaker/PDFMakerOrgnl";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/anexcreate" element={<AnexCreate />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        <Route path="/pdf" element={<ShipmentDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
