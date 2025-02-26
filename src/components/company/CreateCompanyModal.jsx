import React, { useState } from "react";
import "./CreateCompanyModal.css";

const CreateCompanyModal = () => {
  const [showModal, setShowModal] = useState(false);
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
  });
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (logo) formDataToSend.append("logo", logo);

    try {
      const response = await fetch("https://annex.sofinish.co.uk/api/companies", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Company created successfully!");
        setShowModal(false);
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
        });
        setLogo(null);
      } else {
        setError(data.message || "Failed to create company");
      }
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Button to Open Modal */}
      <button className="create-company-btn" onClick={() => setShowModal(true)}>
        Create Company
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Create Company</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form className="modal-form" onSubmit={handleSubmit}>
              <label>Picture/Logo</label>
              <input type="file" onChange={handleFileChange} />

              <div className="row">
                <input type="text" name="company_name" placeholder="Company Name" value={formData.company_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="row">
                <input type="text" name="registration_number" placeholder="Registration Number" value={formData.registration_number} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
              </div>

              <div className="row">
                <select name="country" value={formData.country} onChange={handleChange} required>
                  <option value="">Select Country</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="India">India</option>
                </select>
                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
              </div>

              <div className="row">
                <input type="text" name="company_head" placeholder="Company Head" value={formData.company_head} onChange={handleChange} required />
                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} required />
              </div>

              <div className="row">
                <input type="text" name="annex_price" placeholder="Annex Price" value={formData.annex_price} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Now"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCompanyModal;
