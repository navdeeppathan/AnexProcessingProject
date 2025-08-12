import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);
  console.log(user);

  const location = useLocation();
  const navigation = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 13h8V3H3v10zm10 8h8V11h-8v10zM3 21h8v-6H3v6zm10-18v6h8V3h-8z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/completed",
      name: "Completed Annex",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/draft",
      name: "Draft Annex",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 5v14h18V5H3zm16 12H5V7h14v10z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/report",
      name: "Report",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 13h2v-2H3v2zm0-4h2V7H3v2zm0 8h2v-2H3v2zM7 13h14v-2H7v2zm0-6v2h14V7H7zm0 8h14v-2H7v2z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/plans",
      name: "Transaction Details",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.75 17.5h-1.5v-1.5h1.5v1.5zm0-3h-1.5V6h1.5v9.5z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/users",
      name: "Users",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm8 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zM8 13c-2.67 0-8 1.34-8 4V19h6v-2c0-.7.28-1.37.8-1.88.52-.5 1.19-.62 1.91-.62h.2c.72 0 1.39.12 1.91.62.52.51.8 1.18.8 1.88v2h6v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      path: "/dashboard/company-actions",
      name: "Audit",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
          <path d="M3 3h18v2H3V3zm0 4h12v2H3V7zm0 4h18v2H3v-2zm0 4h12v2H3v-2zm0 4h18v2H3v-2z" />
        </svg>
      ),
    },
  ];

  if (user?.role_id !== 3) {
    // navigation.splice(3, 0, {
    //   path: "/dashboard/edit-profile",
    //   name: "Edit Profile",
    //   icon: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 24 24"
    //       fill="white"
    //       className="w-6 h-6"
    //     >
    //       <path d="M6 4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h4c.72 0 1.39.39 1.73 1h.54c.34-.61 1.01-1 1.73-1h4c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2h-4c-1.1 0-2 .9-2 2 0-1.1-.9-2-2-2H6m0 2h4v12H6V6m8 0h4v12h-4V6z" />
    //     </svg>
    //   ),
    // });
  }

  return (
    <nav className="w-full h-full border-r bg-[#6F5CC5] space-y-8 sm:w-80">
      <div className="flex flex-col h-full py-10">
        <div className="flex-1 flex flex-col h-full overflow-auto">
          <ul className=" text-sm font-medium flex-1">
            {navigation.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-x-2 text-white px-10 py-5  duration-150 ${
                    location.pathname === item.path && "bg-[#7D6CC8]"
                  } `}
                >
                  <div className="text-gray-500">{item.icon}</div>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
