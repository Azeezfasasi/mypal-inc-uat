import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import minuscircle from '../../images/minuscircle.svg'
import addcircle from '../../images/addcircle.svg'

const faqData = [
    {
        question: 'What is MyPal and how does it work?',
        answer: 'MyPal is a hospitality and lifestyle muilti-platform that connects businesses with customers through engaging digital experiences. You are able to explore deals, dining options, exclusive events, and lifestyle recommendations. Businesses are able to showcase their services with videos, images, and promotions, turning visibility into bookings. You are able to share your experiences through photos and videos, building authentic word-of-mouth. With MyPal, hospitality businesses gain a dynamic storefront and direct access to their audience.',
    },
    {
        question: 'How can Businesses Join MyPal?',
        answer: 'Businesses can easily join MyPal by <a href="https://business.mypal-inc.com/signup" target="_blank" rel="noopener noreferrer" class="text-[#db3a06] hover:underline">signing up here</a>. Upon approval, you are able to access your dashboard, showcase your services with descriptions, menus, images, and videos, and start connecting with customers right away.',
    },
    {
        question: 'What types of services can businesses offer on MyPal?',
        answer: 'On MyPal, you are able to showcase a wide range of services, including dining and event ticketing to outdoor activities, accommodation, beauty & health, nightlife, mobility and luxury rentals.',
    },
    {
        question: 'How do users make reservations and bookings on MyPal?',
        answer: 'You are able to surf MyPal’s mobile application by downloading from Playstore and Applestore. We have experiential services just for you! including snagging deals and many more… You are able to view details, choose dates, and book directly with secure in-app payments. Bookings come with instant confirmations, QR codes, or e-tickets. MyPal facilitates smooth communication, reminders, and post-visit experience sharing.',
    },
    {
        question: 'Are users able to share their experiences on MyPal?',
        answer: 'Yes, you are encouraged to share your experiences with your loved ones and community by uploading photos and videos of the venues and services you have enjoyed, creating a community-driven platform.',
    },
    {
        question: 'Is there a cost for Businesses to join MyPal',
        answer: 'No, joining MyPal is free for all businesses. The platform is designed to help businesses grow their customer base and visibility without any financial barriers.',
    },
    {
        question: 'How does MyPal ensure the quality of services listed on its platform?',
        answer: 'MyPal ensures service quality by verifying businesses during onboarding, reviewing their contents and services rendered, and enforcing service standards. Users provide feedback and ratings, while continuous monitoring helps maintain trust. Consistently poor performers risk review or removal from the platform.',
    },{
        question: 'What should I do if I encounter an issue with my reservations, orders, or bookings',
        answer: 'If you encounter an issue with your reservation, order, or booking, you can report it through the Help & Support section on MyPal. Our team will work with the business to ensure a fair resolution, which may include rescheduling, refunds, or alternative solutions.',
    },
];

export default function Faq() {
    // State to track which FAQ item is currently open
    const [openIndex, setOpenIndex] = useState(0);

    // Function to toggle the open/closed state of an FAQ item
    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-12 md:py-20 font-sans antialiased">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
                {/* Left Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[20%] lg:w-[30%] h-0 relative -mt-px rotate-180"
                    style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
                    borderImageSlice: 1,}}
                    ></div>

                    {/* Title */}
                    <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                        FAQ'S
                    </div>

                    {/* Right Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[20%] lg:w-[30%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
                    ></div>
                </div>

                {/* FAQ section */}
                <div className="space-y-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="w-full rounded-2xl p-0 sm:p-2 transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex justify-between items-center text-left focus:outline-none"
                            >
                                <div className="w-[80%] text-[#000000] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-2xl font-medium relative cursor-pointer" style={{letterSpacing: '-0.0506em'}}>
                                    {item.question}
                                </div>
                                {/* Icon for toggling */}
                                <div className="">
                                    {openIndex === index ? (
                                        <img src={minuscircle} alt="" className='cursor-pointer' />
                                    ) : (
                                        <img src={addcircle} alt="" className='cursor-pointer' />
                                    )}
                                </div>
                            </button>
                            {/* Answer content, conditionally rendered */}
                            {openIndex === index && (
                                <p className="mt-4 text-gray-600 animate-fadeIn w-[80%] text-left font-['Poppins-Regular',_sans-serif] text-lg font-normal" dangerouslySetInnerHTML={{ __html: item.answer }} />
                            )}
                            <div
                            className="border-solid border-[rgba(0,0,0,0.22)] border-t border-r-[0] border-b-[0] border-l-[0] self-stretch shrink-0 h-0 relative mt-[15px] md:mt-[20px]"
                            ></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
