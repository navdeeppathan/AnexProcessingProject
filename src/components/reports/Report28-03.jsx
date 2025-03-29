import React, { useState, useEffect } from "react";

const Report = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyStatus, setCompanyStatus] = useState("");
  const [companyCreatedAt, setCompanyCreatedAt] = useState(null);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState([]);

  // Fetch all companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          "https://annex.sofinish.co.uk/api/companies"
        );
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Handle company selection
  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
    setFilter(""); // Reset filter when changing company

    const selectedCompanyData = companies.find(
      (company) => String(company.id) === String(companyId)
    );
    if (selectedCompanyData) {
      setCompanyCreatedAt(selectedCompanyData.created_at);
      setCompanyStatus(
        selectedCompanyData.status === 1 ? "completed" : "pending"
      );
    }
  };

  // Fetch reports when company, status, or filter changes
  useEffect(() => {
    if (!selectedCompany || !companyStatus || !filter) return;

    const fetchReports = async () => {
      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/reports?company_id=${selectedCompany}&status=${companyStatus}&filter=${filter}`
        );
        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();
        console.log("Fetched Reports Data:", data); // Debugging step

        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports([]); // Set empty array to prevent filter errors
      }
    };

    fetchReports();
  }, [selectedCompany, companyStatus, filter]);

  console.log(reports);

  return (
    <div className="p-4 w-full min-h-screen">
      <div className="flex gap-4 mb-4">
        {/* Company Selection */}
        <select
          className="border p-2 rounded w-1/2"
          value={selectedCompany}
          onChange={(e) => handleCompanyChange(e.target.value)}
        >
          <option value="">Select Company</option>
          <option value="All">All</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.company}
            </option>
          ))}
        </select>

        {/* Filter Selection */}
        {selectedCompany && (
          <select
            className="border p-2 rounded w-1/2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Select Filter</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        )}
      </div>

      {/* Search Bar */}

      {/* Table */}
      {reports && (
        <table className="w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-200">
              <th>Total Forms</th>
              <th>Request - Pending - Signed</th>
              
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">
                {reports.total_forms ?? 0}
              </td>
              <td className="border border-gray-300 p-2">
                {reports.total_emails ?? 0} - {reports.total_signatures ?? 0} - {(reports.total_emails ?? 0) - (reports.total_signatures ?? 0)}
              </td>
              
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Report;