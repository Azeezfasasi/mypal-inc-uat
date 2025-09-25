import React from 'react';
import { Heart, Share2, MapPin, Phone, Star } from 'lucide-react';
import margicstar from '../assets/images/margicstar.svg';
import servicelocation from '../assets/images/servicelocation.svg';
import servicephone from '../assets/images/servicephone.svg';
import ServicesReview from './ServicesReview';
import ServicesRightSide from './ServicesRightSide';

const serviceFeatures = [
    'Michelin Star',
    'Valet Parking',
    'Serene Environment',
    'Private Dining',
    'Wine Cellar',
    'Efficient Workers',
    'City Views',
];

const businessHours = [
    { day: 'Monday', time: '10:00am - 12:00pm' },
    { day: 'Tuesday', time: '10:00am - 12:00pm' },
    { day: 'Wednesday', time: '10:00am - 12:00pm' },
    { day: 'Thursday', time: '10:00am - 12:00pm' },
    { day: 'Friday', time: '10:00am - 12:00pm' },
];

export default function ServiceDetailDescription() {
    return (
        <div className="w-[95%] bg-gray-50 py-0 md:py-0 font-sans antialiased mx-auto">
            <div className="w-[100%] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column (Main Content) */}
                    <div className="lg:w-2/3">
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
                            <button className="w-full sm:w-auto px-4 md:px-8 py-3 md:py-5 rounded-[10px] bg-[#DB3A06] text-white font-semibold shadow-md hover:bg-orange-700 transition-colors duration-200 gap-2.5 cursor-pointer text-[14px] md:text-[16px]">
                                Download App to Book Service
                            </button>
                            <div className='flex flex-row items-center space-x-3'>
                                <button className="p-5 rounded-[10px] border border-solid border-[#DB3A06] text-[#DB3A06] hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                <Heart className="w-5 h-5" />
                                </button>
                                <button className="p-5 rounded-[10px] border border-solid border-[#DB3A06] text-[#DB3A06] hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                                    <Share2 className="w-5 h-5" />
                                </button>
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
                                {serviceFeatures.map((service, index) => (
                                    <div key={index} className="flex items-center space-x-2 text-gray-700">
                                        <img src={margicstar} alt="star" />
                                        <span className="text-[#000000] text-[14px] md:text-base font-normal">{service}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='block md:hidden mb-6'>
                            <ServicesRightSide />
                        </div>
                        <ServicesReview />
                    </div>

                    {/* Right Column (Contact & Hours) */}
                    <div className="lg:w-1/3 hidden md:block">
                        <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300">
                            {/* Address */}
                            <div className="flex items-start space-x-3">
                                <img src={servicelocation} alt="location" className='mt-1' />
                                <p className="text-sm md:text-base">
                                    Downtown Hills, Opp. Sangotedo Area, Oketedi region391 Sutter St Ste 709 San Francisco, CA 94108
                                </p>
                            </div>

                            <hr className="border-t border-gray-200 my-4" />

                            {/* Phone Number */}
                            <div className="flex items-center space-x-3">
                                <img src={servicephone} alt="phone" />
                                <span className="text-sm md:text-base">+226 9749 9383</span>
                            </div>

                            <hr className="border-t border-gray-200 my-4" />

                            {/* Location and Hours */}
                            <h4 className="text-[15px] font-normal text-gray-800 mb-4">Location and Hours</h4>
                            <div className="space-y-3">
                                {businessHours.map((item, index) => (
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
                </div>
            </div>
        </div>
    );
}
