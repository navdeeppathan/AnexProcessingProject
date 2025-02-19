import React, { useState } from "react";
import { Button } from "@mui/material";
import CreateCompanyModal from "./CreateCompany.jsx";

const Test = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Modal
        </Button>
        <CreateCompanyModal open={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
};

export default Test;
