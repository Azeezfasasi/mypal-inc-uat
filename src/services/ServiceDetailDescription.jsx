import React, { useState, useEffect } from 'react';
import { Heart, Share2, MapPin, Phone, Star } from 'lucide-react';
import margicstar from '../assets/images/margicstar.svg';
import servicelocation from '../assets/images/servicelocation.svg';
// import servicephone from '../assets/images/servicephone.svg';
import ServicesReview from './ServicesReview';
import ServicesRightSide from './ServicesRightSide';
import ShareButton from '../assets/components/services-components/ShareButton';

const businessHours = [
    { day: 'Monday', time: 'N/A' },
    { day: 'Tuesday', time: 'N/A' },
    { day: 'Wednesday', time: 'N/A' },
    { day: 'Thursday', time: 'N/A' },
    { day: 'Friday', time: 'N/A' },
];

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



export default function ServiceDetailDescription({ business }) {
    // modal state for Download App (coming soon)
                const [showDownloadModal, setShowDownloadModal] = useState(false);

        // close modal on Escape key
        useEffect(() => {
            const onKey = (e) => { if (e.key === 'Escape') setShowDownloadModal(false); };
            document.addEventListener('keydown', onKey);
            return () => document.removeEventListener('keydown', onKey);
        }, []);

    // Dynamic address and phone
    const address = business?.address || 'No address provided.';
    // const phone = business?.business_number || 'No phone number.';
    // Dynamic business hours from API
    const operatingDays = Array.isArray(business?.operatingDays) && business.operatingDays.length > 0
        ? business.operatingDays.map(dayObj => ({
            day: dayObj.day,
            time: `${dayObj.opening_time} - ${dayObj.closing_time}`
        }))
        : businessHours;

    // Services Offered: use fine_dining_menus if available
    const apiServices = Array.isArray(business?.fine_dining_menus) && business.fine_dining_menus.length > 0
        ? business.fine_dining_menus.map(menu => menu.name)
        : null;

    return (
        <div className="w-[95%] bg-gray-50 py-0 md:py-0 font-sans antialiased mx-auto">
            <div className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="lg:w-2/3">
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <button onClick={() => setShowDownloadModal(true)} className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-5 rounded-[10px] bg-[#DB3A06] text-white font-semibold shadow-md hover:bg-orange-700 transition-colors duration-200 gap-2.5 cursor-pointer text-[14px] md:text-[16px]">
                                {getDownloadButtonText(business?.category)}
                            </button>
                            <div className='flex flex-row items-center space-x-3'>
                                <ShareButton />
                            </div>
                        </div>

                        <div className="border-solid border-gray-300 border-t border-r-[0] border-b-[0] border-l-[0] h-0 relative mb-4" style={{ marginTop: '-1px', transformOrigin: '0 0', transform: 'rotate(0deg) scale(1, 1)'}}
                        ></div>

                        {/* Service Offered Section */}
                        <div className="bg-white rounded-[10px] p-6 md:p-8 shadow-xl border border-solid border-gray-300 mb-8">
                            <h3 className="text-xl md:text-2xl font-semibold text-[#000000] mb-6">
                                Service Offered
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {apiServices && apiServices.length > 0 ? (
                                    apiServices.map((service, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-gray-700">
                                            <img src={margicstar} alt="star" />
                                            <span className="text-[#000000] text-[14px] md:text-base font-normal">{service}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No services offered information available.</p>
                                )}
                            </div>
                        </div>
                        <div className='block md:hidden mb-6'>
                            <ServicesRightSide business={business} />
                        </div>
                        <ServicesReview 
                            reviews={business?.reviews}
                            totalReviews={business?.totalReviews || business?.reviews?.length}
                            averageRating={business?.averageRating}
                        />
                    </div>

                    {/* Right Column (Contact & Hours) */}
                    <div className="lg:w-1/3 hidden md:block">
                        <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300">
                            {/* Address */}
                            <div className="flex items-start space-x-3">
                                <img src={servicelocation} alt="location" className='mt-1' />
                                <p className="text-sm md:text-base">
                                    {address}
                                </p>
                            </div>

                            <hr className="border-t border-gray-200 my-4" />

                            {/* Phone Number */}
                            {/* <div className="flex items-center space-x-3">
                                <img src={servicephone} alt="phone" />
                                <span className="text-sm md:text-base">{phone}</span>
                            </div> */}

                            {/* <hr className="border-t border-gray-200 my-4" /> */}

                            {/* Location and Hours */}
                            <h4 className="text-[15px] font-semibold text-gray-800 mb-4">Business Hours</h4>
                            <div className="space-y-3">
                                {operatingDays.map((item, index) => (
                                    <div key={index} className="flex justify-between text-[#000000] text-[14px] md:text-[15px]">
                                        <span className="font-normal">{item.day}</span>
                                        <span>{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Download Button */}
                            <div className="mt-8">
                                <button onClick={() => setShowDownloadModal(true)} className="w-full p-3 md:p-5 rounded-[10px] bg-[#DB3A06] text-[#FBEBE6] text-base font-semibold hover:bg-orange-700 transition-colors duration-200 flex flex-row gap-2.5 items-center justify-center cursor-pointer text-[14px] md:text-[16px]">
                                    {getDownloadButtonText(business?.category)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showDownloadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-70" onClick={() => setShowDownloadModal(false)} />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 z-60">
                        <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                        <p className="text-gray-600 mb-4">Our mobile app is not yet available. We'll notify you when it launches.</p>
                        <div className="flex justify-end">
                            <button onClick={() => setShowDownloadModal(false)} className="px-4 py-2 text-white bg-[#DB3A06] rounded hover:bg-red-600 cursor-pointer">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


