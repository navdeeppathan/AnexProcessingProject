import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainDashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Annex ID search
  const [totalForms, setTotalForm] = useState(0);
  const [totalEmails, setTotalEmail] = useState(0);
  const [doneSignatures, setSignature] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const companyId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.company_id || null;
  };

  const loginId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.login_id || null;
  };

  const fetchFormData = async () => {
    // setLoading(true);
    setError("");

    try {
      const url = `https://annex.sofinish.co.uk/api/companyforms?id=${companyId()}&action=companydashboard&company_id=${companyId()}&login_id=${loginId()}&from=${fromDate}&to=${toDate}&search=${searchQuery}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setFormData(data.applications);
      setSignature(data.total_done_signatures);
      setTotalEmail(data.total_emails);
      setTotalForm(data.total_forms);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, [fromDate, toDate, searchQuery]);

  // Pagination logic
  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return formData.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <CircularProgress />
        <p className="text-black font-medium text-xl">Loading...</p>
      </div>
    );
  }

  if (error) return <p className="text-red-500 text-center mt-5">Error: {error}</p>;

  return (
    <div className="px-5 min-h-screen">
      <main className="flex-1 p-5 bg-[#f4f4f9]">
        <header className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            className="create-btn"
            onClick={() => navigate("/dashboard/annex-form")}
          >
            Create ANNEX Form
          </button>
        </header>

        {/* Statistics */}
        <div className="stats-cards grid grid-cols-4 gap-4 mb-4">
          <div className="card purple">Total Number of Annex Forms <h2>{totalForms}</h2></div>
          <div className="card light-blue">Total Requests <h2>{totalEmails}</h2></div>
          <div className="card blue">Pending Signatures <h2>{totalEmails - doneSignatures}</h2></div>
          <div className="card orange">Done Signatures <h2>{doneSignatures}</h2></div>
        </div>

        {/* Filters Section */}
        <div className="flex justify-between items-center mb-4">
          <TextField type="date" label="From Date" InputLabelProps={{ shrink: true }} value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-100" />
          <TextField type="date" label="To Date" InputLabelProps={{ shrink: true }} value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-100" />
          <TextField type="text" label="Search by Annex Number" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-100" />
        </div>

        {/* Data Table */}
        <table className="data-table">
          <thead>
            <tr>
              <th>Annex</th>
              <th>Reference Name</th>
              <th colSpan="3">Request - Pending - Signed</th>
              <th>Status</th>
              <th>Created Date</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getPaginatedData().length > 0 ? (
              getPaginatedData()
                .filter((company) => company?.email_count - company?.signature_count !== 0)
                .map((company) => (
                  <tr key={company?.id}>
                    <td>{company?.annex_id}</td>
                    <td>{company?.ref_name}</td>
                    <td colSpan="3">
                      <span className="total">{company?.email_count}</span> - 
                      <span className="pending">{company?.email_count - company?.signature_count}</span> - 
                      <span className="complete">{company?.signature_count}</span>
                    </td>
                    <td><span className="status active">Active</span></td>
                    <td>
                      <span className="complete">
                        {new Date(company?.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </span>
                    </td>
                    <td colSpan="2" className="flex gap-2">
                      <Button variant="contained" sx={{ bgcolor: "#6b46c1" }} onClick={() => navigate(`/dashboard/anexV/${company?.id}`)}>View</Button>
                      <Button variant="contained" sx={{ bgcolor: "#6b46c1" }}>Download</Button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr><td colSpan="8" className="text-center">No data available</td></tr>
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between mt-4">
          <Button onClick={prevPage} disabled={currentPage === 1} variant="contained">Previous</Button>
          <span className="text-lg font-semibold">Page {currentPage}</span>
          <Button onClick={nextPage} disabled={currentPage * itemsPerPage >= formData.length} variant="contained">Next</Button>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
