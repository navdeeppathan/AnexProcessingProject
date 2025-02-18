import React from "react";
import "./MainDashboard.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const MainDashboard = () => {
  return (
    <div>
      <div className="main-header">
        <h1>Annex</h1>
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
              </tr>
            </thead>
            <tbody>
              <tr className="pending">
                <td>CMAU2312086</td>
                <td>07</td>
                <td>05</td>
                <td>02</td>
                <td className="status">Pending</td>
                <td>
                  <button className="details-btn">View Details</button>
                </td>
              </tr>
              <tr className="complete">
                <td>CMAU2312086</td>
                <td>09</td>
                <td>0</td>
                <td>09</td>
                <td className="status">Complete</td>
                <td>
                  <button className="details-btn">View Details</button>
                </td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;
