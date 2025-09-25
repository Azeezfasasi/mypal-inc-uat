import React from 'react';
import techmachinda from '../../images/techmachinda.svg';
import airbnb from '../../images/airbnb.svg';
import merck from '../../images/merck.svg';
import simon from '../../images/simon.svg';
import acqua from '../../images/acqua.svg';
import business from '../../images/business.svg';

const TrustedBy = () => {
  return (
    <div className="w-full bg-white md:py-0 px-4 md:px-8 flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="text-xl sm:text-[25px] text-center text-gray-500 font-normal mb-12 sm:mb-20">
        Trusted by people using this companies
      </h2>

      {/* Logos Container */}
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-12 sm:gap-x-16 sm:gap-y-16 items-center justify-center w-full max-w-6xl mx-auto">

        {/* Tech Mahindra Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={techmachinda} alt="" />
        </div>

        {/* Airbnb Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={airbnb} alt="" />
        </div>

        {/* Merck Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={merck} alt="" />
        </div>

        {/* Simon Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={simon} alt="" />
        </div>

        {/* Aqua Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={acqua} alt="" />
        </div>

        {/* Simon Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-40 hover:opacity-100 transition-opacity duration-300">
          <img src={business} alt="" />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
