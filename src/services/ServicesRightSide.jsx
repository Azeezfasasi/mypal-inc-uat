import React, {useEffect, useState} from 'react'
// import servicephone from '../assets/images/servicephone.svg';
import servicelocation from '../assets/images/servicelocation.svg';
import googleplay from '../assets/images/googleplay.png';
import appstore from '../assets/images/appstore.png';

const businessHours = [
    { day: 'Sunday', time: 'N/A' },
    { day: 'Monday', time: 'N/A' },
    { day: 'Tuesday', time: 'N/A' },
    { day: 'Wednesday', time: 'N/A' },
    { day: 'Thursday', time: 'N/A' },
    { day: 'Friday', time: 'N/A' },
    { day: 'Saturday', time: 'N/A' },
];

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const sortOperatingDays = (days) => {
    return [...days].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));
};

function ServicesRightSide({ business }) {
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    useEffect(() => {
        console.log("business.operatingDays:", business?.operatingDays);
    }, [business]);

    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setShowDownloadModal(false); };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, []);

    // Dynamic address and phone
    const address = business?.address || 'No address provided.';
    // const phone = business?.business_number || 'No phone number.';
    // Dynamic business hours from API
    const operatingDays = Array.isArray(business?.operating_days) && business.operating_days.length > 0
        ? sortOperatingDays(business.operating_days.map(dayObj => ({
            day: dayObj.day_of_week,
            time: `${dayObj.opening_time} - ${dayObj.closing_time}`
        })))
        : businessHours;
        
const getDownloadButtonText = (category) => {
  if (!category) return "Download the app to make reservation";

  let categoryText = "";

  if (typeof category === "object" && category !== null) {
    // Use the actual category name
    categoryText = category.name || category.business_type || category.title || "";
  }

  if (!categoryText) return "Download the app to make reservation";

  const normalized = categoryText.toLowerCase();

  if (normalized.includes("fine dining"))
    return "Download the app to make reservation";
  if (normalized.includes("buffet") || normalized.includes("iconic delicacies"))
    return "Download the app to place orders";
  if (normalized.includes("beaches & resorts"))
    return "Download the app to buy tickets";
  if (
    normalized.includes("boat and yachts cruises") ||
    normalized.includes("cruise") ||
    normalized.includes("salons and spa") ||
    normalized.includes("short-let homes") ||
    normalized.includes("club") 
  )
    return "Download the app to make reservations";

  return "Download the app to make reservation";
};


  return (
      <>
        {/* Right Column (Contact & Hours) */}
        <div className="lg:w-1/3">
            <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300">
                {/* Address */}
                <div className="flex items-center space-x-3">
                    <img src={servicelocation} alt="location" className='mt-1' />
                    <p className="text-sm md:text-base mont-normal-font">
                        {address}
                    </p>
                </div>

                <hr className="border-t border-gray-200 my-4" />

                {/* Phone Number */}
                {/* <div className="flex items-center space-x-3">
                    <img src={servicephone} alt="phone" />
                    <span className="text-sm md:text-base">{phone}</span>
                </div> */}

                <hr className="border-t border-gray-200 my-4" />

                {/* Location and Hours */}
                <h4 className="text-[15px] font-normal text-gray-800 mb-4 bebas-font">Location and Hours</h4>
                <div className="space-y-3">
                    
                    {operatingDays.map((item, index) => (
                        <div key={index} className="flex justify-between text-[#000000] text-[14px] md:text-[15px]">
                            <span className="font-normal mont-normal-font">{item.day}</span>
                            <span className='mont-normal-font'>{item.time}</span>
                        </div>
                    ))}
                </div>

                {/* Download Button */}
                <div className="mt-8">
                    <button onClick={() => setShowDownloadModal(true)} className="w-full p-3 md:p-5 rounded-[10px] bg-[#DB3A06] text-[#FBEBE6] text-base font-semibold hover:bg-orange-700 transition-colors duration-200 flex flex-row gap-2.5 items-center justify-center cursor-pointer text-[14px] md:text-[16px] mont-normal-font">
                        {getDownloadButtonText(business?.category)}
                    </button>
                </div>
            </div>
        </div>
        {showDownloadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-70" onClick={() => setShowDownloadModal(false)} />
                <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] md:max-w-md w-full p-6 z-60">
                    <button onClick={() => setShowDownloadModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
                    <h2 className="text-2xl font-bold mb-4">Download MyPal App</h2>
                    <p className="mb-6 text-gray-700">Experience the best of MyPal on your mobile device.</p>
                    <div className="flex flex-col space-y-4">
                        <a href="https://play.google.com/store/apps/details?id=com.mypal.hospitality" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-4 px-4 py-3 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 text-center">
                        <img src={googleplay} alt="Get it on Google Play" className="h-6 rounded-lg" />
                        Download for Android
                        </a>
                        <a href="https://apps.apple.com/ng/app/mypal-hospitality-lifestyle/id6762733829" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-4 px-4 py-3 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 text-center">
                            <img src={appstore} alt="Get it on App Store" className="h-6 rounded-lg" />
                            Download for iOS
                        </a>
                    </div>
                </div>
            </div>
        )}
      </>
  )
}

export default ServicesRightSide