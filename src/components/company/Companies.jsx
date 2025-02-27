import React, { useEffect, useState } from "react";
import "./Companies.css";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "https://annex.sofinish.co.uk/api/companies"
        );
        const data = await response.json();
        console.log("data:-", data);
        if (response.ok) {
          console.log(data);
          setCompanies(data.companies || []); // Ensure we're accessing the correct array
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
            {companies?.companies.map((company) => (
              <tr key={company.id}>
                <td>
                  <img
                    src={company.photo || "https://i.pravatar.cc/40"}
                    alt="Company"
                    className="company-img"
                  />
                </td>
                <td>{company.company_name}</td>
                <td>{company.phone_number ? company.phone_number: "N/A"}</td>
                <td>{company.email ?company.email : "N/A"}</td>
                <td>{company.name}</td>
                <td>{company.phone_number}</td>
                <td>{company.email}</td>
                <td>
                        <span className={`status ${company.status == "1" ? "active" : "block"}`} >
                           {"Active" || "Inactive"}
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
