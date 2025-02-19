import React from "react";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const Form = () => {
  return (
    <div>
      <form action="">
        <Box p={3}>
          {/* Form Title */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Annex Form
            </Typography>

            {/* Send for Signature Button */}
            <Box display="flex" mb={2}>
              <Button
                variant="contained"
                startIcon={<EmailIcon />}
                sx={{
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                Send for Signature
              </Button>
            </Box>
          </div>

          {/* Section: Consignment Information */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="#F8F9FA" mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                1. Consignment Information:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Address" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact Person"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Tel" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Fax" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label="Email" variant="outlined" />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Section: Consignee */}
          <div>
            <Box p={2} borderRadius={2} bgcolor="#F8F9FA">
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                2. Consignee:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    defaultValue="Lorem Ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Address"
                    variant="outlined"
                    defaultValue="Lorem ipsum dolor sit mate"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Contact Person"
                    variant="outlined"
                    defaultValue="Lorem ipsum"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Tel"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Fax"
                    variant="outlined"
                    defaultValue="01234567890"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    defaultValue="info@loremipsum.co.uk"
                  />
                </Grid>
              </Grid>
            </Box>
          </div>

          {/* Section: Actual Quantity & Date of Shipment */}
          <Box p={2} borderRadius={2} bgcolor="#F8F9FA">
            <Grid container spacing={2}>
              {/* Actual Quantity */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  3. Actual Quantity:
                </Typography>

                <TextField
                  label="49 DRUMS – Tonnes (Mg) m³:"
                  fullWidth
                  variant="outlined"
                />
              </Grid>

              {/* Actual Date of Shipment */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="bold">
                  4. Actual Date of Shipment:
                </Typography>

                <TextField label="Date" fullWidth variant="outlined" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </form>
    </div>
  );
};

export default Form;
