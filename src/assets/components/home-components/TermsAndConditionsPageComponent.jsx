import React from "react";

const TermsAndConditionsPageComponent = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 pt-0 pb-10">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg p-6 sm:p-10 overflow-y-auto border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          MyPal-Inc Website Terms & Conditions
        </h1>

        <section className="space-y-6 text-gray-700 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Introduction</h2>
            <p>
              Welcome to MyPal! These Terms and Conditions ("Terms") govern your use of our website,
              mobile application, and services (collectively, the "Services"). By accessing or using
              our Services, you agree to be bound by these Terms. If you do not agree with any part
              of these Terms, you must not use our Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Acceptance of Terms</h2>
            <p>
              By accessing and using our Services, you agree to comply with and be bound by these
              Terms and all applicable laws and regulations. If you do not agree to these Terms, you
              are prohibited from using or accessing our Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Any changes will be effective
              immediately upon posting on our website. Your continued use of our Services after any
              changes constitutes your acceptance of the revised Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Use of Services</h2>
            <p>
              <strong>Eligibility:</strong> You must be at least 18 years old to use our Services.
              <br />
              <strong>Account Registration:</strong> You agree to provide accurate, current, and
              complete information during registration and to keep it updated.
              <br />
              <strong>Account Security:</strong> You are responsible for maintaining the
              confidentiality of your account credentials and all activities under your account.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">User Conduct</h2>
            <p>
              You agree not to use our Services for any unlawful or prohibited purpose. You agree
              not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations.</li>
              <li>Infringe upon our intellectual property or that of others.</li>
              <li>
                Engage in any conduct that could harm or disrupt our Services or related servers.
              </li>
              <li>Impersonate any person or entity.</li>
              <li>
                Use automated systems (bots, scrapers, etc.) without written permission.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Content</h2>
            <p>
              <strong>Your Content:</strong> You retain ownership of any content you submit and
              grant us a non-exclusive, worldwide, royalty-free license to use it.
              <br />
              <strong>Our Content:</strong> All materials provided through our Services are the
              property of MyPal and protected by copyright and trademark laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Privacy</h2>
            <p>
              Your use of our Services is also governed by our Privacy Policy, which explains how we
              collect, use, and protect your personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Third-Party Links</h2>
            <p>
              Our Services may contain links to third-party websites or services. We are not
              responsible for their content or privacy practices and disclaim any liability arising
              from your use of them.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Disclaimers</h2>
            <p>
              <strong>No Warranty:</strong> Our Services are provided “as-is” without warranties.
              <br />
              <strong>Limitation of Liability:</strong> To the fullest extent permitted by law,
              MyPal shall not be liable for any indirect, incidental, or consequential damages
              arising from your use of our Services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless MyPal and its affiliates from any claims or
              damages resulting from your use of the Services or violation of these Terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to our Services without
              notice if you violate these Terms. Upon termination, your right to use our Services
              will cease immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Nigeria.
              Any disputes will be resolved exclusively in Nigerian courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Severability</h2>
            <p>
              If any provision of these Terms is found invalid, the remaining provisions will remain
              in full effect.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Entire Agreement</h2>
            <p>
              These Terms constitute the entire agreement between you and MyPal regarding the use of
              our Services and supersede any prior agreements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-[#DB3A06] mb-2">Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms, please contact us at:{" "}
              <a
                href="mailto:info@mypal-inc.com"
                className="text-blue-600 underline hover:text-blue-800"
              >
                info@mypal-inc.com
              </a>
            </p>
          </div>

          <p className="pt-4 text-gray-600 text-center">
            By using MyPal, you acknowledge that you have read, understood, and agree to be bound by
            these Terms and Conditions. Thank you for choosing MyPal!
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditionsPageComponent;
