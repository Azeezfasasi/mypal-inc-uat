import React, { useState, useEffect } from "react";

const CookiePolicyPageComponent = () => {
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [consentStatus, setConsentStatus] = useState(""); // "", "accepted", "rejected", "custom"
  const [consentChoices, setConsentChoices] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    if (storedConsent) {
      setConsentChoices(JSON.parse(storedConsent));
    }
  }, []);

  const handleConsent = (choice) => {
    if (choice === "accept") {
      const payload = { essential: true, analytics: true, marketing: true, preferences: true };
      localStorage.setItem("cookieConsent", JSON.stringify(payload));
      setConsentStatus("accepted");
      setCustomizeOpen(false);
      return;
    }

    if (choice === "reject") {
      const payload = { essential: true, analytics: false, marketing: false, preferences: false };
      localStorage.setItem("cookieConsent", JSON.stringify(payload));
      setConsentStatus("rejected");
      setCustomizeOpen(false);
      return;
    }

    if (choice === "customize") {
      setCustomizeOpen(true);
      return;
    }

    if (choice === "save-custom") {
      localStorage.setItem("cookieConsent", JSON.stringify(consentChoices));
      setConsentStatus("custom");
      setCustomizeOpen(false);
      return;
    }

    if (choice === "cancel-custom") {
      setCustomizeOpen(false);
      return;
    }
  };

  return (
    <div className="w-[90%] md:w-[60%] bg-white shadow-lg rounded-lg p-4 border border-gray-200 animate-fadeIn mx-auto mb-12">
      <h2 className="text-[22px] md:text-[24px] font-semibold text-gray-800 mb-2">We respect your privacy</h2>

      {/* ✅ Dynamic message area */}
      {consentStatus === "" && (
        <>
            <p className="text-gray-600 mb-6">
                Cookies help us improve your experience, deliver personalized content,
                and analyze traffic. You can choose which cookies to allow by <span className="font-medium text-gray-800">clicking "Customize"</span>. <br />
                This Cookies Policy explains how MyPal ("we," "us," or "our") uses cookies and similar tracking technologies on our website and mobile application (collectively, the "Services"). <br /><br />
                By using our Services, you agree to the use of cookies as described in this policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our Services.
                <br />
                <span className="font-medium text-gray-800">Click Accept All</span> to consent
                or <span className="font-medium text-gray-800">Reject All</span> to
                decline non-essential cookies.
            </p>
        </>
      )}

      {consentStatus === "accepted" && (
        <p className="text-green-700 mb-4">
          ✅ Thank you! You’ve accepted all cookies. Your experience will be personalized accordingly.
        </p>
      )}

      {consentStatus === "rejected" && (
        <p className="text-red-700 mb-4">
          ❌ You’ve rejected non-essential cookies. Only essential cookies will be used.
        </p>
      )}

      {consentStatus === "custom" && (
        <p className="text-blue-700 mb-4">
          ⚙️ Your custom cookie preferences have been saved successfully.
        </p>
      )}

      {/* Buttons */}
      {!customizeOpen && (
        <div className="flex justify-between gap-2">
          <button
            onClick={() => handleConsent("customize")}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
          >
            Customize
          </button>
          <button
            onClick={() => handleConsent("reject")}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm hover:bg-gray-100 cursor-pointer"
          >
            Reject All
          </button>
          <button
            onClick={() => handleConsent("accept")}
            className="px-3 py-1.5 bg-[#DB3806] text-white rounded-md text-sm hover:bg-blue-700 cursor-pointer"
          >
            Accept All
          </button>
        </div>
      )}

      {/* Customize panel */}
      {customizeOpen && (
        <div className="mt-4 pt-0">
          <h4 className="font-semibold mb-2">Customize cookies</h4>
          <p className="text-gray-600 mb-3">
            Click a category to expand details and toggle the checkbox to allow it.
          </p>

          <div className="flex flex-col gap-3">
            {/* Essential Cookies */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Essential Cookies</div>
                  <div className="text-gray-800">Necessary for site operation and security</div>
                </div>
                <input
                  className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                  type="checkbox"
                  checked={consentChoices.essential}
                  onChange={(e) => setConsentChoices((prev) => ({ ...prev, essential: e.target.checked }))}
                />
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                These cookies are necessary for the operation of our Services. They enable you to navigate our site and use its features, such as accessing secure areas. Without these cookies, some services you have asked for cannot be provided.
              </div>
            </details>

            {/* Analytics */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Performance Cookies</div>
                  <div className="text-gray-800">Help us understand site usage and performance.</div>
                </div>
                <input
                  className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                  type="checkbox"
                  checked={consentChoices.analytics}
                  onChange={(e) => setConsentChoices((prev) => ({ ...prev, analytics: e.target.checked }))}
                />
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                These cookies collect information about how you use our Services. They help us understand how visitors interact with our site by providing information about the areas visited, the time spent on the site, and any issues encountered, such as error messages. This helps us improve the performance of our Services.
              </div>
            </details>

            {/* Preferences */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Functionality Cookies</div>
                  <div className="text-gray-800">Remember your choices and preferences.</div>
                </div>
                <input
                  className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                  type="checkbox"
                  checked={consentChoices.preferences}
                  onChange={(e) => setConsentChoices((prev) => ({ ...prev, preferences: e.target.checked }))}
                />
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                These cookies allow our Services to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog. The information these cookies collect is usually anonymized.
              </div>
            </details>

            {/* Targeting / Advertising Cookies */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Targeting / Advertising Cookies</div>
                  <div className="text-gray-800">Used to deliver relevant ads and measure campaigns.</div>
                </div>
                <input
                  className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                  type="checkbox"
                  checked={consentChoices.marketing}
                  onChange={(e) => setConsentChoices((prev) => ({ ...prev, marketing: e.target.checked }))}
                />
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They remember that you have visited a website, and this information is shared with other organizations, such as advertisers.
              </div>
            </details>

            {/* Third-Party Cookies Info */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Third-Party Cookies</div>
                  <div className="text-gray-800">Cookies set by third-party services we use.</div>
                </div>
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                We may use third-party service providers to help us analyze how our Services are used, and to serve advertisements. These third parties may set their own cookies on your device. We do not control the use of these cookies and are not responsible for their privacy practices. We recommend you review the privacy policies of these third-party service providers for more information on their use of cookies.
              </div>
            </details>

            {/* Contact Us */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Contact Us</div>
                  <div className="text-gray-800">How to reach us regarding your privacy.</div>
                </div>
              </summary>
              <div className="px-4 pb-3 text-gray-500">
                If you have any questions or concerns about our use of cookies or this Cookies Policy, please contact us at: <a href="mailto:info@mypal-inc.com" className="text-blue-600">info@mypal-inc.com</a>.
                By using MyPal, you acknowledge that you have read, understood, and agree to our use of cookies as described in this Cookies Policy. Thank you for choosing MyPal!
              </div>
            </details>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => handleConsent("cancel-custom")}
              className="px-3 py-1.5 border rounded-md text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => handleConsent("save-custom")}
              className="px-3 py-1.5 bg-[#DB3806] text-white rounded-md text-sm cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookiePolicyPageComponent;

