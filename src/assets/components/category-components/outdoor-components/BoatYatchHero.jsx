import React from 'react';
import search from '../../../images/search.svg'
import location from '../../../images/location.svg'
import boatheroimg from '../../../images/boatheroimg.svg'
import RestaurantHeader from '../restaurant-components/RestaurantHeader';

const heroImage = boatheroimg;

export default function BoatYatchHero() {
    return (
        <div className="relative w-full h-[900px] md:h-[676px]">
            <RestaurantHeader />
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center rounded-b-[20px]"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
                {/* Text Content */}
                <div className="w-full md:w-[95%] flex flex-col gap-4 items-center justify-start relative mt-[-120px] md:mt-[-160px] mb-16">
                    <div className="bg-[rgba(255,255,255,0.34)] rounded-[50px] border-solid border-[rgba(255,255,255,0.41)] border shrink-0 w-[130px] h-[33px] relative overflow-hidden" style={{ backdropFilter: "blur(8.7px)" }}>
                        <div className="text-[#ffffff] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal absolute left-1 md:left-3 top-1.5 flex items-center justify-center px-2 md:px-0">
                        Sail away in style
                        </div>
                    </div>
                    <div className="text-[#ffffff] text-center font-['DrukCyr-Medium',_sans-serif] text-[50px] md:text-[80px] font-bold relative self-stretch flex items-center justify-center">
                        BOAT & YATCH CRUISE
                    </div>
                    <div className="w-full md:w-[70%] text-[#ffffff] text-center font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[17px] md:text-xl font-medium relative self-stretch flex items-center justify-center mx-auto">
                        Elevate your leisure with private boat rides or luxury yacht cruises. Perfect for romantic evenings, group celebrations, or solo peace — experience the open waters like never before.
                    </div>
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

