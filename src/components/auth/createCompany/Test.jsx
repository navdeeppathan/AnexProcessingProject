import React from "react";

const Test = () => {
  const shipmentProgress = (total, emails) => {
    return (emails / total) * 100;
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-2">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Shipment Progress</h2>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full"
              style={{ width: `${shipmentProgress(10, 8)}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">
            {shipmentProgress(7, 3).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Test;
