import React from "react";
import "./AnnexForms.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import Form from "./Form";

const annexForms = [
  {
    id: 1,
    title: "ANNEX VII",
    details: "CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105",
    description:
      "Information accompanying Shipments of wastes referred to in article 3(2) and (4) revised version as per Official journal of the European Union 22 12 2020.",
  },
  {
    id: 2,
    title: "ANNEX VIII",
    details: "CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105",
    description:
      "Information accompanying Shipments of wastes referred to in article 3(2) and (4) revised version as per Official journal of the European Union 22 12 2020.",
  },
  {
    id: 3,
    title: "ANNEX VII",
    details: "CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105",
    description:
      "Information accompanying Shipments of wastes referred to in article 3(2) and (4) revised version as per Official journal of the European Union 22 12 2020.",
  },
  {
    id: 4,
    title: "ANNEX VIII",
    details: "CMAU2312086 - BLMCB0258247 - CMA CGM - MEX2024105",
    description:
      "Information accompanying Shipments of wastes referred to in article 3(2) and (4) revised version as per Official journal of the European Union 22 12 2020.",
  },
];

const AnnexForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="dashboard-container">
        <main className="main-content">
          <header className="header">
            <h2>Dashboard</h2>
            <div className="profile"></div>
            <button className="create-btn">Create ANNEX Form</button>
          </header>
          <div className="forms-container">
            {annexForms.map((form) => (
              <div key={form.id} className="form-card">
                <h3>{form.title}</h3>
                <p className="form-details">{form.details}</p>
                <p className="form-description">{form.description}</p>
                <span className="copy-icon">📋</span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnnexForm;
