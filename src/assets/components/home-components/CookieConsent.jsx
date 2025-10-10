import React, { useState, useEffect } from "react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [consentChoices, setConsentChoices] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleConsent = (choice) => {
    // if choice === 'accept' or 'reject' we store shorthand
    if (choice === 'accept') {
      const payload = { essential: true, analytics: true, marketing: true, preferences: true };
      localStorage.setItem('cookieConsent', JSON.stringify(payload));
      setVisible(false);
      return;
    }

    if (choice === 'reject') {
      const payload = { essential: true, analytics: false, marketing: false, preferences: false };
      localStorage.setItem('cookieConsent', JSON.stringify(payload));
      setVisible(false);
      return;
    }

    if (choice === 'customize') {
      // open the customize panel (don't close the banner)
      setCustomizeOpen(true);
      return;
    }

    // for save from customize panel
    if (choice === 'save-custom') {
      localStorage.setItem('cookieConsent', JSON.stringify(consentChoices));
      setCustomizeOpen(false);
      setVisible(false);
      return;
    }

    if (choice === 'cancel-custom') {
      setCustomizeOpen(false);
      return;
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 md:bottom-5 left-0 md:left-5 smax-w-sm w-[90%] md:w-[30%] bg-white shadow-lg rounded-lg p-4 border border-gray-200 animate-fadeIn z-[99999]">
      {!customizeOpen && (
        <>
          <h3 className="font-semibold text-gray-800 mb-2">
            We respect your privacy
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Cookies help us improve your experience, deliver personalized content,
            and analyze traffic. You can choose which cookies to allow by <span className="font-medium text-gray-800">clicking "Customize"</span>. <br />
            This Cookies Policy explains how MyPal ("we," "us," or "our") uses cookies and similar tracking technologies on our website and mobile application (collectively, the "Services"). By using our Services, you agree to the use of cookies as described in this policy. If you do not agree to our use of cookies, you should adjust your browser settings accordingly or refrain from using our Services.
            <br />

            {/* <span className="font-medium text-gray-800">Customize</span>. Click{" "} */}
            <span className="font-medium text-gray-800">Click Accept All</span> to consent
            or <span className="font-medium text-gray-800">Reject All</span> to
            decline non-essential cookies.
          </p>

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

          {/* <p className="text-[11px] text-gray-400 mt-3 text-right">
            Powered by <span className="font-medium text-gray-600">CookieAdmin</span>
          </p> */}
        </>
      )}
      {/* Customize panel */}
      {customizeOpen && (
        <div className="mt-4 pt-0 h-[500px] overflow-y-auto">
          <h4 className="font-semibold mb-2">Customize cookies</h4>
          <p className="text-sm text-gray-600 mb-3">Click a category to expand details and toggle the checkbox to allow it.</p>

          {/* Accordion list of categories with descriptions */}
          <div className="flex flex-col gap-3">
            {/* Essential Cookies */}
            <div className="border border-gray-300 rounded-md">
              <button
                type="button"
                aria-expanded={true}
                className="w-full text-left px-4 py-3 flex items-center justify-between"
                onClick={() => { /* keep expanded by default */ }}
              >
                <div>
                  <div className="font-medium text-[#DB3806]">Essential Cookies</div>
                  <div className="text-sm text-gray-600">Necessary for site operation and security.</div>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={consentChoices.essential}
                    onChange={() => setConsentChoices(prev => ({ ...prev, essential: !prev.essential }))}
                    aria-label="Allow essential cookies"
                  />
                </div>
              </button>

              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">These cookies are necessary for the operation of our Services. They enable you to navigate our site and use its features, such as accessing secure areas. Without these cookies, some services you have asked for cannot be provided.</p>
              </div>
            </div>

            {/* Performance Cookies */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Performance Cookies</div>
                  <div className="text-sm text-gray-600">Help us understand site usage and performance.</div>
                </div>
                <input
                  type="checkbox"
                  checked={consentChoices.analytics}
                  onChange={(e) => setConsentChoices(prev => ({ ...prev, analytics: e.target.checked }))}
                  aria-label="Allow performance cookies"
                />
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">These cookies collect information about how you use our Services. They help us understand how visitors interact with our site by providing information about the areas visited, the time spent on the site, and any issues encountered, such as error messages. This helps us improve the performance of our Services.</p>
              </div>
            </details>

            {/* Functionality Cookies */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Functionality Cookies</div>
                  <div className="text-sm text-gray-600">Remember your choices and preferences.</div>
                </div>
                <input
                  type="checkbox"
                  checked={consentChoices.preferences}
                  onChange={(e) => setConsentChoices(prev => ({ ...prev, preferences: e.target.checked }))}
                  aria-label="Allow functionality cookies"
                />
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">These cookies allow our Services to remember choices you make (such as your username, language, or the region you are in) and provide enhanced, more personalized features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog. The information these cookies collect is usually anonymized.</p>
              </div>
            </details>

            {/* Targeting/Advertising Cookies */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Targeting / Advertising Cookies</div>
                  <div className="text-sm text-gray-600">Used to deliver relevant ads and measure campaigns.</div>
                </div>
                <input
                  type="checkbox"
                  checked={consentChoices.marketing}
                  onChange={(e) => setConsentChoices(prev => ({ ...prev, marketing: e.target.checked }))}
                  aria-label="Allow targeting and advertising cookies"
                />
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns. They remember that you have visited a website, and this information is shared with other organizations, such as advertisers.</p>
              </div>
            </details>

            {/* Third-Party Cookies Info */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Third-Party Cookies</div>
                  <div className="text-sm text-gray-600">Cookies set by third-party services we use.</div>
                </div>
                <div className="w-6" />
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">We may use third-party service providers to help us analyze how our Services are used, and to serve advertisements. These third parties may set their own cookies on your device. We do not control the use of these cookies and are not responsible for their privacy practices. We recommend you review the privacy policies of these third-party service providers for more information on their use of cookies.</p>
              </div>
            </details>

            {/* Contact Us Info */}
            <details className="border border-gray-300 rounded-md">
              <summary className="px-4 py-3 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="font-medium text-[#DB3806]">Contact Us</div>
                  <div className="text-sm text-gray-600">How to reach us regarding your privacy.</div>
                </div>
                <div className="w-6" />
              </summary>
              <div className="px-4 pb-3 text-sm text-gray-700">
                <p className="mb-2">If you have any questions or concerns about our use of cookies or this Cookies Policy, please contact us at: <a href="mailto:info@mi-pal.com" className="text-blue-600">info@mi-pal.com</a>.</p>
                <br />
                <p>By using Mypal, you acknowledge that you have read, understood, and agree to our use of cookies as described in this Cookies Policy. Thank you for choosing Mypal!</p>
              </div>
            </details>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => handleConsent('cancel-custom')} className="px-3 py-1.5 border rounded-md text-sm cursor-pointer">Cancel</button>
            <button onClick={() => handleConsent('save-custom')} className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm cursor-pointer">Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieConsent;
