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

const UserModel = ({ open, onClose }) => {
  const user = localStorage.getItem("user");
  const userId = JSON.parse(user);
  console.log(userId?.company_id);
  const [formData, setFormData] = useState({
    company_id: userId?.company_id,
    name: "",
    email: "",
    role_id: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  //   const cities = ["New York", "London", "Paris", "Berlin"];
  //   const countries = ["USA", "UK", "France", "Germany"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //   const handlePhoneChange = (value) => {
  //     setFormData((prev) => ({ ...prev, phone_number: value }));
  //   };

  //   const handleFileChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //       setFormData((prev) => ({ ...prev, logo: file }));
  //     }
  //   };

  //   const handleBrowseClick = () => {
  //     document.getElementById("logo-upload").click();
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // for (let pair of formDataToSend.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      const response = await fetch(
        "https://annex.sofinish.co.uk/api/register",
        {
          method: "POST",
          body: formDataToSend, // FormData handles file upload automatically
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("User created successfully!");
        setTimeout(() => {
          setSuccess("");
        }, 1000);
        // setTimeout(() => {
        onClose();
        // }, 2000);

        setFormData({
          name: "",
          email: "",
          role_id: "",
          password: "",
        });
      } else {
        setError(data.message || "Failed to create company.");
        setTimeout(() => {
          setError("");
        }, 1000);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setTimeout(() => {
        setError("");
      }, 1000);
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
            Create User
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Error & Success Messages */}
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Box mt={2} display="grid" gap={2} gridTemplateColumns="1fr 1fr">
            <TextField
              select
              label="User Role"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              fullWidth
              required
            >
              <MenuItem value="2">Create & Viewer</MenuItem>
              <MenuItem value="3">Viewer</MenuItem>
            </TextField>

            <TextField
              label="User Name"
              name="name"
              value={formData.name}
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
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />
          </Box>

          {/* Submit Button */}
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
              //   disabled={loading}
              sx={{
                backgroundColor: "#6A40E3",
                "&:hover": { backgroundColor: "#5A30D3" },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create User"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModel;
