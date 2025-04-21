import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Draft = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");
  let userId = null;
  try {
    userId = user ? JSON.parse(user) : null;
    console.log("useriddsgag:-", userId?.company_id);
  } catch (err) {
    console.error("Error parsing user data:", err);
  }

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");
      if (!userId?.company_id) {
        setError("Invalid user data. Please log in again.");
        setLoading(false);
        return;
      }
      const companyId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.company_id;
        return user_id || null;
      };

      const loginId = () => {
        const user = localStorage.getItem("user");
        const user_id = JSON.parse(user)?.login_id;
        return user_id || null;
      };

      try {
        const url = `https://annex.sofinish.co.uk/api/draftforms/${
          userId?.company_id
        }&action=Getdraftforms&company_id=${companyId()}&login_id=${loginId()}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setFormData(data);
        console.log("draftFormdata:-", data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, [userId?.company_id]); 
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress />
        <p className="text-black font-medium text-xl mt-4">Loading...</p>
      </div>
    );
  }

  // ✅ Proper Error Handling
  if (error) {
    return <p className="text-red-500 text-center mt-5">Error: {error}</p>;
  }

  return (
    <div className="p-10 min-h-screen">
      <div>
        <table className="shadow-lg cursor-pointer">
          <thead>
            <tr>
              <th colSpan="4">
                <div className="flex justify-between items-center w-full">
                  <span>Annex</span>
                  <span>Reference Name</span>
                  <span>Created At</span>
                  <span>View Profile</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {formData && Array.isArray(formData) && formData.length > 0 ? (
              formData.map((company) => (
                <tr key={company?.id}>
                  <td colSpan="4">
                    <div className="flex justify-between items-center w-full">
                      <span>{company?.annex_id}</span>
                      <span>{company?.ref_name}</span>
                      <span>  {new Date(company?.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}</span>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: "#6b46c1",
                          fontSize: "10px",
                          textTransform: "none",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(`/dashboard/draftForm/${company?.id}`)
                        }
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
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

export default Draft;
