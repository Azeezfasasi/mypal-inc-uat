import React from 'react';

export default function ServiceDetailTitle() {
    return (
        <div className="bg-white pt-3 md:pt-12 md:mb-6 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-3 md:gap-24">
                    {/* The Golden Terrace Title */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <div className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#4D1402] font-['DrukCyr-Medium',_sans-serif] tracking-tight text-center md:text-left">
                            THE GOLDEN TERRACE
                        </div>
                    </div>

                    {/* Description Text */}
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                        <p className="text-base sm:text-2xl font-medium text-gray-700 text-center md:text-left max-w-lg">
                            Our passion for driver construction stems from a genuine desire to foster safer communities. We understand that new drivers are challenging, but we have a team of experts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
