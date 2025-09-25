import React from 'react';
import duoicon from '../../images/duoicon.svg'
import calendar from '../../images/calendar.svg'
import icondash from '../../images/icondash.svg'
import iconcalendar from '../../images/iconcalendar.svg'
import icondeal from '../../images/icondeal.svg'
import iconeye from '../../images/iconeye.svg'
import iconprofile from '../../images/iconprofile.svg'
import icondiscount from '../../images/icondiscount.svg'
import iconhouse from '../../images/iconhouse.svg'
import icontree from '../../images/icontree.svg'
import iconcar from '../../images/iconcar.svg'

const WhyMyPal = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 flex flex-col items-center mx-auto">
        {/* Section Title */}
        <div className="w-[90%] flex flex-row gap-[40px] items-center justify-start relative mb-8 mx-auto">
        {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[14%] h-0 relative -mt-px rotate-180"
            style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,}}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                Why MyPal for Business?
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[14%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
            ></div>
        </div>

        {/* Cards Section */}
      <div className="w-full flex flex-row flex-wrap gap-[31px] items-center justify-center mx-auto">
            {/* Box 1 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                        Dedicated Dashboard
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal w-[95%] relative">
                        We have got you covered, managing all your business offerings from the comfort of your portable devices. See realtime analytics and reviews and many more…
                        <br />
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={icondash}
                />
            </div>

            {/* Box 2 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start absolute w-[95%] left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                        Event Creation
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        (Create Hot and Latest events on MyPal for the eyes and ears of your customers)
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={iconcalendar}
                />
            </div>

            {/* Box 3 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={calendar}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                        Event Creation
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        (Create Hot and Latest events on MyPal for the eyes and ears of your customers)
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={icondeal}
                />
            </div>

            {/* Box 4 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                        Visibility
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        Free 1-month boost of service listing.
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={iconeye}
                />
            </div>

            {/* Box 5 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                        Customer Acquisition
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        Showcase your offerings to millions on MyPal.
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={iconprofile}
                />
            </div>

            {/* Box 6 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                       Promo Discount
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        (Create deals that supports your customers on MyPal)
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={icondiscount}
                />
            </div>

            {/* Box 7 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                       For Accomodation
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        Event promotion, Payments, Exclusive Event Management & AI Support
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={iconhouse}
                />
            </div>

            {/* Box 8 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                       For Resorts/Nightlife
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        Event promotion, Payments, Exclusive Event Management & AI Support
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={icontree}
                />
            </div>

            {/* Box 9 */}
            <div className="rounded-[10px] border-solid border-gray-300 border shrink-0 w-[90%] lg:w-[30%] h-[328px] relative overflow-hidden">
                <img
                className="w-[46px] h-[46px] absolute left-[18px] top-[30px] overflow-visible"
                style={{ aspectRatio: 1 }}
                src={duoicon}
                />
                <div className="flex flex-col gap-[17px] items-start justify-start w-[95%] absolute left-[18px] top-[158px]">
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[24px] md:text-[32px] font-medium relative self-stretch">
                       For Mobility
                    </div>
                    <div className="text-[#000000] text-left font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal relative">
                        Event promotion, Payments, Exclusive Event Management & AI Support
                    </div>
                </div>
                <img
                className="w-[131px] h-[131px] absolute right-[-14px] bottom-[-30px] overflow-visible"
                src={iconcar}
                />
            </div>
        </div>

    </div>
  );
};

export default WhyMyPal;
