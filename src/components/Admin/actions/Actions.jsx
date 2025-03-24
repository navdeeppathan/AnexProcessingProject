// import React, { useEffect, useState } from "react";
// import { Button, CircularProgress } from "@mui/material";
// import { useParams } from "react-router-dom";

// const Actions = () => {
//   const [companies, setCompanies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(
//           `https://annex.sofinish.co.uk/api/companylogs/${id}?page=${currentPage}`
//         );
//         const result = await response.json(); // API response

//         console.log("API Response:", result); // Debugging

//         if (response.ok) {
//           setCompanies(
//             Array.isArray(result.data?.data) ? result.data?.data : []
//           ); // Fix: Correct `data` extraction
//           setTotalPages(result.data.last_page || 1); // Fix: Access `last_page` inside `data`
//         } else {
//           setError("Failed to fetch data.");
//           setCompanies([]); // Reset on error
//         }
//       } catch (err) {
//         setError("Network error. Please try again.");
//         setCompanies([]); // Reset on network failure
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, [currentPage]); // Fetch data when page changes

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <CircularProgress />
//         <p className="text-black font-medium text-xl mt-4">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-red-500 text-center mt-5">Error: {error}</p>;
//   }

//   return (
//     <div className="min-h-screen p-10">
//       {/* {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>} */}

//       <table className="shadow-lg w-full">
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>User Name</th>
//             <th>Api Name</th>
//             <th>Annex Id</th>
//             <th>IP</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.length > 0 ? (
//             companies.map((company, index) => (
//               <tr key={index}>
//                 <td>{company.company_name || "N/A"}</td>
//                 <td>{company.user_name || "N/A"}</td>
//                 <td>{company.api_name || "N/A"}</td>
//                 <td>{company.annex_id || "N/A"}</td>
//                 <td>{company.ip || "N/A"}</td>
//                 <td>{company.created_at || "N/A"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4 space-x-4">
//         <Button
//           variant="contained"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span className="font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           variant="contained"
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage >= totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Actions;

import React, { useEffect, useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useParams } from "react-router-dom";

const Actions = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]); // For filtered data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterDate, setFilterDate] = useState(""); // State for filtering

  const { id } = useParams();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/companylogs/${id}?page=${currentPage}`
        );
        const result = await response.json(); // API response

        console.log("API Response:", result); // Debugging

        if (response.ok) {
          const data = Array.isArray(result.data?.data)
            ? result.data?.data
            : [];
          setCompanies(data);
          setFilteredCompanies(data); // Set initial filtered data
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

    fetchCompanies();
  }, [currentPage, id]); // Fetch data when page or id changes

  // Handle date filtering
  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterDate(selectedDate);

    if (!selectedDate) {
      setFilteredCompanies(companies);
      return;
    }

    const filteredData = companies.filter(
      (company) => company.created_at.startsWith(selectedDate) // Compare with YYYY-MM-DD format
    );
    setFilteredCompanies(filteredData);
  };

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
      {/* Date Filter */}
      <div className="flex flex-col  space-x-5 mb-4">
        <label className="text-black font-medium">Filter by Date</label>
        <div className="flex">
          <TextField
            type="date"
            // label="Filter by Date"
            InputLabelProps={{ shrink: true }}
            value={filterDate}
            onChange={handleFilterChange}
          />
          &nbsp;
          <Button variant="outlined" onClick={() => setFilterDate("")}>
            Clear
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <table className="shadow-lg w-full cursor-pointer">
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
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
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

// import React, { useEffect, useState } from "react";
// import { Button, CircularProgress, TextField } from "@mui/material";
// import { useParams } from "react-router-dom";

// const Actions = () => {
//   const [companies, setCompanies] = useState([]);
//   const [filteredCompanies, setFilteredCompanies] = useState([]); // For filtered data
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [filterDate, setFilterDate] = useState(""); // Date filter
//   const [searchQuery, setSearchQuery] = useState(""); // Search by user_name

//   const { id } = useParams();

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const response = await fetch(
//           `https://annex.sofinish.co.uk/api/companylogs/${id}?page=${currentPage}`
//         );
//         const result = await response.json(); // API response

//         console.log("API Response:", result); // Debugging

//         if (response.ok) {
//           const data = Array.isArray(result.data?.data)
//             ? result.data?.data
//             : [];
//           setCompanies(data);
//           setFilteredCompanies(data); // Set initial filtered data
//           setTotalPages(result.data.last_page || 1);
//         } else {
//           setError("Failed to fetch data.");
//           setCompanies([]);
//         }
//       } catch (err) {
//         setError("Network error. Please try again.");
//         setCompanies([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanies();
//   }, [currentPage, id]); // Fetch data when page or id changes

//   // Handle date filtering
//   const handleFilterChange = (e) => {
//     const selectedDate = e.target.value;
//     setFilterDate(selectedDate);
//     applyFilters(selectedDate, searchQuery);
//   };

//   // Handle search filtering
//   const handleSearchChange = (e) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     applyFilters(filterDate, query);
//   };

//   // Apply filters to the data
//   const applyFilters = (date, query) => {
//     let filteredData = companies;

//     if (date) {
//       filteredData = filteredData.filter((company) =>
//         company.created_at.startsWith(date)
//       );
//     }

//     if (query) {
//       filteredData = filteredData.filter((company) =>
//         company.user_name?.toLowerCase().includes(query.toLowerCase())
//       );
//     }

//     setFilteredCompanies(filteredData);
//   };

//   // Clear filters
//   const clearFilters = () => {
//     setFilterDate("");
//     setSearchQuery("");
//     setFilteredCompanies(companies);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen">
//         <CircularProgress />
//         <p className="text-black font-medium text-xl mt-4">Loading...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <p className="text-red-500 text-center mt-5">Error: {error}</p>;
//   }

//   return (
//     <div className="min-h-screen p-10">
//       {/* Filters */}
//       <div className="flex items-center space-x-4 mb-4">
//         <TextField
//           type="date"
//           label="Filter by Date"
//           InputLabelProps={{ shrink: true }}
//           value={filterDate}
//           onChange={handleFilterChange}
//         />
//         <TextField
//           type="text"
//           label="Search by User Name"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <Button variant="outlined" onClick={clearFilters}>
//           Clear
//         </Button>
//       </div>

//       {/* Data Table */}
//       <table className="shadow-lg w-full">
//         <thead>
//           <tr>
//             <th>Company Name</th>
//             <th>User Name</th>
//             <th>Api Name</th>
//             <th>Annex Id</th>
//             <th>IP</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredCompanies.length > 0 ? (
//             filteredCompanies.map((company, index) => (
//               <tr key={index}>
//                 <td>{company.company_name || "N/A"}</td>
//                 <td>{company.user_name || "N/A"}</td>
//                 <td>{company.api_name || "N/A"}</td>
//                 <td>{company.annex_id || "N/A"}</td>
//                 <td>{company.ip || "N/A"}</td>
//                 <td>{company.created_at || "N/A"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6" className="text-center">
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <div className="flex justify-between mt-4 space-x-4">
//         <Button
//           variant="contained"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>
//         <span className="font-semibold">
//           Page {currentPage} of {totalPages}
//         </span>
//         <Button
//           variant="contained"
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//           }
//           disabled={currentPage >= totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Actions;
