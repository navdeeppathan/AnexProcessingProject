import React from "react";
import "./Companies.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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

const Companies = () => {
  return (
    <div>
      <div className="dashboard-container">
        <main className="main-content">
          <header className="header">
            <h2>Companies</h2>
          </header>

          <table className="data-table">
            <thead>
              <tr>
                <th>Annex</th>
                <th>Total Requests</th>
                <th>Pending Requests</th>
                <th>Complete Requests</th>
                <th>Status</th>
                <th>Action</th>
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

export default Companies;
