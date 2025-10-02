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


  return (
      <>
        {/* Right Column (Contact & Hours) */}
        <div className="lg:w-1/3">
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

                <hr className="border-t border-gray-200 my-4" />

                {/* Location and Hours */}
                <h4 className="text-[15px] font-normal text-gray-800 mb-4">Location and Hours</h4>
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
                    <button className="w-full p-3 md:p-5 rounded-[10px] bg-[#DB3A06] text-[#FBEBE6] text-base font-semibold hover:bg-orange-700 transition-colors duration-200 flex flex-row gap-2.5 items-center justify-center cursor-pointer text-[14px] md:text-[16px]">
                        Download App to Book Service
                    </button>
                </div>
            </div>
        </div>
      </>
  )
}

export default ServicesRightSide