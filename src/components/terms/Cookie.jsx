import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Cookie Policy</h1>

      <p className="mb-4">
        <strong>Last Updated:</strong> [Date]
      </p>

      <p className="mb-4">
        Annex ("we," "our," "us") uses cookies and similar technologies to improve user
        experience, analyze website performance, and personalize content. This policy
        explains how we use cookies and how you can manage your preferences.
      </p>

      <h2 className="text-xl font-semibold mt-6">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website.
        They help websites recognize your device and remember information about your visit.
      </p>

      <h2 className="text-xl font-semibold mt-6">2. How We Use Cookies</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Essential Cookies:</strong> Necessary for website functionality (e.g., login, security).
        </li>
        <li>
          <strong>Performance Cookies:</strong> Help us analyze website traffic and improve performance.
        </li>
        <li>
          <strong>Functional Cookies:</strong> Remember user preferences (e.g., language selection).
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Deliver personalized advertisements based on browsing history.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">3. Managing Cookies</h2>
      <p className="mb-4">
        You can control or delete cookies through your browser settings. Most browsers allow you to:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>Block or delete cookies</li>
        <li>Receive alerts when cookies are used</li>
        <li>Disable specific cookie types</li>
      </ul>
      <p className="mb-4">
        For instructions, visit{" "}
        <a
          href="https://www.annex.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          www.annex.com
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6">4. Third-Party Cookies</h2>
      <p className="mb-4">
        We may use third-party services (e.g., Google Analytics, social media integrations) that set their own cookies.
        These providers have their own privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-6">5. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date.
      </p>

      <h2 className="text-xl font-semibold mt-6">6. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about our Cookie Policy, please contact us at:
      </p>
      <p>
        📧 <strong>Email:</strong> <a href="mailto:support@annex.com" className="text-blue-500 underline">support@annex.com</a>
      </p>
      {/* <p>📍 <strong>Address:</strong> [Your Company Address]</p> */}
    </div>
  );
};

export default CookiePolicy;
