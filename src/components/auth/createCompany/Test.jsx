import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Form = () => {
  const generateId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user).user_id;
    return user_id;
  };

  // Initialize carriers array in the main state
  const [carriers, setCarriers] = useState([
    {
      name: "",
      address: "",
      contact_person: "",
      phone: "",
      fax: "",
      email: "",
      means_of_transport: "",
      date_of_transport: "",
      departure_date: "",
    },
  ]);

  const [formData, setFormData] = useState({
    user_id: generateId(),
    company_name: "",
    address: "",
    contact_number: "",
    contact_person: "",
    fax: "",
    email: "",
    //... rest of your form fields here
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Update the value of a carrier field based on its index
  const handleCarrierChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCarriers = [...carriers];
    updatedCarriers[index][name] = value;
    setCarriers(updatedCarriers);
  };

  // Add a new empty carrier to the list
  const addCarrier = () => {
    setCarriers([
      ...carriers,
      {
        name: "",
        address: "",
        contact_person: "",
        phone: "",
        fax: "",
        email: "",
        means_of_transport: "",
        date_of_transport: "",
        departure_date: "",
      },
    ]);
  };

  // Remove a carrier by index
  const removeCarrier = (index) => {
    if (carriers.length > 1) {
      setCarriers(carriers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Create form data to send
    const formDataToSend = new FormData();

    // Add all regular form fields
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Add carriers as JSON string
    formDataToSend.append("carriers", JSON.stringify(carriers));

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/submit-form",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setSuccess("Form submitted successfully!");
        // Reset form data if needed
        // setFormData({...});
        // Reset carriers to one empty carrier
        setCarriers([
          {
            name: "",
            address: "",
            contact_person: "",
            phone: "",
            fax: "",
            email: "",
            means_of_transport: "",
            date_of_transport: "",
            departure_date: "",
          },
        ]);
      } else {
        setError(data.message || "Failed to submit form");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8F9FA]">
      <form onSubmit={handleSubmit}>
        <Box p={3} display="flex" flexDirection="column" gap={3}>
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
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                Send for Signature
              </Button>
            </Box>
          </div>

          {/* Status messages */}
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}
          </div>

          {/* Your other form sections here */}

          {/* Carriers Section */}
          <Box p={2} borderRadius={2} bgcolor="white">
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Carriers Information
            </Typography>

            {carriers.map((carrier, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #E0E0E0",
                  borderRadius: 2,
                  p: 2,
                  mb: 2,
                  position: "relative",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Carrier {index + 1}
                </Typography>

                {carriers.length > 1 && (
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={() => removeCarrier(index)}
                    sx={{ position: "absolute", top: 8, right: 8 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      value={carrier.name}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      fullWidth
                      name="address"
                      label="Address"
                      value={carrier.address}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="contact_person"
                      label="Contact Person"
                      value={carrier.contact_person}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="phone"
                      label="Phone"
                      value={carrier.phone}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="fax"
                      label="Fax"
                      value={carrier.fax}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="email"
                      label="Email"
                      type="email"
                      value={carrier.email}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="means_of_transport"
                      label="Means of Transport"
                      value={carrier.means_of_transport}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="date_of_transport"
                      label="Date of Transport"
                      type="date"
                      value={carrier.date_of_transport}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      name="departure_date"
                      label="Departure Date"
                      type="date"
                      value={carrier.departure_date}
                      onChange={(e) => handleCarrierChange(index, e)}
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}

            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                onClick={addCarrier}
                startIcon={<AddIcon />}
                sx={{
                  color: "#5C5C5C",
                  border: "1px solid #A8A8A8",
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Add Carrier
              </Button>
            </Box>
          </Box>

          {/* Your other form sections here */}

          {/* Submit Button */}
          <div>
            <Box display="flex" justifyContent="end">
              <Button
                variant="contained"
                type="submit"
                startIcon={!loading && <EmailIcon />}
                sx={{
                  textTransform: "none",
                  backgroundColor: "#576CBC",
                  "&:hover": { backgroundColor: "#405B8C" },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  "Submit Form"
                )}
              </Button>
            </Box>
          </div>
        </Box>
      </form>
    </div>
  );
};

export default Form;
