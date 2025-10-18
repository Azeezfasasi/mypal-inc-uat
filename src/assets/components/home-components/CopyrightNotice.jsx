import React from "react";
import FooterSection from "./FooterSection";
import { Helmet } from "react-helmet";
import ServicesHeader from "../services-components/ServicesHeader";

export default function CopyrightNotice({
  year = 2025,
  company = "MyPal",
  email = "helpdesk@mypal-inc.com",
  className = "",
}) {
  return (
    <>
    <Helmet>
        <title>Copyright Notice - {company}</title>
        <meta name="description" content={`Read the copyright notice for using ${company} services.`} />
        <meta name="keywords" content={`${company}, copyright notice, user agreement`} />
        <meta name="author" content={company} />
    </Helmet>
    <ServicesHeader />
    <div
      className={`text-gray-700 py-6 px-4 ${className}`}
      // aria-labelledby="copyright-heading"
    >
      <div className="w-[90%] mx-auto">
        <h2 id="copyright-heading" className="text-2xl font-bold mb-4">
          Copyright Notice
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold">
              © {year} {company}. All Rights Reserved.
            </p>

            <p className="mt-3 leading-relaxed text-justify">
              {company} and the {company} logo are trademarks or registered
              trademarks of {company} Hospitality Innovation Services. All
              content on this website, including but not limited to text,
              graphics, images, videos, user-generated content, design
              elements, and software, is the property of {company} or its
              content partners and is protected by international copyright,
              trademark, and intellectual property laws.
            </p>

            <p className="mt-3 leading-relaxed text-justify">
              Unauthorized reproduction, distribution, modification, or
              transmission of any part of this site or its content, in any form
              or by any means, including electronic or mechanical, without
              prior written permission from {company} Hospitality Innovation
              Services, is strictly prohibited.
            </p>

            {/* <div className=""> */}
                <p className="mt-3 leading-relaxed">For permissions or
                partnership inquiries, please contact:</p>
                <p className="mt-2 text-sm">
                    <a
                        href={`mailto:${email}`}
                        className="underline text-red-500 hover:text-red-700 dark:hover:text-white"
                    >
                        {email}
                    </a>
                </p>
            {/* </div> */}
          </div>
        </div>

        <hr className="border-t border-gray-200 dark:border-gray-800 my-4" />

        <p className="text-gray-500 dark:text-gray-500">
          This notice is provided for informational purposes only and does not
          constitute legal advice. For formal permission requests please email
          the address above.
        </p>
      </div>
    </div>
    <FooterSection />
    </>
  );
}
