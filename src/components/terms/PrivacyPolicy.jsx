import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-gray-600 text-center">Effective Date: April 2025</p>

        <p className="mt-4">
          Welcome to **Annex**. We are committed to protecting your privacy and
          ensuring that your personal information is handled in a secure and
          responsible manner.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          1. Information We Collect
        </h2>
        <p className="mt-2">
          When you use our services, we may collect the following types of
          information:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and other contact details.
          </li>
          <li>
            <strong>Account Information:</strong> Username, password, and
            preferences.
          </li>
          <li>
            <strong>Usage Data:</strong> Pages visited, time spent on the app,
            and interactions.
          </li>
          <li>
            <strong>Device Information:</strong> IP address, browser type, and
            device model.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          2. How We Use Your Information
        </h2>
        <p className="mt-2">We use the collected information to:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Provide and improve our services.</li>
          <li>Personalize user experience and recommendations.</li>
          <li>Enhance security and prevent fraudulent activities.</li>
          <li>Send notifications and important updates.</li>
          <li>Comply with legal obligations.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          3. Data Sharing and Disclosure
        </h2>
        <p className="mt-2">
          We do not sell your personal information. However, we may share your
          data with:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>
            **Service providers** who help us operate our app (hosting,
            analytics, etc.).
          </li>
          <li>**Legal authorities** if required by law.</li>
          <li>**Business partners** with your consent for special offers.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">4. Data Security</h2>
        <p className="mt-2">
          We implement advanced security measures to protect your data. However,
          no system is 100% secure, and we encourage users to take precautions.
        </p>

        <h2 className="text-xl font-semibold mt-6">5. Your Rights</h2>
        <p className="mt-2">As a user, you have the right to:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Access, update, or delete your personal information.</li>
          <li>Opt out of marketing communications.</li>
          <li>Request a copy of your data.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">
          6. Cookies and Tracking Technologies
        </h2>
        <p className="mt-2">
          Our application uses cookies and tracking technologies to enhance user
          experience. You can control cookie settings through your browser.
        </p>

        <h2 className="text-xl font-semibold mt-6">
          7. Changes to this Privacy Policy
        </h2>
        <p className="mt-2">
          We may update this policy from time to time. Changes will be posted on
          this page with an updated effective date.
        </p>

        <h2 className="text-xl font-semibold mt-6">8. Contact Us</h2>
        <p className="mt-2">
          If you have any questions, you can contact us at:
        </p>
        <p className="mt-2 font-semibold">📧 support@annex.com</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
