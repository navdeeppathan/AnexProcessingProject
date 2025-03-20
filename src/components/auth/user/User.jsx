import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "./UserModel";

const User = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);
  //   console.log(userId);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");
      const companyId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.company_id;
        return user_id || NULL;
      };

      const loginId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.login_id;
        return user_id || NULL;
      };

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/userlist?id=${
            userId?.company_id
          }&action=FecthUserList&company_id=${companyId()}&login_id=${loginId()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(response);

        const data = await response.json();
        console.log("data:-", data);
        setFormData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  if (loading) {
    <p className="flex flex-col items-center justify-center h-screen">
      <CircularProgress />
      <p className="text-black font-medium text-xl">Loading...</p>
    </p>;
  }
  if (error) return <p>Error: {error}</p>;
  const userData = localStorage.getItem("user");
  const users = JSON.parse(userData);
  console.log(users);
  return (
    <div className="p-10 min-h-screen">
      <header className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Users</h2>
        {users?.role_id === 3 ? (
          ""
        ) : (
          <div>
            <Button
              variant="contained"
              sx={{ bgcolor: "#6D5AC5", padding: "10px" }}
              onClick={() => setOpen(true)}
            >
              Create User
            </Button>
            <UserModel open={open} onClose={() => setOpen(false)} />
          </div>
        )}
      </header>
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role_Id</th>
            </tr>
          </thead>
          <tbody>
            {/* {formData.length !== 0 ? ( */}
            {Array.isArray(formData) && formData.length > 0 ? (
              formData.map((company, index) => (
                <tr key={index}>
                  <td>{company?.name}</td>
                  <td>
                    <span className="total">{company?.email}</span>
                  </td>
                  <td>
                    <span className="pending">
                      {company?.role_id === 2 ? "create & viewer" : "viewer"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
