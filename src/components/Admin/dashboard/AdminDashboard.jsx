import React from "react";

import { Route, Routes } from "react-router-dom";
import DashboardTemplate from "./DashboardTemplate";
import Profile from "../../profile/Profile";
import EditProfile from "../../profile/EditProfile";

import DashboardHeader from "../../utils/DashboardHeader";

import MainCompanies from "../../company/MainCompanies";
import AdminSidebar from "../../utils/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div>
      <div className="w-full">
        <DashboardHeader />
      </div>
      <div className="flex">
        <div className="w-[20%] ">
          <AdminSidebar />
        </div>
        <div className="w-[80%] ">
          <Routes>
            <Route path="/" element={<DashboardTemplate />} />
            <Route path="/companies" element={<MainCompanies />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
