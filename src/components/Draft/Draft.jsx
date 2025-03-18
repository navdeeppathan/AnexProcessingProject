import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Draft = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Safely get userId from localStorage
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

      // Validate userId before making API call
      if (!userId?.company_id) {
        setError("Invalid user data. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/draftforms/${userId.company_id}`,
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
  }, [userId?.company_id]); // Added dependency for re-fetching if user changes

  // ✅ Proper Loading State
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
              <th colSpan="2">
                <div className="flex justify-between items-center w-full">
                  <span>Annex</span>
                  <span>View Profile</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {formData && Array.isArray(formData) && formData.length > 0 ? (
              formData.map((company) => (
                <tr key={company?.id}>
                  <td colSpan="2">
                    <div className="flex justify-between items-center w-full">
                      <span>{company?.annex_id}</span>
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
