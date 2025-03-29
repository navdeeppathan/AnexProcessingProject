import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/", { replace: true });
    } else {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error);
        localStorage.removeItem("user");
        navigate("/", { replace: true });
      }
    }
  }, [navigate]);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const handleProfile = () => {
    if (user?.role_id === 1) {
      navigate("/admin/dashboard/profile");
    } else {
      navigate("/dashboard/profile");
    }
  };

  return (
    <div className="flex justify-between items-center bg-[#514392] text-white px-10 py-3 relative">
      <img src="/a-logo2.png" alt="Annex Logo" style={{ width: "12rem", height: "5rem" }} />

      {user && (
        <div className="relative">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img
              src="https://randomuser.me/api/portraits/men/50.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <div className="text-right">
              <p className="text-xs text-gray-300">Company</p>
              <p className="text-sm font-semibold">{user.company_name || "User"}</p>
            </div>
            <span className="text-white">&#x25BC;</span> {/* Dropdown Icon */}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg">
              <div
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleProfile}
              >
                Profile
              </div>
              <div
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
