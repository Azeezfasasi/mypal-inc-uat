import React from 'react';
import cwc from '../../images/cwc.svg';
import goldentulip from '../../images/goldentulip.jpg';
import sfhospitality from '../../images/sfhospitality.png';
import truckcentral from '../../images/truckcentral.png';

const TrustedBy = () => {
  return (
    <div className="w-full bg-white md:py-0 px-4 md:px-8 flex flex-col items-center justify-center">
      {/* Title */}
      <h2 className="text-xl sm:text-[25px] text-center text-[#999999] font-normal mb-6 sm:mb-12 mont-normal-font">
        Trusted by people using this companies
      </h2>

      {/* Logos Container */}
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-12 sm:gap-x-16 sm:gap-y-16 items-center justify-center w-full max-w-6xl mx-auto">

        {/* CWC Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={cwc} alt="" className='w-[100px] md:w-[150px] h-[80px] md:h-[120px]' />
        </div>

        {/* Golden Tulip Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={goldentulip} alt="" className='w-[120px] md:w-[180px] h-[50px] md:h-[120px]' />
        </div>

        {/* Sun flower Hospitality Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={sfhospitality} alt="" className='rounded-full bg-slate-900 w-[100px] md:w-[130px] h-[80px] md:h-[130px] p-0' />
        </div>

        {/* Truck Central Logo */}
        <div className="flex justify-center items-center w-36 sm:w-48 opacity-100 hover:opacity-95 transition-opacity duration-300">
          <img src={truckcentral} alt="" className='w-[100px] md:w-[150px] h-[80px] md:h-[120px]' />
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
