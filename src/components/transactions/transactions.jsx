import React, { useState, useEffect } from "react";

const Transactions = () => {
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
      <thead>
        <tr>
          <th className="p-2 border bg-blue-500 text-white">ID</th>
          <th className="p-2 border bg-blue-500 text-white">Company Name</th>
          <th className="p-2 border bg-blue-500 text-white">Total Forms</th>
          <th className="p-2 border bg-blue-500 text-white">Total Annex Price</th>
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

export default Transactions;
