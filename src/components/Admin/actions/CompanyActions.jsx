import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";

const CompanyActions = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchUser, setSearchUser] = useState("");

  const companyId = () => {
    const user = localStorage.getItem("user");
    const user_id = JSON.parse(user)?.company_id;
    return user_id || null;
  };

  const fetchCompanies = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        'https://annex.sofinish.co.uk/api/companylogs/${companyId()}?page=${currentPage}&from=${fromDate}&to=${toDate}&search=${searchUser}'
      );
      const result = await response.json();

      if (response.ok) {
        setCompanies(result.data?.data || []);
        setTotalPages(result.data.last_page || 1);
      } else {
        setError("Failed to fetch data.");
        setCompanies([]);
      }
    } catch (err) {
      setError("Network error. Please try again.");
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when page, fromDate, toDate, or searchUser changes
  useEffect(() => {
    fetchCompanies();
  }, [currentPage, fromDate, toDate, searchUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress />
        <p className="text-black font-medium text-xl mt-4">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-5">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen p-10">
      {/* Filters */}
      <div className="mb-4 flex justify-end space-x-4">
        <TextField
          type="date"
          label="From Date"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-60"
        />
        <TextField
          type="date"
          label="To Date"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-60"
        />
        <TextField
          type="text"
          label="Search by User Name"
          variant="outlined"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="w-60"
        />
      </div>

      {/* Data Table */}
      <table className="shadow-lg w-full">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>User Name</th>
            <th>Api Name</th>
            <th>Annex Id</th>
            <th>IP</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {companies.length > 0 ? (
            companies.map((company, index) => (
              <tr key={index}>
                <td>{company.company_name || "N/A"}</td>
                <td>{company.user_name || "N/A"}</td>
                <td>{company.api_name || "N/A"}</td>
                <td>{company.annex_id || "N/A"}</td>
                <td>{company.ip || "N/A"}</td>
                <td>{company.created_at || "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4 space-x-4">
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="contained"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CompanyActions;