import React from "react";

export default function AccessibilityStatementComponent({ className = "" }) {
  return (
    <main className={`mx-auto max-w-3xl px-4 py-8 sm:py-12 ${className}`}>
      {/* <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:block focus:rounded focus:bg-blue-600 focus:text-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a> */}

      <section
        id="main-content"
        aria-labelledby="accessibility-heading"
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-300 p-6 sm:p-8"
      >
        <header>
          <h1
            id="accessibility-heading"
            className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight"
          >
            Accessibility Statement
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            At MyPal, we are committed to ensuring that everyone, regardless of ability or
            technology can explore, discover, and enjoy real experiences through our
            platform.
          </p>
        </header>

        <div className="mt-6 space-y-4 text-gray-700 dark:text-gray-200 text-sm sm:text-base">
          <p>
            We continually strive to make our website and mobile applications accessible and
            usable for all users, including those with disabilities. Our goal is to align with
            recognized accessibility standards such as the Web Content Accessibility
            Guidelines (WCAG) 2.1, Level AA, to create an inclusive digital environment.
          </p>

          <p>
            We regularly review our website and mobile features to improve navigation, color
            contrast, text readability, and compatibility with assistive technologies like
            screen readers and keyboard navigation.
          </p>

          <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-4 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Contact</h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
              If you encounter any accessibility barriers while using MyPal or have suggestions
              for improvement, please contact our accessibility team at
            </p>

            <address className="mt-3 not-italic">
              <a
                href="mailto:helpdesk@mypal-inc.com"
                className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:underline"
                aria-label="Email accessibility team"
              >
                helpdesk@mypal-inc.com
              </a>
            </address>

            <p className="mt-3 text-xs text-gray-500">
              We value your feedback and will make every reasonable effort to address your
              concerns promptly.
            </p>
          </div>

          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">Together, we make every experience accessible.</p>
        </div>

        <footer className="mt-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center justify-center rounded-md bg-[#DB3A06] px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-red-700 cursor-pointer"
            aria-label="Back to top"
          >
            Back to top
          </button>
        </footer>
      </section>
    </main>
  );
}
