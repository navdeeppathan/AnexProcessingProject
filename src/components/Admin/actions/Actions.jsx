import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";

const Actions = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/apilogs?page=${currentPage}`
        );
        const result = await response.json(); // API response

        console.log("API Response:", result); // Debugging

        if (response.ok) {
          setCompanies(
            Array.isArray(result.data?.data) ? result.data?.data : []
          ); // Fix: Correct `data` extraction
          setTotalPages(result.data.last_page || 1); // Fix: Access `last_page` inside `data`
        } else {
          setError("Failed to fetch data.");
          setCompanies([]); // Reset on error
        }
      } catch (err) {
        setError("Network error. Please try again.");
        setCompanies([]); // Reset on network failure
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [currentPage]); // Fetch data when page changes

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
      {/* {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>} */}

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

export default Actions;
