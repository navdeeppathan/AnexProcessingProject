import React, { useState, useEffect } from "react";
import "./Companies.css";
import { Button } from "@mui/material";
import CreateCompany from "../auth/createCompany/CreateCompany";

const MainCompanies = () => {
  const [companies, setCompanies] = useState([]); // Store companies from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch Companies from API
  const fetchCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/companies");
      const data = await response.json();
      if (response.ok) {
        setCompanies(data);
      } else {
        setError("Failed to fetch companies.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-10 space-y-4">
      <div>
        <header className="flex items-center justify-between bg-white rounded-b-md">
          <h2 className="font-bold text-3xl">Companies</h2>
          <div>
            <Button
              variant="contained"
              sx={{ bgcolor: "#6D5AC5", padding: "10px" }}
              onClick={() => setOpen(true)}
            >
              Create Company
            </Button>
            <CreateCompany open={open} onClose={() => setOpen(false)} />
          </div>
        </header>
      </div>

      <div>
        <main>
          <header className="header">
            <h2 className="font-semibold">Companies</h2>
          </header>

          {loading ? (
            <p>Loading companies...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Company Name</th>
                  <th>Phone no</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Operation</th>
                  <th>View Profile</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td>
                      <img
                        src={company.image || "https://i.pravatar.cc/40"}
                        alt="Company"
                        className="company-img"
                      />
                    </td>
                    <td>{company.company_name}</td>
                    <td>{company.phone_number}</td>
                    <td>{company.email}</td>
                    <td>
                      <span
                        className={`status ${
                          company.status === "Active" ? "active" : "block"
                        }`}
                      >
                        {company.status}
                      </span>
                    </td>
                    <td>
                      <span className="edit">✏️</span>
                      <span className="delete">🗑️</span>
                    </td>
                    <td>
                      <button className="view-profile">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
};

export default MainCompanies;
