import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/auth/login/Login";
import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";

import Dashboard from "./components/dashboard/Dashboard";
import DigitalSignature from "./components/pdfMaker/DigitalSignature";
import PDFMakerOrgnl from "./components/pdfMaker/PDFMakerOrgnl";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    // if (!user || user.role_id != "1") {
    //   localStorage.removeItem("user");
    //   navigate("/", { replace: true });
    // }
  }, []);

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard/*"
          element={
            <AuthWrapper>
              <AdminDashboard />
            </AuthWrapper>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            // <AuthWrapper>
            <Dashboard />
            // </AuthWrapper>
          }
        />
        <Route
          path="/digital-signature"
          element={
            <AuthWrapper>
              <DigitalSignature />
            </AuthWrapper>
          }
        />
        <Route
          path="/pdf-maker"
          element={
            <AuthWrapper>
              <PDFMakerOrgnl />
            </AuthWrapper>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
