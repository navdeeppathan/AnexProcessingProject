import React, { useState, useEffect } from "react";

const SearchForm = () => {
  const [form, setForm] = useState({
    company_name: "",
    address: "",
    email: "",
  });
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const companyId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.company_id || null;
  };

  const loginId = () => {
    const user = localStorage.getItem("user");
    return JSON.parse(user)?.login_id || null;
  };

  useEffect(() => {
    const fetchFormData = async () => {
      setLoading(true);
      setError("");

      try {
        const url = `https://annex.sofinish.co.uk/api/companyforms?id=${companyId()}&action=companydashboard&company_id=${companyId()}&login_id=${loginId()}`;

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
        console.log(data.applications);
        setFormData(data.applications || []); // Ensure it's an array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFormData();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, company_name: value }));

    const found = formData.find(
      (item) => item.company_name?.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      setForm({
        company_name: found.company_name,
        address: found.address || "",
        email: found.email || "",
      });
    } else {
      setForm((prev) => ({ ...prev, address: "", email: "" })); // Allow manual input
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submited:-", form);
    // try {
    //   // const response = await fetch(
    //   //   "https://annex.sofinish.co.uk/api/submit-form",
    //   //   {
    //   //     method: "POST",
    //   //     headers: {
    //   //       "Content-Type": "application/json",
    //   //     },
    //   //     body: JSON.stringify(form),
    //   //   }
    //   // );

    //   // if (!response.ok) {
    //   //   throw new Error(`HTTP error! Status: ${response.status}`);
    //   // }

    //   alert("Form submitted successfully!");
    //   setForm({ company_name: "", address: "", email: "" }); // Clear form after submission
    // } catch (err) {
    //   alert(`Error submitting form: ${err.message}`);
    // }
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          value={form.company_name}
          onChange={handleSearch}
          placeholder="Search or enter company name"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Enter address"
          className="border p-2 mb-2 w-full"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter email"
          className="border p-2 mb-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
