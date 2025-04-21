import React, { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from "./components/auth/login/Login";
import AdminDashboard from "./components/Admin/dashboard/AdminDashboard";
import OTP from "../src/components/auth/login/otp";
import Dashboard from "./components/dashboard/Dashboard";
import DigitalSignature from "./components/pdfMaker/DigitalSignature";
import PDFMakerOrgnl from "./components/pdfMaker/PDFMakerOrgnl";
import ThirdCarrierForm from "./components/auth/createCompany/Test";
import OTPVerification2 from "./components/auth/login/otpverify";
import PdfDownload from "./components/auth/createCompany/PdfDownload";
import ThankyouPage from "./components/Thankyou/ThankyouPage";
import Test from "./components/auth/createCompany/Test";
import Test2 from "./components/auth/createCompany/Test2";
import Cookie from "./components/terms/Cookie";
import PrivacyPolicy from "./components/terms/PrivacyPolicy";
import TermsAndConditions  from "./components/terms/Terms&Condition";
import Cookies from "js-cookie";

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
//   const [cookiesAccepted, setCookiesAccepted] = useState(false);

//   useEffect(() => {
//     const consent = Cookies.get("user_cookie_consent");
//     if (consent === "accepted") {
//       setCookiesAccepted(true);
//     }
//   }, []);

//   if (!cookiesAccepted) {
//     return <Cookie onAccept={() => setCookiesAccepted(true)} />;
//   }
  return (
    
    <Router>
      <Routes>
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/cookie" element={<Cookie/>} />
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
        <Route
          path="/otp/:emaildata/:id"
          element={
            <AuthWrapper>
              <OTP />
            </AuthWrapper>
          }
        />
        <Route
          path="/test/"
          element={
            // <AuthWrapper>
            <OTPVerification2 />
            // </AuthWrapper>
          }
        />
        <Route
          path="/thankyou"
          element={
            // <AuthWrapper>
            <ThankyouPage />
            // </AuthWrapper>
          }
        />

        <Route
          path="/test2"
          element={
            // <AuthWrapper>
            <Test />
            // </AuthWrapper>
          }
        />
        {/* <Route
          path="/test3"
          element={
            // <AuthWrapper>
            <Test2 />
            // </AuthWrapper>
          }
        /> */}
      </Routes>
    </Router>
  );
};

export default App;
