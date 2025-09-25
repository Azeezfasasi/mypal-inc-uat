import React from 'react';
import businessheroicon from '../../images/businessheroicon.svg'
import bussnew from '../../images/bussnew.svg'
import floatingright from '../../images/floatingright.svg'
import businessheroleft from '../../images/businessheroleft.svg'
import BusinessHeaderSection from './BusinessHeaderSection';
import { Link } from 'react-router-dom';

// const heroImage = bussnew;

export default function BusinessHeroSection() {
    return (
        <div className="relative w-full h-[800px] md:h-[871px]">
            <BusinessHeaderSection />
            {/* Background Image with Overlay */}
            <img
                className="rounded-b-[40px] w-full h-[750px] md:h-[721px] absolute left-0 top-0"
                style={{
                background: "linear-gradient(to left, #d9d9d9, #d9d9d9)",
                objectFit: "cover"
                }}
                src={bussnew}
            />

            {/* Hero Content */}
            <div className=" z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8 relative">
                {/* Text Content */}
                <div className="w-full md:w-[95%] flex flex-col gap-4 items-center justify-start mt-[-120px] md:mt-[-160px] mb-16">

                    {/* Left  floating image */}
                    <div className='hidden lg:block absolute -left-16 top-[-10px] md:left-[60px] md:top-[70px] opacity-70'>
                        <img src={businessheroleft} alt="image" />
                    </div>

                    {/* Top Right Floating Image */}
                    <div className='hidden lg:block absolute -right-16 top-48 md:right-4 md:top-64 opacity-70'>
                        <img src={floatingright} alt="image" />
                    </div>

                    <div className="bg-[rgba(255,255,255,0.34)] rounded-[50px] border-solid border-[rgba(255,255,255,0.41)] border shrink-0 w-[340px] md:w-[340px] h-[55px] md:h-[53px] relative flex justify-center items-center overflow-hidden" style={{ backdropFilter: "blur(8.7px)" }}>
                        <div className="text-[#000000] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal flex items-center justify-between px-2 md:px-0">
                        <span>Trusted by over 500+ business</span> <img src={businessheroicon} alt="" className='ml-[5px]' />
                        </div>
                    </div>
                    <div className="text-[#4D1402] text-center font-['DrukCyr-Medium',_sans-serif] text-[50px] md:text-[80px] font-bold relative self-stretch flex items-center justify-center">
                        Put Your Business on the Map
                    </div>
                    <div className="w-full md:w-[70%] text-[#000000] text-center font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[17px] md:text-2xl font-normal relative self-stretch flex items-center justify-center mx-auto">
                        Join thousands of businesses using MyPal to build trust, boost visibility, and turn everyday visitors into loyal customers.
                    </div>

                    {/* right image */}
                    <div className='absolute left-4 top-4 md:left-8 md:top-8'>
                        <div className="relative">
                            <img
                                className="rounded-[40px] w-[216px] h-[57px] absolute left-0 top-0"
                                style={{
                                background: "linear-gradient(to left, #d9d9d9, #d9d9d9)",
                                objectFit: "cover"
                                }}
                                src="rectangle-80.png"
                            />
                            <img
                                className="w-[30px] h-[30px] absolute left-[244.88px] top-[57.5px] overflow-visible"
                                style={{ aspectRatio: 1 }}
                                src={businessheroleft}
                            />
                        </div>
                    </div>

                    <a href='https://business.mypal-inc.com/signup' target='_blank' className="w-full flex flex-row justify-center items-center md:w-[40%] lg:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 text-white rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer text-2xl font-medium mt-6">
                        Get Started
                    </a>
                </div>

            </div>
        </div>
    );
}
