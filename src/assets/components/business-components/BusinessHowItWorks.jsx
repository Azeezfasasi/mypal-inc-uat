import React from 'react'
import howitworks from '../../images/howitworks.png'
import howimage from '../../images/howimage.svg'

function BusinessHowItWorks() {
  return (
    <>
    <div className='w-full flex flex-col justify-center items-center px-4 md:px-8'>
        {/* Section Title */}
        <div className="w-[90%] flex flex-row gap-[40px] items-center justify-start relative mt-16 mx-auto">
            {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
            style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,}}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                How It Works
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
            ></div>
        </div>

        {/* laptop image */}
        <div className='hidden w-full md:flex justify-center'>
          <img src={howitworks} alt="How it works" />
        </div>

        {/* Mobile image */}
        <div className='block md:hidden w-full mt-6 mb-4'>
          <img src={howimage} alt="How it works" />
        </div>
    </div>
    </>
  )
}

export default BusinessHowItWorks
