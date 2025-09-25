import React from 'react';

const BusinessHeroSection = () => {
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col items-center">
      {/* Main container with custom gradient background and rounded corners */}
      <div 
        className="relative w-full h-[800px] md:h-[861px] rounded-b-[20px] overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #FFEDE9 0%, #FFF6F4 100%)'
        }}
      >
        {/* Navigation Bar */}
        <nav className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 md:mt-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#DB3A06" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                <path d="M12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" />
                <path d="M12 19v-4m-2 4h4m-4-2c0 1.1-.9 2-2 2s-2-.9-2-2m4-2c0-1.1.9-2 2-2s2 .9 2 2" />
              </svg>
              <span className="text-2xl font-bold text-[#4D1402]">MyPal</span>
            </div>

            {/* Middle Navigation (Desktop) */}
            <div className="hidden md:flex items-center space-x-8 bg-white/70 p-3 rounded-full backdrop-blur-sm shadow-md">
              <a href="#" className="text-gray-700 font-medium">Home</a>
              <a href="#" className="flex items-center text-gray-700 font-medium">
                Category
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-white bg-[#DB3A06] px-6 py-2 rounded-full font-semibold shadow-lg">For Business</a>
            </div>

            {/* Right-side Buttons (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-gray-700 font-medium px-4 py-2 rounded-full">Login</button>
              <button className="bg-[#DB3A06] text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-transform hover:scale-105">Sign Up</button>
            </div>

            {/* Mobile Menu Icon (if needed, but not in image) */}
            <div className="md:hidden">
              {/* This is a placeholder for a mobile menu button */}
              <button className="text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Content Section */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 pt-20">
          
          {/* Top Left Floating Image */}
          <div className='absolute -left-16 top-16 md:left-4 md:top-48 opacity-70'>
            <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="216" height="57" rx="28.5" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
              <text x="10" y="35" fontFamily="Inter, sans-serif" fontSize="14" fill="#6B7280" fontStyle="italic">Food photos go here</text>
            </svg>
          </div>

          {/* Top Right Floating Image */}
          <div className='absolute -right-16 top-48 md:right-4 md:top-64 opacity-70'>
            <svg width="250" height="150" viewBox="0 0 250 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="216" height="57" rx="28.5" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
              <text x="10" y="35" fontFamily="Inter, sans-serif" fontSize="14" fill="#6B7280" fontStyle="italic">World map image</text>
            </svg>
          </div>

          {/* "Trusted by" badge */}
          <div 
            className="bg-[rgba(255,255,255,0.34)] rounded-[50px] border-solid border-[rgba(255,255,255,0.41)] border shrink-0 w-[260px] md:w-[340px] h-[55px] md:h-[53px] relative flex justify-center items-center overflow-hidden" 
            style={{ backdropFilter: "blur(8.7px)" }}
          >
            <div className="text-[#000000] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal flex items-center justify-between px-2 md:px-0">
              <span>Trusted by over 500+ business</span>
              <div className="flex -space-x-2 overflow-hidden ml-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/FFC0CB/FFF?text=A" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/ADD8E6/FFF?text=B" alt=""/>
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://placehold.co/32x32/90EE90/FFF?text=C" alt=""/>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-[#4D1402] text-center font-bold text-[50px] md:text-[100px] leading-tight relative mt-8">
            Put Your Business on the Map
          </div>
          
          {/* Subheading */}
          <div className="w-full md:w-[70%] text-black text-center text-base md:text-2xl relative self-stretch flex items-center justify-center mx-auto mt-4">
            Join thousands of businesses using MyPal to build trust, boost visibility, and turn everyday visitors into loyal customers.
          </div>

          {/* "Get Started" Button */}
          <button className="w-full md:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer text-xl md:text-2xl mt-8">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessHeroSection;
