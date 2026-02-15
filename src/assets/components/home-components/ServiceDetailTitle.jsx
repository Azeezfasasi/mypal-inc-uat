import React, { useState } from 'react';

// Accept business as a prop
export default function ServiceDetailTitle({ business }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Fallbacks for missing data
    const title = business?.business_name || 'Business Title';
    const description = business?.description || 'No description available.';
    
    // Truncate description to 150 characters when not expanded
    const truncatedDescription = description.length > 150 
        ? description.substring(0, 150) + '...' 
        : description;
    const displayDescription = isExpanded ? description : truncatedDescription;
    const shouldShowButton = description.length > 150;

    return (
        <div className="bg-white pt-3 md:pt-12 md:mb-6 antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-start md:items-start justify-center md:justify-between gap-3 md:gap-24">
                    {/* Business Title */}
                    <div className="md:w-1/2 flex justify-start md:justify-start">
                        <div 
                            className="text-2xl sm:text-4xl lg:text-5xl text-[#4D1402] tracking-tight text-left md:text-left bebas-title-font font-bold">
                            {title}
                        </div>
                    </div>

                    {/* Business Description */}
                    <div className="md:w-1/2 flex flex-col justify-center md:justify-start">
                        <p 
                            className="text-base sm:text-2xl text-gray-700 text-left md:text-left max-w-lg tracking-tights mont-normal-font">
                            {displayDescription}
                        </p>
                        {shouldShowButton && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="mt-3 text-[#4D1402] hover:underline text-base sm:text-lg focus:outline-none cursor-pointer mont-normal-font"
                            >
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
