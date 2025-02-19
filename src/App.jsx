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
import CreateCompany from "./components/auth/createCompany/CreateCompany";
import Test from "./components/auth/createCompany/Test";
import Form from "./components/anexForm/Form";

const App = () => {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/company" element={<Company />} />
        <Route path="/anex" element={<Anex />} />
        <Route path="/anexV" element={<AnexVII />} />
        <Route path="/anexcreate" element={<AnexCreate />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/otpverify" element={<OtpVerify />} />
        
=======
        <Route path="/*" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
>>>>>>> a2310d1e78e03fc31c3db4997b0b5c3b03be727a
      </Routes>
    </Router>
  );
};

export default App;
