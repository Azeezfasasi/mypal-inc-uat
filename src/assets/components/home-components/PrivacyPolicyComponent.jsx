import React from "react";

const PrivacyPolicyComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 pt-4 pb-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 sm:p-10 overflow-y-auto border border-gray-300">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          MyPal Privacy Policy
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Introduction</h2>
            <p>
              MyPal ("we," "us," or "our") is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              use our mobile application ("App") available on the Apple App Store and Google Play
              Store, and our website (collectively, the "Services"). By using our Services, you
              agree to the terms of this Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">
              Information We Collect
            </h2>
            <p className="mb-2">
              <strong>Personal Information:</strong> We may collect personal information such as
              your name, email address, phone number, and payment details when you register for an
              account, make a booking, or contact us.
            </p>
            <p className="mb-2">
              <strong>Usage Data:</strong> We collect information about your interactions with our
              Services, including the pages you visit, features you use, and actions you take.
            </p>
            <p className="mb-2">
              <strong>Device Information:</strong> We may collect details about your device,
              including its type, operating system, and unique identifiers.
            </p>
            <p>
              <strong>Location Data:</strong> With your permission, we may collect and use your
              location to provide location-based services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>To Provide and Improve Services:</strong> Deliver, maintain, and enhance our
                Services, including processing transactions and providing customer support.
              </li>
              <li>
                <strong>Personalization:</strong> Tailor your experience by offering personalized
                recommendations and offers.
              </li>
              <li>
                <strong>Communications:</strong> Send updates, marketing messages, and other
                information that may interest you.
              </li>
              <li>
                <strong>Analytics:</strong> Understand user interactions to improve our offerings.
              </li>
              <li>
                <strong>Security:</strong> Detect, prevent, and respond to fraud or security issues.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">
              Information Sharing and Disclosure
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>With Service Providers:</strong> We may share data with trusted partners for
                services like payment processing, analytics, and marketing.
              </li>
              <li>
                <strong>Business Transfers:</strong> If MyPal undergoes a merger or acquisition,
                your data may be transferred.
              </li>
              <li>
                <strong>Legal Requirements:</strong> We may disclose information to comply with laws
                or valid government requests.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may share data when you explicitly consent.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your data
              from unauthorized access or misuse. However, please note that no data transmission or
              storage system can be guaranteed to be 100% secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Your Privacy Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Access and Update:</strong> You can access and update your personal data via
                your account settings.
              </li>
              <li>
                <strong>Opt-Out:</strong> You can opt out of marketing communications by following
                unsubscribe links in our emails.
              </li>
              <li>
                <strong>Data Deletion:</strong> You can request deletion of your account and
                personal data by contacting{" "}
                <a
                  href="mailto:info@mypal-inc.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  iinfo@mypal-inc.com
                </a>
                .
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Children's Privacy</h2>
            <p>
              Our Services are not intended for children under 18. We do not knowingly collect
              personal data from them. If we discover such data, we will promptly delete it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">
              Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be posted
              on our website, and the "Effective Date" will be updated. Continued use of our
              Services after changes indicates acceptance of the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
              <a
                href="mailto:info@mypal-inc.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                info@mypal-inc.com
              </a>
            </p>
          </div>

          <p className="pt-4 text-gray-600 text-center">
            By using MyPal, you acknowledge that you have read and understood this Privacy Policy
            and agree to its terms. Thank you for trusting us with your information.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyComponent;
