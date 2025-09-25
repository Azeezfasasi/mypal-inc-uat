import React from 'react';
import MainHeader from './MainHeader';
import heroimagedeem from '../../images/heroimagedeem.svg'
import search from '../../images/search.svg'
import location from '../../images/location.svg'

const heroImage = heroimagedeem;

export default function HeroSection() {
    return (
        <div className="relative w-full h-[800px] md:h-[800px]">
            <MainHeader />
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center rounded-b-[20px]"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black opacity-40 rounded-b-[20px]"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
                {/* Text Content */}
                <div className="w-full md:w-[95%] text-left mt-[-40px] md:mt-0 mb-16 flex flex-col items-start">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide drop-shadow-lg text-left font-['DrukCyr-Medium',_sans-serif] font-bold relative">
                        Effortlessly <span className="text-[#DB3A06]">discover</span>, reserve, book or order from our extensive list of <span className="text-[#DB3A06]">hospitality</span> services.
                    </h1>
                </div>

                {/* Search Bar Section */}
                <div className="relative w-full md:w-[95%] md:h-[151px] p-4 md:p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border border-white/30 flex flex-row justify-center items-center">
                    <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                        {/* Search Input */}
                        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-solid border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{backdropFilter: 'blur(8.7px)'}}>
                            <img src={search} alt="search" />
                            <input
                                type="search"
                                placeholder="What are you looking for"
                                className="w-full text-[#ffffff] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] sm:text-[16px] md:text-[16px] lg:text-[24px] font-medium placeholder-white focus:outline-none"
                            />
                        </div>

                        {/* Location Input */}
                        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-solid border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{backdropFilter: 'blur(8.7px)'}}>
                            <img src={location} alt="location" />
                            <input
                                type="search"
                                placeholder="Location"
                                className="w-full text-[#ffffff] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] sm:text-[16px] md:text-[16px] lg:text-[24px] font-medium placeholder-white focus:outline-none"
                            />
                        </div>

                        {/* Explore Button */}
                        <button className="w-full md:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer">
                            Explore
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

