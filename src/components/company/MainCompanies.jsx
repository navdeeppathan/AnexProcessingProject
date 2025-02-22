import React, { useState } from "react";
import "./Companies.css";
import { Button } from "@mui/material";
import CreateCompany from "../auth/createCompany/CreateCompany";

// Import the CSS file

const companies = [
  {
    id: 1,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Active",
    image: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Active",
    image: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Active",
    image: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Active",
    image: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Block",
    image: "https://i.pravatar.cc/40?img=5",
  },
  {
    id: 6,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Block",
    image: "https://i.pravatar.cc/40?img=6",
  },
  {
    id: 7,
    name: "Sofa Bespoke",
    phone: "01234567890",
    email: "m.abeerabid@gmail.com",
    status: "Block",
    image: "https://i.pravatar.cc/40?img=7",
  },
];

const MainCompanies = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-10 space-y-4">
      <div>
        <header className="flex items-center justify-between bg-white  rounded-b-md">
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

          <table className="data-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Company Name</th>
                <th>Phone no</th>
                <th>Email</th>
                <th>Status</th>
                <th>Opration</th>
                <th>View Profile</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td>
                    <img
                      src={company.image}
                      alt="Company"
                      className="company-img"
                    />
                  </td>
                  <td>{company.name}</td>
                  <td>{company.phone}</td>
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
        </main>
      </div>
    </div>
  );
};

export default MainCompanies;
