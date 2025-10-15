import React from 'react';
import x from '../../images/x.svg'
import fb from '../../images/fb.svg'
import indeed from '../../images/indeed.svg'
import instagram from '../../images/instagram.svg'
import location from '../../images/location.svg'
import sms from '../../images/sms.svg'
import people from '../../images/people.svg'
import mypallogo from '../../images/mypallogo.svg'
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";

const FooterSection = () => {
    return (
        <div className="bg-[#12416b] text-white font-sans antialiased p-8 md:p-12 lg:p-16 rounded-t-3xl md:rounded-t-[4rem]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                {/* Column 1: MyPal and Description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">MyPal</h3>
                    <p className="text-[#fbfbfb] font-['AvenirNextRoundedStd-Bold',_sans-serif] text-base mb-6 max-w-xs">
                        Effortlessly discover and explore the best experiences your city has to offer.
                    </p>
                    <img src={mypallogo} alt="MyPal Logo" className='w-[100px] h-[100px] rounded-[20px]' />
                </div>

                {/* Column 2: Discover */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">Discover</div>
                    <ul className="space-y-2 text-[#fbfbfb] text-base font-thin">
                        <li><Link to="/" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Accessibility Statement</Link></li>
                        <li><Link to="/cookie-policy" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Cookies Policy</Link></li>
                        <li><Link to="/copyright-notice" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Copyright Notice</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">GDPR and Privacy policy</Link></li>
                        <li><Link to="/terms-and-conditions" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Terms and Conditions</Link></li>
                    </ul>
                </div>

                {/* Column 4: Connect with us */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">Connect with us</h3>
                    
                    {/* Social icons */}
                    <div className="flex items-center space-x-4 mb-4">
                        <a href="https://x.com/mypaldeals" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"><img src={x} alt="twitter X" /></a>
                        <a href="https://www.facebook.com" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"><img src={fb} alt="facebook" /></a>
                        <a href="https://www.linkedin.com/company/mypal-inc/" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"> <img src={indeed} alt="linkedin" /></a>
                        <a href="https://www.instagram.com/mypaldeals/" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"> <img src={instagram} alt="instagram" /></a>
                    </div>
                    
                    {/* Address */}
                    <div className="flex items-start space-x-2 text-sm text-gray-300 mb-3">
                        <img src={location} alt="" className='mr-[0px] md:mr-2' />
                        <p className='text-[#ffffff] text-base font-normal'>18B Zainab Street, Medina, Gbagada, Lagos</p>
                    </div>

                    {/*Phone */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3 text-left">
                        <FaWhatsapp className="w-6 h-6 text-white" />
                        <a href="https://wa.me/2349055557535" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 text-[#ffffff] font-['Poppins-Regular',_sans-serif] text-base font-normal relative">
                        09055557535</a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
                        <img src={sms} alt="" />
                        <a href="mailto:hello@mypal-inc.com" className="hover:text-white transition-colors duration-200 text-[#ffffff] font-['Poppins-Regular',_sans-serif] text-base font-normal relative">hello@mypal-inc.com</a>
                    </div>

                    {/* Contact Us button with avatars */}
                    <button className="flex items-center bg-white text-gray-800 rounded-full py-2 px-2 transition-transform duration-300 hover:scale-105">
                        <span className="font-semibold text-lg mr-3">Contact Us</span>
                        <div className="flex -space-x-2">
                            <img src={people} alt="" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-right  text-[rgba(255,255,255,0.48)] font-['Poppins-Medium',_sans-serif] text-xl font-medium relative">
                © GlobalNxt 2025. All rights reserved.
            </div>
        </div>
    );
};

export default FooterSection;
