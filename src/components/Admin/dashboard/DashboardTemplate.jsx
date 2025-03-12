import React, { useState } from "react";
import Companies from "../../company/Companies";

import "./DashboardTemplate.css";
import { Button } from "@mui/material";
import CreateCompany from "../../auth/createCompany/CreateCompany";
const DashboardTemplate = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="h-screen">
      <div>
        <div className="p-10">
          <main>
            <div className="flex flex-col">
              <header className="flex items-center justify-between bg-white  rounded-b-md">
                <h2 className="font-bold text-3xl">Dashboard</h2>

                {/* <div>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#6D5AC5", padding: "10px" }}
                    onClick={() => setOpen(true)}
                  >
                    Create Company
                  </Button>
                  <CreateCompany open={open} onClose={() => setOpen(false)} />
                </div> */}
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
            </div>
          </main>
          {/* <div className="">
            <Companies />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default DashboardTemplate;
