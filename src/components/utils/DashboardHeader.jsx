import React from "react";

const DashboardHeader = () => {
  return (
    <div className="flex justify-between items-center bg-[#514392] text-white px-10 py-3 ">
      {/* Left Side - Company Name */}
      <h1 className="text-lg font-bold">ANNEX</h1>

      {/* Right Side - Profile Section */}
      <div className="flex items-center gap-3">
        <img
          src="https://randomuser.me/api/portraits/women/50.jpg" // Sample profile image
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
        <div className="text-right">
          <p className="text-xs text-gray-300">Company</p>
          <p className="text-sm font-semibold">Mohammed Nasar</p>
        </div>
        <button className="text-white">&#x25BC;</button> {/* Dropdown Icon */}
      </div>
    </div>
  );
};

export default DashboardHeader;
