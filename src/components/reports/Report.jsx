import React, { useState, useEffect } from "react";

const Report = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [companyStatus, setCompanyStatus] = useState("");
  const [filter, setFilter] = useState("weekly");
  const [reports, setReports] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch all companies on mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch("https://annex.sofinish.co.uk/api/companies");
        if (!response.ok) throw new Error("Failed to fetch companies");
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Fetch reports when company, filter, or status changes
  useEffect(() => {
    if (!selectedCompany || !filter) return;

    const fetchReports = async () => {
      try {
        const url = `https://annex.sofinish.co.uk/api/reports?company_id=${selectedCompany}&filter=${filter}${companyStatus ? `&status=${companyStatus}` : ""}`;
        console.log("Fetching reports from:", url);

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch reports");

        const data = await response.json();
        console.log("Fetched Reports Data:", data);

        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReports(null);
      }
    };

    fetchReports();
  }, [selectedCompany, companyStatus, filter]);

  // Handle company selection
  const handleCompanyChange = (companyId) => {
    setSelectedCompany(companyId);
    setFilter("weekly"); // Reset filter to default
    setReports(null);
    setCurrentPage(1); // Reset pagination

    if (companyId === "All") {
      setCompanyStatus("");
    } else {
      const selectedCompanyData = companies.find((company) => String(company.id) === String(companyId));
      if (selectedCompanyData) {
        setCompanyStatus(selectedCompanyData.status === 1 ? "completed" : "pending");
      }
    }
  };

  // Pagination functions
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="p-4 w-full min-h-screen">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Company Selection */}
          <div className="relative w-full sm:w-1/2">
            <select
              className="w-full border border-gray-300 p-2 pr-10 rounded-md appearance-none bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedCompany}
              onChange={(e) => handleCompanyChange(e.target.value)}
            >
              <option value="All">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.company}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Selection */}
          {selectedCompany && (
            <div className="relative w-full sm:w-1/2">
              <select
                className="w-full border border-gray-300 p-2 pr-10 rounded-md appearance-none bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => {
                  setFilter(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}
        </div>

      {/* Table */}
      {reports && (
        <div>
          <table className="w-full border-collapse border border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Period</th>
                <th className="p-2">Total Forms</th>
                <th className="p-2">Request - Pending - Signed</th>
              </tr>
            </thead>
            <tbody>
              {/* Weekly Reports */}
              {filter === "weekly" &&
                getPaginatedData(reports.weeks || []).map((week, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                       {/* {week.week_number}  */}
                       Week ({week.start_date} - {week.end_date})
                    </td>
                    <td className="border border-gray-300 p-2">
                      {week.applications?.total_forms ?? 0}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {week.applications?.total_emails ?? 0} -{" "}
                      {week.applications?.total_signatures ?? 0} -{" "}
                      {(week.applications?.total_emails ?? 0) -
                        (week.applications?.total_signatures ?? 0)}
                    </td>
                  </tr>
                ))}

              {/* Monthly Reports */}
              {filter === "monthly" &&
                getPaginatedData(reports.months || []).map((month, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {month.month} ({month.start_date} - {month.end_date})
                    </td>
                    <td className="border border-gray-300 p-2">
                      {month.applications?.total_forms ?? 0}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {month.applications?.total_emails ?? 0} -{" "}
                      {month.applications?.total_signatures ?? 0} -{" "}
                      {(month.applications?.total_emails ?? 0) -
                        (month.applications?.total_signatures ?? 0)}
                    </td>
                  </tr>
                ))}

              {/* Yearly Reports */}
              {filter === "yearly" &&
                getPaginatedData(reports.years || []).map((year, index) => (
                  <tr key={index} className="text-center">
                    <td className="border border-gray-300 p-2">
                      Year {year.year} ({year.start_date} - {year.end_date})
                    </td>
                    <td className="border border-gray-300 p-2">
                      {year.applications?.total_forms ?? 0}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {year.applications?.total_emails ?? 0} -{" "}
                      {year.applications?.total_signatures ?? 0} -{" "}
                      {(year.applications?.total_emails ?? 0) -
                        (year.applications?.total_signatures ?? 0)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">Page {currentPage}</span>
            <button
              onClick={nextPage}
              disabled={
                (filter === "weekly" && reports.weeks && currentPage * itemsPerPage >= reports.weeks.length) ||
                (filter === "monthly" && reports.months && currentPage * itemsPerPage >= reports.months.length) ||
                (filter === "yearly" && reports.years && currentPage * itemsPerPage >= reports.years.length)
              }
              className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
