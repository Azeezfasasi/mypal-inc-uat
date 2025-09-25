import React from 'react'

function Test() {
  return (
      <>
     <div className="flex flex-row gap-[45px] items-center justify-start relative">
        {/* Left Gradient Line */}
        <div
          className="border-t border-solid shrink-0 w-[401px] h-0 relative -mt-px rotate-180 origin-top-left"
          style={{
            borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,
          }}
        ></div>

        {/* Title */}
        <div className="text-[#000000] text-left font-['DrukCyr-Medium',_sans-serif] text-[64px] font-medium relative flex items-center justify-start">
          Explore By Category
        </div>

        {/* Right Gradient Line */}
        <div
          className="border-t border-solid shrink-0 w-[401px] h-0 relative -mt-px"
          style={{
            borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,
          }}
        ></div>
      </div>

      </>
  )
}

export default Test