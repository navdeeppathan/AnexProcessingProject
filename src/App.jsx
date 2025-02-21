import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Company from "./components/company/Companies";
import AnexCreate from "./components/anexForm/AnexFormcreate";
import Otp from "./components/auth/login/otp";
import OtpVerify from "./components/auth/login/otpverify";
import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";
import PDFMakerOrgnl from "./components/pdfMaker/PDFMakerOrgnl";
import DigitalSignature from "./components/pdfMaker/DigitalSignature";

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
        <Route path="/pdf" element={<PDFMakerOrgnl />} />
        <Route path="/digital-signature" element={<DigitalSignature />} />
      </Routes>
    </Router>
  );
};

export default App;

{
  /* <button
            // onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Download PDF
          </button> */
}
