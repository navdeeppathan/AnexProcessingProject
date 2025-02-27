import React, { useEffect } from "react";
import MainDashboard from "./MainDashboard";
import DashboardHeader from "../utils/DashboardHeader";
import { Route, Routes, useNavigate } from "react-router-dom";
import Form from "../anexForm/Form";
import Profile from "../profile/Profile";
import EditProfile from "../profile/EditProfile";
import AnnexVII from "../anexForm/AnnexVII";
import AnnexForm from "../anexForm/AnexForm";
import Sidebar from "../utils/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    } else if (user.role_id != "2") {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  }, []);

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
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/anexV" element={<AnnexVII />} />
            <Route path="/annex-form2" element={<AnnexForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
