import React, { useState, useEffect } from "react";
import "./Companies.css";

import CreateCompany from "../auth/createCompany/CreateCompany";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const MainCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const navigate = useNavigate();

  // Fetch Companies from API

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          "https://annex.sofinish.co.uk/api/companies"
        );
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
    fetchCompanies();
  }, [open]);

  // Handle Delete Company
  const deleteCompany = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      const response = await fetch(
        `https://annex.sofinish.co.uk/api/companies/${id}`,
        {
          method: "DELETE",
        }
      );

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
    <div className="min-h-screen p-10 space-y-4">
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
            <CreateCompany
              open={open}
              onClose={() => setOpen(false)}
              company={editingCompany}
            />
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
                  {/* <th>Operation</th> */}
                  <th>View Profile</th>
                </tr>
              </thead>
              <tbody>
                {companies?.map((company) => (
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
                        className={`status ${
                          company.status == "1" ? "active" : "block"
                        }`}
                      >
                        {"Active" || "Inactive"}
                      </span>
                    </td>
                    {/* <td>
                      <span
                        className="delete"
                        onClick={() => deleteCompany(company.id)}
                      >
                        🗑️
                      </span>
                    </td> */}
                    <td>
                      <button
                        className="view-profile"
                        // onClick={() => navigate(`/company/${company.id}`)}
                      >
                        View
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

const ShowCompanyModel = async ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    registration_number: "",
    city: "",
    country: "",
    address: "",
    company_head: "",
    phone_number: "",
    annex_price: "",
    password: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Store errors as an object

  try {
    const response = await fetch(
      `https://annex.sofinish.co.uk/api/companies/${id}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      setCompanies(companies.filter((company) => company.id !== id));
    } else {
      alert("Failed to delete company.");
    }
  } catch (err) {
    alert("Network error. Please try again.");
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Company Details
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <form>
          <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
            <TextField
              label="Company Name"
              name="company_name"
              value={formData.company_name}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              fullWidth
              required
            />
            <TextField
              label="Registration Number"
              name="registration_number"
              value={formData.registration_number}
              fullWidth
            />
            <TextField
              select
              label="City"
              name="city"
              value={formData.city}
              fullWidth
            ></TextField>
            <TextField
              select
              label="Country"
              name="country"
              value={formData.country}
              fullWidth
            ></TextField>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              fullWidth
            />
            <TextField
              label="Company Head"
              name="company_head"
              value={formData.company_head}
              fullWidth
            />
            <PhoneInput
              country={"gb"}
              value={formData.phone_number}
              inputStyle={{ width: "100%" }}
            />
            <TextField
              label="Annex Price"
              type="number"
              name="annex_price"
              value={formData.annex_price}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              fullWidth
            />
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default MainCompanies;
