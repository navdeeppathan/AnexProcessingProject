import React from "react";
import "./MainDashboard.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const companies = [
  { id: 1, anex: "CMAU2312086", total: "07", pending: "02",complete: "02", status: "Active",  },
  { id: 2, anex: "CMAU2312086", total: "07", pending: "02",complete: "02", status: "Active", },
  { id: 3, anex: "CMAU2312086", total: "07", pending: "02", complete: "02",status: "Active",},
  { id: 4, anex: "CMAU2312086", total: "07", pending: "02", complete: "02",status: "Active",},
  { id: 5, anex: "CMAU2312086", total: "07", pending: "02", complete: "02",status: "Block"},
  { id: 6, anex: "CMAU2312086", total: "07", pending: "02", complete: "02",status: "Block", },
  { id: 7, anex: "CMAU2312086", total: "07", pending: "02", complete: "02",status: "Block",},
];

const MainDashboard = () => {
  return (
    <div>
      <div className="main-header">
        {/* <h1>Annex</h1> */}
        <img src="logo.png" alt="Logo Icon" className="logo" />
      </div>
      <div className="dashboard-container">
        <aside className="sidebar">
          <nav>
            <ul>
              <li className="active">
                <DashboardIcon /> Dashboard
              </li>
              <li>
                <DescriptionIcon /> Annex Forms
              </li>
              <li>
                <PeopleAltIcon /> My Profile
              </li>
              <li>
                <MenuBookIcon /> Edit Profile
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content">
          <header className="header">
            <h2>Dashboard</h2>
            <div className="profile"></div>
            <button className="create-btn">Create ANNEX Form</button>
          </header>
          <div className="stats-cards">
            <div className="card blue">
              Pending Signatures <h2>75</h2>
            </div>
            <div className="card purple">
              Total Number of Annex Forms <h2>67</h2>
            </div>
            <div className="card orange">
              Pending Requests <h2>36</h2>
            </div>
            <div className="card light-blue">
              Total Requests <h2>129</h2>
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
                <th>Action</th>
                <th>View Profile</th>
              </tr>
            </thead>
            <tbody>
            {companies.map((company) => (
                <tr key={company.id}>
                  <td>{company.anex}</td>
                  <td><span className="total">{company.total}</span></td>
                  <td><span className="pending">{company.pending}</span></td>
                  <td><span className="complete">{company.complete}</span></td>
                  <td>
                    <span className={`status ${company.status === "Active" ? "active" : "block"}`}>
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

export default MainDashboard;
