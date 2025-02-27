import React, { useState, useEffect } from "react";
import "./Companies.css";
import { Button } from "@mui/material";
import CreateCompany from "../auth/createCompany/CreateCompany";
import { useNavigate } from "react-router-dom";

const MainCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const navigate = useNavigate();

  // Fetch Companies from API
  const fetchCompanies = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("https://annex.sofinish.co.uk/api/companies");
      const data = await response.json();
      if (response.ok) {
        setCompanies(data.companies || []);
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

  // Handle Delete Company
  const deleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      const response = await fetch(`https://annex.sofinish.co.uk/api/companies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCompanies(companies.filter((company) => company.id !== id));
      } else {
        alert("Failed to delete company.");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    }
  };

  // Handle Edit Company
  const editCompany = (company) => {
    setEditingCompany(company);
    setOpen(true);
  };

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
            <CreateCompany open={open} onClose={() => setOpen(false)} company={editingCompany} />
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
                        src={company.photo || "https://i.pravatar.cc/40"}
                        alt="Company"
                        className="company-img"
                      />
                    </td>
                    <td>{company.company_name}</td>
                    <td>{company.phone_number || "Unavailable"}</td>
                    <td>{company.email || "Unavailable"}</td>
                    <td>
                    <span
                        className={`status ${company.status == "1" ? "active" : "block"}`}
                      >
                           {"Active" || "Inactive"}
                      </span>
                    </td>
                    <td>
                      <span className="edit" onClick={() => editCompany(company)}>✏️</span>
                      <span className="delete" onClick={() => deleteCompany(company.id)}>🗑️</span>
                    </td>
                    <td>
                      <button className="view-profile" onClick={() => navigate(`/company/${company.id}`)}>
                        View Profile
                      </button>
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
