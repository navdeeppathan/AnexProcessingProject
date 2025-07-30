import React, { useEffect } from "react";
import MainDashboard from "./MainDashboard";
import Complete from "./Complete";
import Report from "./ReportDashboard";
import ReportDashboard from './ReportDashboard';
import OTP from "../auth/login/otp";
import DashboardHeader from "../utils/DashboardHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import Form from "../anexForm/Form";
import Profile from "../profile/Profile";
import EditProfile from "../profile/EditProfile";
import AnnexVII from "../anexForm/AnnexVII";
import AnnexForm from "../anexForm/AnexForm";
import Sidebar from "../utils/Sidebar";
import Draft from "../Draft/Draft";
import User from "../auth/user/User";
import DraftForm from "../Draft/DraftForm";
import CompanyActions from "../Admin/actions/CompanyActions";
import Duplicate from "./Duplicate";
import Download from "./PdfDownload";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
  
    let userData = null;
    try {
      userData = user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Invalid user JSON:", error);
      localStorage.removeItem("user");
      navigate("/", { replace: true });
      return;
    }
  
    // Additional safety: check user_id exists
    if (!userData || !userData.user_id) {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div>
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className=" flex">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] ">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/annex-form" element={<Form />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-duplicate/:id" element={<Duplicate />} />
            <Route path="/Download/:id" element={<Download/>} />
            <Route path="/completed" element={<Complete />} />
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/anexV/:id" element={<AnnexVII />} />
            <Route path="/annex-form2" element={<AnnexForm />} />
            <Route path="/draft" element={<Draft />} />
            <Route path="/users" element={<User />} />
            <Route path="/draftForm/:id" element={<DraftForm />} />
            <Route path="/company-actions" element={<CompanyActions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
