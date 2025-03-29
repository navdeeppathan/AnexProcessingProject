import React, { useState, useEffect } from "react";

const CompanyReport = () => {
  // Get company ID from localStorage
  const getCompanyId = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user)?.company_id : null;
  };

  const [selectedCompany] = useState(getCompanyId()); // Set the company from localStorage
  const [companyStatus, setCompanyStatus] = useState("");
  const [filter, setFilter] = useState("weekly");
  const [reports, setReports] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch reports when filter or status changes
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

  // Pagination functions
  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="p-4 w-full min-h-screen">
      <div className="flex gap-4 mb-4">
        {/* Filter Selection */}
        <select
          className="border p-2 rounded w-1/2"
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
                      Week {week.week_number} ({week.start_date} - {week.end_date})
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

export default CompanyReport;
