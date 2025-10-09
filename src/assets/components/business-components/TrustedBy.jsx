import React from 'react';
// import techmachinda from '../../images/techmachinda.svg';
import three60 from '../../images/three60.jpg';
import cilantro from '../../images/cilantro.jpg';
import tamberma from '../../images/tamberma.jpg';
// import acqua from '../../images/acqua.svg';
import tropicana from '../../images/tropicana.jpg';

const TrustedBy = () => {
  return (
    <div className="w-full bg-white md:py-0 px-4 md:px-8 flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="text-xl sm:text-[25px] text-center text-[#999999] font-normal mb-12 sm:mb-20">
        Trusted by people using this companies
      </h2>

      {/* Logos Container */}
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-12 sm:gap-x-16 sm:gap-y-16 items-center justify-center w-full max-w-6xl mx-auto">

        {/* Tech Mahindra Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={cilantro} alt="" />
        </div>

        {/* Airbnb Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={three60} alt="" />
        </div>

        {/* Merck Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={tamberma} alt="" />
        </div>

        {/* Simon Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={tropicana} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
