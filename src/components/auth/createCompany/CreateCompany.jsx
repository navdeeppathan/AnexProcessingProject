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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const CreateCompany = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: "",
    email: "",
    registration_number: "",
    city: "",
    country: "",
    address: "",
    company_head: "",
    phone_number: "",
    annex_price: "",
    password: "",
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Store errors as an object

  const cities = ["New York", "London", "Paris", "Berlin"];
  const countries = ["USA", "UK", "France", "Germany"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when typing
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone_number: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, logo: file }));
    }
  };

  const handleBrowseClick = () => {
    document.getElementById("logo-upload").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/companies",
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      if (response.ok) {
        onClose();
        setFormData({
          company_name: "",
          email: "",
          registration_number: "",
          city: "",
          country: "",
          address: "",
          company_head: "",
          phone_number: "",
          annex_price: "",
          password: "",
          logo: null,
        });
      } else {
        setErrors(data.errors || {});
      }
    } catch (err) {
      setErrors({ general: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
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

        {/* General Error Message */}
        {errors.general && (
          <Typography color="error">{errors.general}</Typography>
        )}

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
              value={formData.logo ? formData.logo.name : ""}
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
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.company_name}
              helperText={errors.company_name?.[0] || ""}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email?.[0] || ""}
            />
            <TextField
              label="Registration Number"
              name="registration_number"
              value={formData.registration_number}
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
              name="company_head"
              value={formData.company_head}
              onChange={handleChange}
              fullWidth
            />
            <PhoneInput
              country={"gb"}
              value={formData.phone_number}
              onChange={handlePhoneChange}
              inputStyle={{ width: "100%" }}
            />
            <TextField
              label="Annex Price"
              type="number"
              name="annex_price"
              value={formData.annex_price}
              onChange={handleChange}
              fullWidth
              error={!!errors.annex_price}
              helperText={errors.annex_price?.[0] || ""}
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

          {/* Submit Button */}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#6A40E3",
                "&:hover": { backgroundColor: "#5A30D3" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Now"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateCompany;
