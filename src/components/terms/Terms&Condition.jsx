import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 text-center">Effective Date: April 2025</p>

        <p className="mt-4">
          Welcome to **Annex**! By accessing or using our application, you agree
          to comply with and be bound by the following terms and conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6">1. Acceptance of Terms</h2>
        <p className="mt-2">
          By using Annex, you acknowledge that you have read, understood, and
          agree to be bound by these Terms and Conditions.
        </p>

        <h2 className="text-xl font-semibold mt-6">2. Use of Our Services</h2>
        <p className="mt-2">
          Our services are provided for personal and non-commercial use only.
          You agree not to misuse or exploit any part of the Annex platform.
        </p>

        <h2 className="text-xl font-semibold mt-6">3. User Accounts</h2>
        <ul className="list-disc list-inside mt-2">
          <li>
            You must provide accurate and complete information when creating an
            account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            login credentials.
          </li>
          <li>
            We reserve the right to suspend or terminate accounts that violate
            our policies.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">4. Prohibited Activities</h2>
        <p className="mt-2">
          You agree not to engage in the following prohibited activities:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>Attempting to access unauthorized areas of the application.</li>
          <li>
            Uploading malicious software or attempting to harm our system.
          </li>
          <li>Using the platform for illegal or fraudulent purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">5. Intellectual Property</h2>
        <p className="mt-2">
          All content on the Annex platform, including logos, text, graphics,
          and software, is owned by Annex and is protected under copyright laws.
          Unauthorized use of any materials is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          6. Limitation of Liability
        </h2>
        <p className="mt-2">
          Annex shall not be liable for any direct, indirect, incidental, or
          consequential damages resulting from the use of our services.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          7. Changes to These Terms
        </h2>
        <p className="mt-2">
          We reserve the right to update these terms at any time. Changes will
          be posted on this page with an updated effective date.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact Information</h2>
        <p className="mt-2">
          If you have any questions or concerns, contact us at:
        </p>
        <p className="mt-2 font-semibold">📧 support@annex.com</p>
        {/* <p className="mt-2 font-semibold">
          📍 123 Annex Street, Tech City, USA
        </p> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
