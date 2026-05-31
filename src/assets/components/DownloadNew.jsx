import React from "react"

export default function MypalDownloadModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* Desktop Version */}
      <div className="hidden md:flex bg-white rounded-3xl overflow-hidden w-full max-w-4xl relative shadow-2xl">
        
        {/* LEFT — Red curved panel */}
        <div className="relative w-full md:w-[45%] bg-[#C0392B] flex flex-col items-center justify-between p-8 md:p-6 overflow-hidden"
             style={{
               borderRadius: "0 80px 80px 0",
               clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)"
             }}>
          {/* Star decoration */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 text-white/20 text-6xl md:text-7xl font-black select-none">✦</span>

          {/* Phone mockups container */}
          <div className="relative w-48 h-80 md:w-56 md:h-96 flex-1 flex items-center justify-center">
            {/* Back phone */}
            <div className="absolute top-4 left-0 w-32 md:w-40 h-56 md:h-72 bg-black rounded-2xl border-2 border-white/30 -rotate-12 overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#8B1A1A] via-[#C0392B] to-[#1a1a2e] flex flex-col justify-end p-3 md:p-4">
                <div className="bg-white/10 rounded-md p-2 mb-2">
                  <p className="text-white text-xs font-semibold">Halloween Night</p>
                  <p className="text-white/70 text-[10px]">Fri, Mar 29 • 08:00PM</p>
                </div>
                <div className="bg-[#C0392B] rounded-md py-2 text-center border border-white/20">
                  <p className="text-white text-xs font-semibold">Buy Ticket →</p>
                </div>
              </div>
            </div>

            {/* Front phone */}
            <div className="absolute top-12 right-0 w-36 md:w-44 h-64 md:h-80 bg-white rounded-3xl border-4 border-black overflow-hidden shadow-xl">
              <div className="bg-[#C0392B] px-3 py-2 md:px-4 md:py-3">
                <p className="text-white text-xs md:text-sm font-medium">What are you craving today?</p>
              </div>
              <div className="p-2 md:p-3 bg-[#f5f5f5] h-full overflow-y-auto">
                <div className="bg-white rounded-lg px-2 py-1.5 mb-2 text-xs text-gray-400 border border-gray-200">Search jollof, noodles...</div>
                <p className="text-xs text-gray-500 mb-2 font-medium">Pick a cuisine</p>
                <div className="grid grid-cols-2 gap-1.5 mb-2">
                  {['Chinese', 'Nigerian', 'Indian', 'Continental'].map(c => (
                    <div key={c} className="bg-white rounded-lg p-1.5 md:p-2 text-center border border-gray-100">
                      <p className="text-xs font-semibold text-gray-700">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl mx-4 p-3 md:p-4 flex items-center gap-3 w-full border border-white/20 mt-4">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-md">
              <span className="text-sm md:text-base font-bold text-[#C0392B]">m.</span>
            </div>
            <div className="flex-1">
              <p className="text-white text-xs md:text-sm font-bold">MYPAL</p>
              <p className="text-white/80 text-[10px] md:text-xs">Your world of hospitality, now in your pocket.</p>
            </div>
            <div className="w-6 h-6 md:w-7 md:h-7 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-white text-sm">↗</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Content panel */}
        <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col justify-center relative bg-white">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* App icon */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#DB3A06] to-[#C0392B] rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg">
            <span className="text-lg md:text-2xl font-bold text-white">M</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Download MYPAL</h1>
          <p className="text-xl md:text-2xl font-bold text-[#E8540A] mb-3 md:mb-4">For Android or iOS</p>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 leading-relaxed">
            Discover events, get tickets, and experience the best moments — anytime, anywhere.
          </p>

          {/* Store buttons - Official style */}
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {/* Google Play Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.mypal.hospitality" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-4 md:px-6 py-2.5 md:py-3 hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.609 22.186A.996.996 0 013 21.414V2.586a.996.996 0 01.609-.772zm16.959 8.386l-7.083-4.073 7.083 4.073zm0 4.6l-10.246 5.9a1 1 0 01-1.399-.91V5.21a1 1 0 011.4-.91l10.245 5.9z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Get it on</p>
                <p className="text-base md:text-lg font-bold leading-tight">Google Play</p>
              </div>
            </a>

            {/* App Store Button */}
            <a 
              href="https://apps.apple.com/ng/app/mypal-hospitality-lifestyle/id6762733829" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-4 md:px-6 py-2.5 md:py-3 hover:bg-gray-900 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 0-1.82.58-2.54 1.69.92.64 1.54 1.65 1.54 2.81 0 1.93-1.57 3.5-3.5 3.5-1.38 0-2.57-.8-3.14-1.96-.23-.48-.37-1-.37-1.54 0-2.15 1.74-3.89 3.89-3.89.65 0 1.27.16 1.82.44.13-.35.23-.72.23-1.11 0-1.38-1.12-2.5-2.5-2.5-.87 0-1.63.45-2.07 1.13-.18.28-.33.59-.43.92-.37-.28-.82-.43-1.32-.43-1.38 0-2.5 1.12-2.5 2.5 0 .98.55 1.82 1.36 2.27-.09.3-.14.62-.14.96 0 2.35 1.91 4.26 4.26 4.26 2.06 0 3.78-1.54 4.06-3.52.08-.61.2-1.19.4-1.73.55-1.56 1.65-2.64 3.01-2.64.92 0 1.77.45 2.3 1.19.24.35.42.74.54 1.15.35-1.07.55-2.22.55-3.41 0-5.56-4.53-10.09-10.09-10.09C6.48 2.91 2.95 6.44 2.95 10.97c0 4.52 3.53 8.05 7.96 8.05z"/>
              </svg>
              <div className="text-left">
                <p className="text-xs text-white/70 uppercase tracking-wide font-semibold">Download on the</p>
                <p className="text-base md:text-lg font-bold leading-tight">App Store</p>
              </div>
            </a>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-3 mb-6 md:mb-8">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm md:text-base text-gray-500 font-medium">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* QR code section */}
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6 p-3 md:p-4 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-lg flex-shrink-0 border-2 border-gray-300 p-1 flex items-center justify-center">
              <div className="grid grid-cols-5 gap-px w-full h-full">
                {[1,1,1,1,1, 1,0,0,0,1, 1,0,1,0,1, 1,0,0,0,1, 1,1,1,1,1].map((v, i) => (
                  <div key={i} className={`rounded-sm ${v ? 'bg-gray-900' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-base font-bold text-gray-900">Scan to download</p>
              <p className="text-xs md:text-sm text-gray-600">Open camera and scan the QR code to get the app</p>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <span className="text-base">✓</span>
            <span>Safe, Secure & Trusted by thousands of users.</span>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="md:hidden bg-white rounded-3xl overflow-hidden w-full max-w-sm shadow-2xl">
        {/* Mobile layout stacks vertically */}
        
        {/* Top Red Section */}
        <div className="relative bg-[#C0392B] w-full p-6 pb-8 overflow-hidden"
             style={{
               borderRadius: "0 0 40px 40px"
             }}>
          {/* Star decoration */}
          <span className="absolute top-2 right-4 text-white/20 text-5xl font-black select-none">✦</span>

          {/* Close button - mobile positioned at top */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white hover:bg-white/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Phone mockup - simplified for mobile */}
          <div className="relative w-40 h-56 mx-auto mb-4">
            <div className="absolute inset-0 w-32 h-48 bg-black rounded-2xl border-2 border-white/30 left-0 top-2 -rotate-12 overflow-hidden shadow-lg">
              <div className="w-full h-full bg-gradient-to-br from-[#8B1A1A] via-[#C0392B] to-[#1a1a2e] flex flex-col justify-end p-2">
                <div className="bg-white/10 rounded-md p-1 mb-1">
                  <p className="text-white text-[8px] font-semibold">Halloween Night</p>
                  <p className="text-white/70 text-[6.5px]">Fri, Mar 29 • 08:00PM</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 w-32 h-56 bg-white rounded-2xl border-3 border-black right-0 top-4 overflow-hidden shadow-lg">
              <div className="bg-[#C0392B] px-2 py-1">
                <p className="text-white text-[7px] font-medium">What are you craving today?</p>
              </div>
              <div className="p-1.5 bg-[#f5f5f5] flex-1">
                <div className="bg-white rounded-md px-1.5 py-1 mb-1 text-[6px] text-gray-400">Search...</div>
                <p className="text-[6px] text-gray-500 mb-1 font-medium">Pick a cuisine</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {['Chinese', 'Nigerian'].map(c => (
                    <div key={c} className="bg-white rounded-md p-0.5 text-center">
                      <p className="text-[6px] font-semibold text-gray-700">{c}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-2 flex items-center gap-2 border border-white/20 mt-2">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#C0392B]">m.</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[10px] font-bold">MYPAL</p>
              <p className="text-white/80 text-[8px] line-clamp-1">Your world of hospitality</p>
            </div>
          </div>
        </div>

        {/* Bottom White Section */}
        <div className="p-5 flex flex-col">
          {/* App icon */}
          <div className="w-10 h-10 bg-gradient-to-br from-[#DB3A06] to-[#C0392B] rounded-xl flex items-center justify-center mb-3 shadow-md">
            <span className="text-base font-bold text-white">M</span>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-1">Download MYPAL</h1>
          <p className="text-lg font-bold text-[#E8540A] mb-2">For Android or iOS</p>
          <p className="text-xs text-gray-600 mb-4 leading-relaxed">
            Discover events, get tickets, and experience the best moments — anytime, anywhere.
          </p>

          {/* Store buttons */}
          <div className="space-y-2 mb-4">
            <a 
              href="https://play.google.com/store/apps/details?id=com.mypal.hospitality" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors w-full"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.609 22.186A.996.996 0 013 21.414V2.586a.996.996 0 01.609-.772zm16.959 8.386l-7.083-4.073 7.083 4.073zm0 4.6l-10.246 5.9a1 1 0 01-1.399-.91V5.21a1 1 0 011.4-.91l10.245 5.9z"/>
              </svg>
              <div className="text-left">
                <p className="text-[8px] text-white/70 uppercase tracking-wide font-semibold">Get it on</p>
                <p className="text-sm font-bold leading-tight">Google Play</p>
              </div>
            </a>

            <a 
              href="https://apps.apple.com/ng/app/mypal-hospitality-lifestyle/id6762733829" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-900 transition-colors w-full"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 0-1.82.58-2.54 1.69.92.64 1.54 1.65 1.54 2.81 0 1.93-1.57 3.5-3.5 3.5-1.38 0-2.57-.8-3.14-1.96-.23-.48-.37-1-.37-1.54 0-2.15 1.74-3.89 3.89-3.89.65 0 1.27.16 1.82.44.13-.35.23-.72.23-1.11 0-1.38-1.12-2.5-2.5-2.5-.87 0-1.63.45-2.07 1.13-.18.28-.33.59-.43.92-.37-.28-.82-.43-1.32-.43-1.38 0-2.5 1.12-2.5 2.5 0 .98.55 1.82 1.36 2.27-.09.3-.14.62-.14.96 0 2.35 1.91 4.26 4.26 4.26 2.06 0 3.78-1.54 4.06-3.52.08-.61.2-1.19.4-1.73.55-1.56 1.65-2.64 3.01-2.64.92 0 1.77.45 2.3 1.19.24.35.42.74.54 1.15.35-1.07.55-2.22.55-3.41 0-5.56-4.53-10.09-10.09-10.09C6.48 2.91 2.95 6.44 2.95 10.97c0 4.52 3.53 8.05 7.96 8.05z"/>
              </svg>
              <div className="text-left">
                <p className="text-[8px] text-white/70 uppercase tracking-wide font-semibold">Download on the</p>
                <p className="text-sm font-bold leading-tight">App Store</p>
              </div>
            </a>
          </div>

          {/* OR divider */}
          <div className="flex items-center gap-2 mb-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* QR code */}
          <div className="flex items-center gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 bg-white rounded-lg flex-shrink-0 border border-gray-300 p-1">
              <div className="grid grid-cols-5 gap-px w-full h-full">
                {[1,1,1,1,1, 1,0,0,0,1, 1,0,1,0,1, 1,0,0,0,1, 1,1,1,1,1].map((v, i) => (
                  <div key={i} className={`rounded-sm ${v ? 'bg-gray-900' : 'bg-white'}`} />
                ))}
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900">Scan to download</p>
              <p className="text-[10px] text-gray-600">Open camera and scan</p>
            </div>
          </div>

          {/* Trust badge */}
          <div className="flex items-center gap-1.5 text-[10px] text-gray-600">
            <span>✓</span>
            <span>Safe, Secure & Trusted</span>
          </div>
        </div>
      </div>
    </div>
  );
}