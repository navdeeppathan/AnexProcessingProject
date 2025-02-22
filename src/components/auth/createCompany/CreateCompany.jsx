import React, { useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const CreateCompany = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    registrationNumber: "",
    city: "",
    country: "",
    address: "",
    companyHead: "",
    phoneNumber: "",
    annexPrice: "",
    password: "",
    logo: null,
  });

  const cities = ["New York", "London", "Paris", "Berlin"];
  const countries = ["USA", "UK", "France", "Germany"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNumber: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file.name }));
    }
  };

  const handleBrowseClick = () => {
    document.getElementById("logo-upload").click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Create Company
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Box mt={2}>
            <input
              type="file"
              id="logo-upload"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <TextField
              label="Picture / Logo"
              value={formData.logo || ""}
              fullWidth
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      variant="contained"
                      sx={{ color: "black", bgcolor: "lightgray" }}
                      onClick={handleBrowseClick}
                    >
                      Browse
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
            <TextField
              label="Company Name"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Registration Number"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              select
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Company Head"
              name="companyHead"
              value={formData.companyHead}
              onChange={handleChange}
              fullWidth
            />
            <PhoneInput
              country={"gb"}
              value={formData.phoneNumber}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
            />
            <TextField
              label="Annex Price"
              name="annexPrice"
              value={formData.annexPrice}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          <Box
            mt={3}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#6A40E3",
                "&:hover": { backgroundColor: "#5A30D3" },
                paddingTop: "7px",
                paddingBottom: "7px",
              }}
            >
              Create Now
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCompany;
