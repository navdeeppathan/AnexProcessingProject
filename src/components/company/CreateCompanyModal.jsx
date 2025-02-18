import React, { useState } from "react";
import "./CreateCompanyModal.css";

const CreateCompanyModal = () => {
  const [showModal, setShowModal] = useState(false);

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

            <form className="modal-form">
              <label>Picture/Logo</label>
              <input type="file" />

              <div className="row">
                <input type="text" placeholder="Company Name" />
                <input type="email" placeholder="Email" />
              </div>

              <div className="row">
                <input type="text" placeholder="Registration Number" />
                <input type="text" placeholder="City" />
              </div>

              <div className="row">
                <select>
                  <option>Country</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>India</option>
                </select>
                <input type="text" placeholder="Address" />
              </div>

              <div className="row">
                <input type="text" placeholder="Company Head" />
                <input type="text" placeholder="Phone Number" />
              </div>

              <div className="row">
                <input type="text" placeholder="Annex Price" />
                <input type="password" placeholder="Password" />
              </div>

              <button type="submit" className="submit-btn">
                Create Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCompanyModal;
