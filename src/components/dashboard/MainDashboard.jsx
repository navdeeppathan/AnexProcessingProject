import React, { useEffect, useState } from "react";
import "./MainDashboard.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";
const MainDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);
  console.log(userId);
  console.log(userId.role_id);

  //total
  const totaldata = localStorage.getItem("totaldata");
  const totaldatas = JSON.parse(totaldata);
  // console.log("total data:-", totaldatas);
  //  console.log(userId.role_id);
  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/companyforms?id=${userId?.company_id}`,
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

  console.log("formdata:-", formData);
  return (
    <div className="min-h-screen">
      <div>
        <main className="flex-1 p-5 bg-[#f4f4f9]">
          <header className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            {userId?.role_id === 3 ? (
              ""
            ) : (
              <button
                className="create-btn"
                // disabled={}
                onClick={() => navigate("/dashboard/annex-form")}
              >
                Create ANNEX Form
              </button>
            )}
          </header>
          <div className="stats-cards">
            <div className="card blue">
              Pending Signatures
              <h2>{totaldatas?.countSignature - totaldatas?.doneSignature}</h2>
            </div>
            <div className="card purple">
              Total Number of Annex Forms <h2>{totaldatas?.form}</h2>
            </div>
            <div className="card orange">
              Done Signatures <h2>{totaldatas?.doneSignature}</h2>
            </div>
            <div className="card light-blue">
              Total Requests <h2>{totaldatas?.countSignature}</h2>
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Annex</th>
                <th>Total Requests</th>
                <th>Pending Requests</th>
                <th>Complete Requests</th>
                <th>Status</th>

                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {/* {formData.length !== 0 ? ( */}
              {formData && Array.isArray(formData) && formData.length > 0 ? (
                formData.map((company) => (
                  <tr key={company?.id}>
                    <td>{company?.annex_id}</td>
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
                        onClick={() =>
                          navigate(`/dashboard/anexV/${company?.id}`)
                        }
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
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
