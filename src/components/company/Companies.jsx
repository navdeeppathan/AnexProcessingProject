import React, { useEffect, useState } from "react";
import "./Companies.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("https://annex.sofinish.co.uk/api/companies");
        const data = await response.json();

        if (response.ok) {
          console.log(data);
          setCompanies(data);
        } else {
          setError(data.message || "Failed to fetch companies");
        }
      } catch (error) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Loading companies...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div>
      <main>
        <header className="header">
          <h2 className="font-semibold">Companies</h2>
        </header>

        <table className="data-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Company Name</th>
              <th>Phone no</th>
              <th>Email</th>
              <th>Status</th>
              <th>Operation</th>
              <th>View Profile</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td>
                  <img
                    src={company.image || "https://i.pravatar.cc/40"}
                    alt="Company"
                    className="company-img"
                  />
                </td>
                <td>{company.name}</td>
                <td>{company.phone}</td>
                <td>{company.email}</td>
                <td>
                  <span
                    className={`status ${
                      company.status === "Active" ? "active" : "block"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td>
                  <span className="edit">✏️</span>
                  <span className="delete">🗑️</span>
                </td>
                <td>
                  <button className="view-profile">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Companies;
