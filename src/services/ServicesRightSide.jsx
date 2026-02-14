import React, {useEffect} from 'react'
// import servicephone from '../assets/images/servicephone.svg';
import servicelocation from '../assets/images/servicelocation.svg';

const businessHours = [
    { day: 'Monday', time: 'N/A' },
    { day: 'Tuesday', time: 'N/A' },
    { day: 'Wednesday', time: 'N/A' },
    { day: 'Thursday', time: 'N/A' },
    { day: 'Friday', time: 'N/A' },
];

function ServicesRightSide({ business }) {
    useEffect(() => {
        console.log("business.operatingDays:", business?.operatingDays);
    }, [business]);

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
                <div className="flex items-start space-x-3">
                    <img src={servicelocation} alt="location" className='mt-1' />
                    <p className="text-sm md:text-base bebas-font">
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
                            <span className="font-normal bebas-font">{item.day}</span>
                            <span className='bebas-font'>{item.time}</span>
                        </div>
                    ))}
                </div>

                {/* Download Button */}
                <div className="mt-8">
                    <button className="w-full p-3 md:p-5 rounded-[10px] bg-[#DB3A06] text-[#FBEBE6] text-base font-semibold hover:bg-orange-700 transition-colors duration-200 flex flex-row gap-2.5 items-center justify-center cursor-pointer text-[14px] md:text-[16px] bebas-font">
                        {getDownloadButtonText(business?.category)}
                    </button>
                </div>
            </div>
        </div>
      </>
  )
}

export default ServicesRightSide