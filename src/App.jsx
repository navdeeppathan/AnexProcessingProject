import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";

import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";

import Form from "./components/anexForm/Form";
import Dashboard from "./components/dashboard/Dashboard";
import DigitalSignature from "./components/pdfMaker/DigitalSignature";
import PDFMakerOrgnl from "./components/pdfMaker/PDFMakerOrgnl";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/dashboard/*" element={<AdminDashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/digital-signature" element={<DigitalSignature />} />
        <Route path="/pdf-maker" element={<PDFMakerOrgnl />} />
      </Routes>
    </Router>
  );
};

export default App;
