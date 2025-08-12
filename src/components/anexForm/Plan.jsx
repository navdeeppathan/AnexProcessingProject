import React, { useEffect, useState } from "react";

const Plan = () => {
  const [userPlan, setUserPlan] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [totalForms, setTotalForm] = useState(0);
  const [totalEmails, setTotalEmail] = useState(0);
  const [doneSignatures, setSignature] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user_id;
  const companyId = user?.company_id;

  const plans = [
    { name: "Base", key: "base", price: 80, forms: 10 },
    { name: "Pro", key: "pro", price: 120, forms: 20 },
    { name: "Enterprise", key: "enterprise", price: 260, forms: 50 },
  ];

  // Fetch plan
  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(
          `https://annex.sofinish.co.uk/api/getplans?user_id=${userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (data.success && data.user?.plan) {
          setUserPlan(data.user.plan);
        }
      } catch (error) {
        console.error("Error fetching plan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [userId]);

  // Fetch form data
  const fetchFormData = async () => {
    try {
      const url = `https://annex.sofinish.co.uk/api/companyforms?id=${companyId}&action=companydashboard&company_id=${companyId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSignature(data.total_done_signatures || 0);
      setTotalEmail(data.total_emails || 0);
      setTotalForm(data.total_forms || 0);
    } catch (err) {
      console.error("Error fetching forms:", err);
    }
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  // Find allowed forms based on the current plan
  const currentPlanDetails = plans.find((plan) => plan.key === userPlan);
  const allowedForms = currentPlanDetails ? currentPlanDetails.forms : 0;

  // Calculate remaining forms
  const remainingForms = allowedForms - totalForms;

  const handleUpgrade = async (planKey) => {
    const selectedPlan = plans.find((plan) => plan.key === planKey);

    if (!selectedPlan) {
      setMessage("Invalid plan selected.");
      return;
    }

    try {
      setMessage("Redirecting to checkout...");

      const checkoutRes = await fetch(
        "https://annex.sofinish.co.uk/api/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan: selectedPlan.key,
            billing: "monthly",
            amount: selectedPlan.price,
            company_id: companyId,
          }),
        }
      );

      const { url } = await checkoutRes.json();

      if (url) {
        window.location.href = url;
      } else {
        setMessage("Failed to initiate payment.");
      }
    } catch (err) {
      console.error("Upgrade error:", err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Available Plans</h2>

      <div className="stats-cards grid grid-cols-4 gap-4 mb-4">
        <div className="card purple">
          Total Number of Annex Forms <h2>{totalForms}</h2>
        </div>
        <div className="card blue">
          Remaining Annex{" "}
          <h2>{remainingForms >= 0 ? remainingForms : 0}</h2>
        </div>
      </div>

      {message && (
        <div className="mb-4 text-red-600 font-medium">{message}</div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`border rounded-lg p-5 shadow-md transition duration-300 ${
                userPlan === plan.key
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-lg font-medium mb-2">£{plan.price}</p>
              <p className="text-md text-gray-600 mb-4">
                {plan.forms} forms included
              </p>

              {userPlan === plan.key ? (
                <span className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded">
                  Your Current Plan
                </span>
              ) : (
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleUpgrade(plan.key)}
                >
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plan;
