import React from 'react';
import { Link } from 'react-router-dom';
import restaurant from '../../images/restaurant.svg';
import outdoor from '../../images/outdoor.svg';
import accomodation from '../../images/accomodation.svg';
import beauty from '../../images/beauty.svg';
import nightlife from '../../images/nightlife.svg';
import mobility from '../../images/mobility.svg';

const categories = [
    { name: 'Restaurants', venues: '200+', icon: restaurant, link: '/category/restaurant' },
    { name: 'Outdoor Activities', venues: '200+', icon: outdoor, link: '/category/outdooractivities' },
    { name: 'Accommodation', venues: '200+', icon: accomodation, link: '/category/accommodation' },
    { name: 'Beauty & Health', venues: '200+', icon: beauty, link: '/category/BeautyHealth' },
    { name: 'Nightlife', venues: '200+', icon: nightlife, link: '/category/nightlife' },
    { name: 'Mobility', venues: '200+', icon: mobility, link: '/category/mobility' },
];

export default function ExploreCategory() {
    return (
        <div className="bg-white py-12 md:py-24 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
                {/* Left Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
                    style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
                    borderImageSlice: 1,}}
                    ></div>

                    {/* Title */}
                    <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                        Explore By Category
                    </div>

                    {/* Right Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
                    ></div>
                </div>


                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            to={category.link}
                            className="text-center transition-transform duration-300 hover:scale-105 bg-[#ffffff] rounded-[20px] border-solid border-gray-300 border pt-10 pr-5 pb-10 pl-5 flex flex-col gap-1 items-center justify-center shrink-0 relative overflow-hidden"
                        >
                            {/* Icon */}
                            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FAE1DA] border-2 border-orange-100">
                                {typeof category.icon === "string" ? (
                                <img src={category.icon} alt={category.name} className="w-8 h-8" />
                                ) : (
                                <category.icon className="w-8 h-8 text-orange-600" />
                                )}

                            </div>

                            {/* Category Name */}
                            <h3 className="mt-2 font-semibold text-[#000000] text-center font-['AvenirNextRoundedStd-Demi',_sans-serif] text-[24px] md:text-[24px] lg:text-[32px] relative self-stretch">
                                {category.name}
                            </h3>

                            {/* Venues Count */}
                            <p className="mt-0 text-[#A42C05] text-foundation-red-dark text-center font-['AvenirNextRoundedStd-Medium',_sans-serif] sm:text-[18px] md:text-[22px] lg:text-2xl font-medium relative self-stretch underline">
                                {category.venues} Venues
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
