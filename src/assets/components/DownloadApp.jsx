import React from "react"
import downloadred from '../images/downloadred.svg';
import downloadleftimg from '../images/downloadleftimg.svg';
import downloadstar from '../images/downloadstar.svg';
import downloadlogo from '../images/downloadlogo.svg';
import downloadlogo2 from '../images/downloadlogo2.svg';
import downloadarrow from '../images/downloadarrow.svg';
import downloadgoogleplay from '../images/downloadgoogleplay.svg';
import downloadappstore from '../images/downloadappstore.svg';
import downloadshield from '../images/downloadshield.svg';
import playstoreqr from '../images/playstoreqr.svg';

export default function MypalDownloadModal({ onClose }) {
  const handleBackdropClick = (e) => {
    // Close modal only if clicking the backdrop, not the modal itself
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 mont-normal-font cursor-pointer" 
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl h-[600px] lg:h-fit overflow-auto lg:overflow-hidden flex flex-col lg:flex-row w-full max-w-2xl relative cursor-default"
        onClick={(e) => e.stopPropagation()}
      >

        {/* LEFT — Red panel */}
        <div className="w-full lg:w-[54%] hidden lg:flex flex-col items-center justify-end p-0 relative overflow-hidden lg:mt-[-10px]">
            {/* red background image */}
              <img src={downloadred} alt="Background" className="lg:absolute inset-0 w-full h-full object-cover" />

          {/* Star decoration */}
          <span className="lg:absolute top-8 left-1/2 -translate-x-1/2 text-white/20 text-7xl font-black select-none">
            <img src={downloadstar} alt="Star" className="w-16 h-16" />
          </span>

          {/* Phone mockups */}
          <div className="relative lg:w-[340px] lg:h-[320px]">
            <img src={downloadleftimg} alt="Phone Mockup" className="lg:absolute inset-0 w-full h-full object-contain" />
          </div>

          {/* Bottom banner */}
          <div className="bg-white/20 rounded-[11.48px] mx-3 mb-4 p-[7.18px] flex items-center gap-2 sw-[calc(100%-24px)] w-[250px] border border-[#FFFFFF33] z-50">
            <div className="rounded-lg flex items-center justify-center shrink-0 px-0 py-0">
                <img src={downloadlogo} alt="MYPAL Logo" className="w-12 h-7 p-0" />
            </div>
            <div>
              <p className="text-white text-[10.05px] leading-[14.35px] font-semibold">MyPal</p>
              <p className="text-white/80 text-[7.18px] leading-[8.61px] font-normal">Your world of hospitality, now in your pocket.</p>
            </div>
            <div className="ml-auto rounded-md flex items-center justify-center text-white text-xs">
              <img src={downloadarrow} alt="Arrow" className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Mobile top section */}
        <div className="w-full lg:hidden h-[200px] bg-red-600 flex flex-col items-center justify-end p-0 relative soverflow-hidden">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 shadow-md transition-colors cursor-pointer text-lg font-bold hover:text-red-600"
          >
            ✕
          </button>
          
          <div className="relative w-[180px] h-[200px] p-0">
            <img src={downloadleftimg} alt="Phone Mockup" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        </div>

        {/* RIGHT — Content panel */}
        <div className="flex-1 p-4 lg:pr-8  flex flex-col justify-center relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="hidden absolute top-3 right-3 w-12 h-12 rounded-full bg-gray-100 lg:flex items-center justify-center text-gray-500 hover:bg-gray-200 shadow-md transition-colors cursor-pointer text-lg font-bold hover:text-red-600"
          >
            ✕
          </button>

          {/* App icon */}
          <div className="w-20 h-20 flex items-center justify-center ">
            <img src={downloadlogo2} alt="MYPAL Icon" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-xl font-bold text-[#111827] leading-[20px]">Download MyPal</h2>
          <p className="text-xl font-bold text-[#FF4D00] leading-[20px] mt-1 mb-2">For Android or iOS</p>
          <p className="text-sm font-normal text-[#6B7280] mb-4 leading-relaxed ">
            Discover exciting events, experiences and personalized recommendations tailored to your lifestyle.
          </p>

          {/* Google PlayStore button */}
          <a href="https://play.google.com/store/apps/details?id=com.mypal.hospitality" target="_blank" className="flex justify-center items-center gap-4 bg-black text-white rounded-xl px-0 py-0 mb-2 hover:bg-black transition-colors">
            {/* <span className="text-2xl">▶</span> */}
            <div>
              <img src={downloadgoogleplay} alt="Google Play" className="w-full h-full mb-1" />
            </div>
          </a>

          {/* Appstore Button */}
          <a href="https://apps.apple.com/ng/app/mypal-hospitality-lifestyle/id6762733829" target="_blank" className="flex justify-center items-center gap-3 bg-black text-white rounded-xl px-0 py-0 mb-3 hover:bg-black transition-colors">
            {/* <span className="text-2xl">▶</span> */}
            <div>
              <img src={downloadappstore} alt="App Store" className="w-full h-full mb-1" />
            </div>
          </a>

          {/* OR divider */}
          <div className="flex items-center gap-2 mt-1 mb-3">
            <hr className="flex-1 border-gray-200" />
            <span className="text-xs text-[#9CA3AF] font-semibold leading-[6.78px]">OR</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* QR code row */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-14 h-14 bg-gray-100 rounded-lg">
              <img src={playstoreqr} alt="QR Code" className="w-full h-full" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">Scan to download</p>
              <p className="text-[11px] text-gray-500">Open camera and scan the QR code to get the app</p>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex justify-start items-center gap-1.5">
            <span className="text-sm">
                <img src={downloadshield} alt="Trust Badge" className="w-4 h-4 inline-block" />
            </span>
            <span className="text-[9px] font-medium text-[#6B7280]">Safe, Secure & Trusted by thousands of users.</span>
          </div>
        </div>

      </div>
    </div>
  );
}