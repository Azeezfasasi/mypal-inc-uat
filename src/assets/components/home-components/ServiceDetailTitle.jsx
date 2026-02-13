import React from 'react';

// Accept business as a prop
export default function ServiceDetailTitle({ business }) {
    // Fallbacks for missing data
    const title = business?.business_name || 'Business Title';
    const description = business?.description || 'No description available.';

    return (
        <div className="bg-white pt-3 md:pt-12 md:mb-6 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-start justify-center md:justify-between gap-3 md:gap-24">
                    {/* Business Title */}
                    <div className="md:w-1/2 flex justify-start md:justify-start">
                        <div className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#4D1402] font-['DrukCyr-Medium',_sans-serif] tracking-tight text-left md:text-left">
                            {title}
                        </div>
                    </div>

                    {/* Business Description */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <p className="text-base sm:text-2xl font-medium text-gray-700 text-left md:text-left max-w-lg">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
