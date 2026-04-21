import React, { useState, useEffect } from 'react';
import { Heart, Share2, MapPin, Phone, Star } from 'lucide-react';
// import margicstar from '../assets/images/margicstar.svg';
import servicelocation from '../assets/images/servicelocation.svg';
import googleplay from '../assets/images/googleplay.png';
import appstore from '../assets/images/appstore.png';
import ServicesReview from './ServicesReview';
import ServicesRightSide from './ServicesRightSide';
import ShareButton from '../assets/components/services-components/ShareButton';
import ServiceAttractions from './ServiceAttractions';

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
    // const apiServices = Array.isArray(business?.fine_dining_menus) && business.fine_dining_menus.length > 0
    //     ? business.fine_dining_menus.map(menu => menu.name)
    //     : null;

    return (
        <div className="w-[95%] bg-gray-50 py-0 md:py-0 font-sans antialiased mx-auto">
            <div className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="lg:w-2/3">
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <button onClick={() => setShowDownloadModal(true)} className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-5 rounded-[10px] bg-[#DB3A06] text-white font-medium shadow-md hover:bg-orange-700 transition-colors duration-200 gap-2.5 cursor-pointer text-[14px] md:text-[16px] mont-normal-font">
                                {getDownloadButtonText(business?.category)}
                            </button>
                            <div className='flex flex-row items-center space-x-3'>
                                <ShareButton />
                            </div>
                        </div>

                        <div className="border-solid border-gray-300 border-t border-r-[0] border-b-[0] border-l-[0] h-0 relative mb-4" style={{ marginTop: '-1px', transformOrigin: '0 0', transform: 'rotate(0deg) scale(1, 1)'}}
                        ></div>

                        {/* Service Offered Section */}
                        {/* <div className="bg-white rounded-[10px] p-6 md:p-8 shadow-xl border border-solid border-gray-300 mb-8">
                            <h3 className="text-xl md:text-2xl text-[#000000] mb-6 bebas-sub-title-font">
                                Service Offered
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {apiServices && apiServices.length > 0 ? (
                                    apiServices.map((service, index) => (
                                        <div key={index} className="flex items-center space-x-2 text-gray-700">
                                            <img src={margicstar} alt="star" />
                                            <span className="text-[#000000] text-[14px] md:text-base font-normal mont-normal-font">{service}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500 mont-normal-font">No services offered information available.</p>
                                )}
                            </div>
                        </div> */}

                        {/* Services  Attractions */}
                        <div>
                            <ServiceAttractions business={business} />
                        </div>
                        <div className='block md:hidden mb-6'>
                            <ServicesRightSide business={business} />
                        </div>
                        <ServicesReview 
                            reviews={business?.reviews?.internal?.reviews}
                            totalReviews={business?.reviews?.internal?.total_reviews}
                            averageRating={business?.reviews?.internal?.average_rating}
                            tripadvisorRating={business?.reviews?.tripadvisor}
                            googleRating={business?.reviews?.google}
                        />
                    </div>

                    {/* Right Column (Contact & Hours) */}
                    <div className="lg:w-1/3 hidden md:block">
                        <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300">
                            {/* Address */}
                            <div className="flex items-start space-x-3">
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

                            {/* <hr className="border-t border-gray-200 my-4" /> */}

                            {/* Location and Hours */}
                            <h4 className="text-[15px] font-medium text-gray-800 mb-4 bebas-font">Business Hours</h4>
                            <div className="space-y-3">
                                {operatingDays.map((item, index) => (
                                    <div key={index} className="flex justify-between text-[#000000] text-[14px] md:text-[15px] mont-normal-font">
                                        <span className="font-normal">{item.day}</span>
                                        <span>{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Download Button */}
                            <div className="mt-8">
                                <button onClick={() => setShowDownloadModal(true)} className="w-full p-3 md:p-5 rounded-[10px] bg-[#DB3A06] text-white text-base font-normal hover:bg-orange-700 transition-colors duration-200 flex flex-row gap-2.5 items-center justify-center cursor-pointer text-[14px] md:text-[16px] bebas-sub-title-font">
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
                    <div className="relative bg-white rounded-lg shadow-xl max-w-[95%] md:max-w-md w-full p-6 z-60">
                        <button onClick={() => setShowDownloadModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
                        <h2 className="text-2xl font-bold mb-4">Download MyPal App</h2>
                        <p className="mb-6 text-gray-700">Experience the best of MyPal on your mobile device. Our Android app is available now, and the iOS version is coming soon!</p>
                        {/* add Google plastore image */}
                        <a href="https://play.google.com/store/apps/details?id=com.mypal.hospitality" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-4 px-4 py-3 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 text-center">
                            <img src={googleplay} alt="Get it on Google Play" className="h-6 rounded-lg" />
                            Download for Android
                        </a>
                        <button disabled className="w-full mt-4 flex items-center justify-center gap-4 px-4 py-3 bg-gray-400 text-white font-semibold rounded-full cursor-not-allowed">
                            <img src={appstore} alt="Get it on App Store" className="h-6 rounded-lg" />
                            iOS Version Coming Soon
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}


