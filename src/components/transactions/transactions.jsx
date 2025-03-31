import React, { useState, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';


const tableHeadStyle = {
    textAlign: 'center',
    backgroundColor: '#4caf50',
    color: 'white',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '10px',
    borderRadius: '5px',
  };
const Report = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const response = await fetch("https://annex.sofinish.co.uk/api/transaction");
        if (!response.ok) throw new Error("Failed to fetch data");
        
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4 w-full min-h-screen">
      <h2 className="text-xl font-bold mb-4">Company Transactions Report</h2>
      <table className="w-full">
        <thead className="hed bg-blue-200">
          <tr className="border bg-blue-200">
            <th className="p-2 border"> ID</th>
            {/* <th className="p-2 border">User ID</th> */}
            <th className="p-2 border">Company Name</th>
            <th className="p-2 border">Total Forms</th>
            <th className="p-2 border">Total Annex Price</th>
          </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={item.user_id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td> 
                <td className="border border-gray-300 p-2">{item.company_name || "N/A"}</td>
                <td className="border border-gray-300 p-2">{item.total_forms}</td>
                <td className="border border-gray-300 p-2">${item.total_annex_price ?? 0}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
