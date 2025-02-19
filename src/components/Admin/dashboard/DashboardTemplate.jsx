import React, { useState } from "react";
import Companies from "../../company/Companies";
// Import the CSS file

import "./DashboardTemplate.css";
import { Button } from "@mui/material";
import CreateCompany from "../../auth/createCompany/CreateCompany";
const DashboardTemplate = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboard-container">
      <main className="main-content">
        <header className="header">
          <h2>Dashboard</h2>
          <div>
            <div>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Create Company
              </Button>
              <CreateCompany open={open} onClose={() => setOpen(false)} />
            </div>
          </div>
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
      </main>
      <div>
        <Companies />
      </div>
    </div>
  );
};

export default DashboardTemplate;
