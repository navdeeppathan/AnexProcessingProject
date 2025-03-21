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
  CircularProgress,
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
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
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

  // Handle show company details
  const handleShowCompanyDetails = (company) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
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
                  <th>Action</th>
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
                    <td>
                      <div className="flex items-center">
                        <button
                          className="view-profile"
                          onClick={() => handleShowCompanyDetails(company)}
                        >
                          View
                        </button>
                        &nbsp;
                        <button
                          className="view-profile"
                          onClick={() =>
                            navigate(`/admin/dashboard/action/${company.id}`)
                          }
                        >
                          Audit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <CompanyDetailsModal
          open={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          company={selectedCompany}
        />
      )}
    </div>
  );
};

// Separate component for company details modal
// const CompanyDetailsModal = ({
//   open,
//   onClose,
//   companyId
// }) => {
//   const [companyData, setCompanyData] = useState({
//     company_name: "",
//     email: "",
//     registrationGITnumber: "",
//     city: "",
//     country: "",
//     address: "",
//     company_head: "",
//     phone_number: "",
//     annex_price: "",
//     password: "",
//     logo: null,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch company details when modal opens
//   // yy

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box
//         sx={{
//           position: "absolute",
//           top: "50%",
//           left: "50%",
//           transform: "translate(-50%, -50%)",
//           width: "50%",
//           bgcolor: "background.paper",
//           boxShadow: 24,
//           p: 4,
//           borderRadius: 2,
//           maxHeight: "90vh",
//           overflowY: "auto",
//         }}
//       >
//         {/* Header */}
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Company Details
//           </Typography>
//           <IconButton onClick={onClose}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         {/* Content */}
//         {loading ? (
//           <Box display="flex" justifyContent="center" my={4}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Typography color="error" mt={2}>
//             {error}
//           </Typography>
//         ) : (
//           <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
//             <TextField
//               label="Company Name"
//               name="company_name"
//               value={companyData.company_name || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Email"
//               name="email"
//               value={companyData.email || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Registration Number"
//               name="registration_number"
//               value={companyData.registration_number || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="City"
//               name="city"
//               value={companyData.city || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Country"
//               name="country"
//               value={companyData.country || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Address"
//               name="address"
//               value={companyData.address || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Company Head"
//               name="company_head"
//               value={companyData.company_head || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Phone Number"
//               name="phone_number"
//               value={companyData.phone_number || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Annex Price"
//               name="annex_price"
//               value={companyData.annex_price || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//           </Box>
//         )}

//         {/* Footer */}
//         <Box mt={3} display="flex" justifyContent="flex-end">
//           <Button variant="contained" onClick={onClose}>
//             Close
//           </Button>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };
// Separate component for company details modal
const CompanyDetailsModal = ({ open, onClose, company }) => {
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
          maxHeight: "90vh",
          overflowY: "auto",
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

        {/* Content */}
        <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
          <TextField
            label="Company Name"
            value={company.company_name}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Email"
            value={company.email}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Phone Number"
            value={company.phone_number}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="City"
            value={company.city}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Country"
            value={company.country}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Address"
            value={company.address}
            fullWidth
            InputProps={{ readOnly: true }}
          />
          <TextField
            label="Company Head"
            value={company.company_head}
            fullWidth
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Footer */}
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default MainCompanies;
