'use client';

import React from 'react';

const PrivacyPolicy = () => {
  return (
    <main className="flex flex-col bg-white">
      {/* Hero Section */}
      <section className="h-[50vh] bg-cover opacity-80 bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Media/6.webp')" }}>
        <h1 className="text-4xl opacity-100 md:text-5xl font-bold text-center text-[#070344] drop-shadow-lg">Privacy Policy</h1>
      </section>

      {/* Content Section */}
      <section className="px-4 py-12 md:px-12 lg:px-32 max-w-screen-xl mx-auto text-[#070344]">
        <p className="mb-6 text-base md:text-lg leading-relaxed">
          This Privacy Policy (“Policy”) explains how <strong>Rahane Media Private Limited</strong> (“Rahane Media”, “we”, “our”, “us”) collects, uses, and safeguards your personal information when you visit or interact with our website, <a href="https://www.rahanemedia.com" className="text-blue-600 underline">www.rahanemedia.com</a> (“Website”). By using this Website, you agree to the practices described in this Policy.
        </p>

        {/* Section 1 */}
        <h2 className="text-2xl  font-bold mb-2">1. General</h2>
        <p className="mb-4">
          This Policy is governed by applicable Indian laws, including the Information Technology Act, 2000, and applies to all users of the Website. It describes how Rahane Media collects, uses, and protects your personal data and your rights regarding your information.
        </p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>This Website is operated by Rahane media Private Limited.</li>
          <li>By accessing or using this Website, you consent to our Privacy Policy and Terms of Use.</li>
          <li>We may update this Policy at our discretion, and any changes will be posted on this page.</li>
        </ul>

        {/* Section 2 */}
        <h2 className="text-2xl  font-bold mb-2">2. Information We Collect</h2>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Name, email address, phone number, and location details when you submit forms or contact us.</li>
          <li>Your preferences, inquiries, and feedback related to real estate services.</li>
          <li>Technical data such as IP address, cookies, browser type, and device information for analytics and website functionality.</li>
        </ul>

        {/* Section 3 */}
        <h2 className="text-2xl  font-bold mb-2">3. How We Use Your Information</h2>
        <p className="mb-4">We may use your personal information to:</p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Respond to your property-related inquiries and provide suitable recommendations.</li>
          <li>Enhance our website functionality, customer support, and service offerings.</li>
          <li>Send you updates, newsletters, and promotional information (with opt-out options).</li>
        </ul>

        {/* Section 4 */}
        <h2 className="text-2xl font-bold mb-2">4. Sharing Your Information</h2>
        <p className="mb-4">We do not sell your personal data. We may share your information:</p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>With trusted service partners to assist in property services and communications.</li>
          <li>With regulatory authorities if required by law or legal processes.</li>
          <li>To protect the rights and property of Rahane Media and its users.</li>
        </ul>

        {/* Section 5 */}
        <h2 className="text-2xl  font-bold mb-2">5. Cookies and Tracking</h2>
        <p className="mb-8">
          We use cookies and similar technologies to improve your browsing experience and analyze website traffic. You may modify your browser settings to disable cookies if you wish.
        </p>

        {/* Section 6 */}
        <h2 className="text-2xl  font-bold mb-2">6. Data Security</h2>
        <p className="mb-8">
          We implement reasonable technical and organizational measures to safeguard your data from unauthorized access or misuse. However, no internet transmission is entirely secure.
        </p>

        {/* Section 7 */}
        <h2 className="text-2xl font-bold mb-2">7. Your Rights</h2>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Right to request access to your personal data we hold.</li>
          <li>Right to correct or update your information.</li>
          <li>Right to request deletion of your personal data, subject to legal limitations.</li>
          <li>Right to withdraw consent for marketing communications at any time.</li>
        </ul>

        {/* Section 8 */}
        <h2 className="text-2xl font-bold mb-2">8. Updates to This Policy</h2>
        <p className="mb-8">
          We may revise this Privacy Policy from time to time. The latest version will always be available on this page, and changes take effect upon posting.
        </p>

        {/* Section 9 */}
        <h2 className="text-2xl  font-bold mb-2">9. Contact Us</h2>
        <p className="mb-1">If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us:</p>
        <p><strong>Email:</strong> info@rahanemedia.com</p>
        <p><strong>Phone:</strong> +91 9990800500</p>
      </section>
    </main>
  );
};

export default PrivacyPolicy;

