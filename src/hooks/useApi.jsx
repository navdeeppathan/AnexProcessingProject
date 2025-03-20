import { useState } from "react";

const API_BASE_URL = "https://annex.sofinish.co.uk/api"; // Change this to your API URL

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (endpoint, method = "POST", data = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : null,
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok)
        throw new Error(result.message || "Something went wrong!");

      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { sendRequest, loading, error };
};

export default useApi;
