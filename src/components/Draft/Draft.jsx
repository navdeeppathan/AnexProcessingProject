import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Draft = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);
  console.log(userId?.id);

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/draftforms/${userId?.id}`,
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

  return (
    <div className="p-10 min-h-screen">
      <div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Annex</th>
              <th>Total Requests</th>
              <th>Pending Requests</th>
              <th>Complete Requests</th>
              <th>Status</th>

              <th>View Profile</th>
            </tr>
          </thead>
          <tbody>
            {/* {formData.length !== 0 ? ( */}
            {formData && Array.isArray(formData) && formData.length > 0 ? (
              formData.map((company) => (
                <tr key={company?.id}>
                  <td>CMAU2312086</td>
                  <td>
                    <span className="total">07</span>
                  </td>
                  <td>
                    <span className="pending">02</span>
                  </td>
                  <td>
                    <span className="complete">02</span>
                  </td>
                  <td>
                    <span className={`status ${"active"}`}>Active</span>
                  </td>

                  <td>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "#6b46c1",
                        fontSize: "10px",
                        textTransform: "none",
                      }}
                      // onClick={() =>
                      //   navigate(`/dashboard/anexV/${company?.id}`)
                      // }
                    >
                      View Profile
                    </Button>
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

export default Draft;
