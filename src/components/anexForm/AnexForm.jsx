import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AnnexForms.css";

const AnnexForm = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch forms from API
  useEffect(() => {
    const fetchForms = async () => {
      try {
        
        const response = await fetch("https://annex.sofinish.co.uk/api/forms");
        if (!response.ok) {
          throw new Error("Failed to fetch forms");
        }
        const data = await response.json();
        setForms(data); 

      } catch (err) {

        setError(err.message);
      
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <div className="h-screen px-10">
        <main className="content">
          <header className="header">
            <h2>Dashboard</h2>
            <div className="profile"></div>
            <button className="create-btn" onClick={() => navigate("/dashboard/annex-form")}>
              Create ANNEX Form
            </button>
          </header>

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="forms-container">
              {forms.length === 0 ? (
                <p>No forms submitted yet.</p>
              ) : (
                forms.map((form) => (
                  <div key={form.id} className="form-card">
                    <h3>{form.title}</h3>
                    <p className="form-details">{form.details}</p>
                    <p className="form-description">{form.description}</p>
                    <span className="copy-icon">📋</span>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AnnexForm;
