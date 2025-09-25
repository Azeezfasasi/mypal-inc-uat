import React from 'react';
import joinmypal from '../../images/joinmypal.svg'
import itemstar from '../../images/itemstar.svg'

const JoinMyPal = () => {
  const benefits = [
    "Visibility to Targeted Customers",
    "Custom Flyers & Promotion Tools",
    "Bookings & Reservation Support",
    "Mobile-first Exposure",
    "Community Perks",
  ];

  return (
    <>
    {/* Section Title */}
    <div className="w-[90%] flex flex-row gap-[40px] items-center justify-start relative mt-16 mx-auto">
    {/* Left Gradient Line */}
        <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
        style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
        borderImageSlice: 1,}}
        ></div>

        {/* Title */}
        <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
            Why Join MyPal
        </div>

        {/* Right Gradient Line */}
        <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
        ></div>
    </div>
    <div className="w-[90%] bg-white py-5 px-4 md:px-8 flex items-center justify-center mx-auto">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">

            {/* Left Image Section */}
            <div className="relative w-full lg:w-1/2 flex justify-center p-8 bg-[#FFC140] rounded-[20px] shadow-lg">
                {/* Main Image with white outline effect */}
                <div className="relative">
                <img
                    src={joinmypal}
                    alt="Person celebrating"
                    className="w-full h-auto object-cover rounded-[10px]"
                />
                </div>
            </div>

            {/* Right Benefits List Section */}
            <div className="w-full lg:w-1/2">
                <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                    <div className="w-6 h-6 mr-3 mt-1">
                        {/* Star Icon */}
                        <img src={itemstar} alt="star" />
                    </div>
                    <span className="text-xl sm:text-2xl font-light text-gray-800">
                        {benefit}
                    </span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    </div>
    </>
  );
};

export default JoinMyPal;
