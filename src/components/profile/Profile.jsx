import React from "react";

import { Button, Card, CardContent, Avatar } from "@mui/material";

const Profile = () => {
  const userData = localStorage.getItem("user");
  const user = JSON.parse(userData);

  return (
    <div className="min-h-screen p-10">
      <div className="w-full bg-gray-300  p-5 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div className="grid grid-cols gap-4">
            <div>
              <p className="text-gray-600 text-sm">First name</p>
              <div className="bg-white p-2 text-gray-900 rounded-md">
                {user.name}
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 text-sm">Email address</p>
            <div className="bg-white p-2 text-gray-900 rounded-md">
              {user.email}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
