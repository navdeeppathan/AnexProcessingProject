import React from "react";
import "./MainDashboard.css";
const MainDashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h1 className="logo">ANNEX</h1>
        <ul className="menu">
          <li>📊 Dashboard</li>
          <li>📄 Annex Forms</li>
          <li>👤 My Profile</li>
          <li>📖 Edit Profile</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        {/* Header */}
        <header className="header">
          <h2>Dashboard</h2>
          <div className="header-right">
            <span>Company</span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SRRmhH4X5N2e4QalcoxVbzYsD44C-sQv-w&s"
              alt="profile"
              className="profile-img"
            />
            <button className="create-btn">Create ANNEX Form</button>
          </div>
        </header>

        {/* Cards */}
        <div className="cards">
          {[
            { title: "Pending Signatures", count: 75, color: "blue" },
            {
              title: "Total Number of Annex Forms",
              count: 67,
              color: "lightblue",
            },
            { title: "Pending Requests", count: 36, color: "orange" },
            { title: "Total Requests", count: 129, color: "blue" },
          ].map((card, index) => (
            <div key={index} className={`card ${card.color}`}>
              <h3>{card.title}</h3>
              <p>{card.count}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <table className="data-table">
          <thead>
            <tr>
              {[
                "Annex",
                "Total Requests",
                "Pending Requests",
                "Complete Requests",
                "Status",
                "Action",
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              {
                id: "CMAU2312086",
                total: 7,
                pending: 5,
                complete: 2,
                status: "Pending",
                statusClass: "pending",
              },
              {
                id: "CMAU2312086",
                total: 7,
                pending: 5,
                complete: 2,
                status: "Pending",
                statusClass: "pending",
              },
              {
                id: "CMAU2312086",
                total: 6,
                pending: 0,
                complete: 6,
                status: "Complete",
                statusClass: "complete",
              },
            ].map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td className="blue-text">{row.total}</td>
                <td className="orange-text">{row.pending}</td>
                <td className="green-text">{row.complete}</td>
                <td className={row.statusClass}>{row.status}</td>
                <td>
                  <button className="view-btn">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default MainDashboard;
