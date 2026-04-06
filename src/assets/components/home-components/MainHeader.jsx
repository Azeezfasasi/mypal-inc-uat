import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ClaimYourBusiness from './ClaimYourBusiness';
// import mypallogo from '../../images/mypallogo.svg'
import mypallogo from '../../images/mypallogo.svg'

// Using inline SVG for the chevron-down icon
const ChevronDownIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);

// Inline SVG for the chevron-right icon
const ChevronRightIcon = ({ className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);


// Updated categories data with a 'path' for each item
const categories = [
    { name: 'Accommodation', path: '/category/accommodation', subCategories: [
        { name: 'Short-lets & Beach Houses', path: '/accommodation/short-lethomes&beachhouses' },
        { name: 'Beaches Resorts Accommodation', path: '/accommodation/beachresortaccommodation' },
        { name: 'Hotel Experience', path: '/accommodation/hotelexperience' }
    ]},
    { name: 'Beauty & Health', path: '/category/beauty-health', subCategories: [
        { name: 'Spa & Skin Care', path: '/beautyhealth/spa&skincare' },
        { name: 'Nail & Hair Care', path: '/beautyhealth/nail&haircare' },
        { name: 'Fitness & Gym', path: '/beautyhealth/fitness&gym' }
    ] },
    { name: 'Event ticketing', path: '/category/event-ticketing', subCategories: [
        { name: 'Concerts & Shows', path: '/restaurant/concerts&shows' },
        { name: 'Private Cinema', path: '/restaurant/privatecinemas' },
        { name: 'Festivals & Corporate Promotions', path: '/restaurant/festivals&corporatepromotions' }
    ]},
    { name: 'Restaurant', path: '/category/restaurants', subCategories: [
        { name: 'Fine Dining', path: '/restaurant/finedining' },
        { name: 'Buffet Services', path: '/restaurant/buffetservices' },
        { name: 'Iconic Delicacies', path: '/restaurant/iconicdelicacies' }        
    ]},
    { name: 'Outdoorsy', path: '/category/outdoor-activities', subCategories: [
        { name: 'Beaches & Resorts', path: '/outdooractivities/beaches&resorts' },
        { name: 'Boat & Yacht Cruises', path: '/outdooractivities/boat&yachtcruises' },
        { name: 'Parks & Recreation', path: '/outdooractivities/parks&recreation' }
    ]},
    { name: 'Night Life', path: '/category/nightlife', subCategories: [
        { name: 'Luxury Night', path: '/nightlife/luxurynightlife' },
        { name: 'Food & Drinks', path: '/nightlife/food&drinks' },
        { name: 'Bars & Lounges', path: '/nightlife/bars&lounges' },
        { name: 'Clubbing & Parties', path: '/nightlife/clubbing&parties' },
        { name: 'Happening This Month', path: '/nightlife/happeningthismonth' },
        { name: 'Event Night', path: '/nightlife/eventsnights' }
    ] },
    { name: 'Mobility', path: '/category/mobility', subCategories: [
        { name: 'In-City Rides', path: '/mobility/in-cityrides' },
        { name: 'Luxury on Demand', path: '/mobility/luxuryondemand' },
        { name: 'Household Logistics', path: '/mobility/householdlogistics' }
    ] },   
];

// MainHeader component - Removed default export
export default function MainHeader() {
    // State for the desktop dropdown menu
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    
    // State for the mobile menu panel
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for the nested mobile category submenu
    const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

    // state to control the mobile category list independently
    const [isMobileCategoryListOpen, setIsMobileCategoryListOpen] = useState(false);

    // modal state for Download App (coming soon)
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    const dropdownRef = useRef(null);
    // For Business dropdown (desktop)
    const forBusinessRef = useRef(null);
    const [isForBusinessOpen, setIsForBusinessOpen] = useState(false);
    // Mobile "For Business" submenu state
    const [isMobileForBusinessOpen, setIsMobileForBusinessOpen] = useState(false);
    const [activeLink, setActiveLink] = useState('');
    // Claim modal state
    const [showClaimModal, setShowClaimModal] = useState(false);

    useEffect(() => {
        // Set the active link based on the current URL path
        const path = window.location.pathname || '/';
        if (path === '/') setActiveLink('Home');
        else if (path.startsWith('/forbusiness')) setActiveLink('For Business');
        else setActiveLink('');
    }, []);

    // close modal on Escape
    useEffect(() => {
      const onKey = (e) => { if (e.key === 'Escape') setShowDownloadModal(false); };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }, []);

    // This effect handles closing the desktop dropdowns when a click occurs outside of them
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
            if (forBusinessRef.current && !forBusinessRef.current.contains(event.target)) {
                setIsForBusinessOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, forBusinessRef]);


    const toggleCategoryDropdown = () => {
        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
        if (isCategoryDropdownOpen) {
            setActiveCategory(categories[0]);
        }
    };
    
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Reset the mobile category state when the main menu closes
        if (isMobileMenuOpen) {
            setMobileActiveCategory(null);
            // FIX: Also reset the mobile category list state when the main menu closes
            setIsMobileCategoryListOpen(false);
        }
    };

    // Helper function to handle mobile category clicks
    const handleMobileCategoryClick = (category) => {
        if (mobileActiveCategory?.name === category.name) {
            setMobileActiveCategory(null); // Collapse if already open
        } else {
            setMobileActiveCategory(category); // Expand the new category
        }
    };

    return (
        <div className="bg-transparent font-sans antialiased relative z-50 bebas-font">
            {/* Header Section */}
            <header className="bg-transparent px-2 md:px-6 py-4">
                <div className="w-[95%] mx-auto flex justify-between items-center">
                    {/* Logo and Mobile Menu Button */}
                    <div className="w-full lg:w-fit flex items-center justify-between space-x-4">
                        <Link to="/" className="flex items-center space-x-2">
                             {/* Replace with your logo component or image */}
                             <img src={mypallogo} alt="MyPal Logo" className='w-[100px] h-[100px] rounded-[20px]' />
                        </Link>
                        
                        {/* Mobile Menu Button */}
                        <button onClick={toggleMobileMenu} className="lg:hidden p-2 rounded-lg text-white focus:outline-none">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            </svg>
                        </button>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex justify-center items-center space-x-8 backdrop-blur-[8.7px] bg-[rgba(255,255,255,0.34)] rounded-[50px] border border-solid border-[rgba(255,255,255,0.41)] h-[72px] px-1">
                        {/* Home Link */}
                        <Link
                            to="/"
                            onClick={() => setActiveLink('Home')}
                            className={`flex items-center justify-center pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] gap-[12.61px] text-left text-[18.92px] font-medium relative transition-colors duration-300 cursor-pointer ${activeLink === 'Home' ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                        >
                            Home
                        </Link>

                        {/* Category Dropdown (Desktop) */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleCategoryDropdown}
                                className={`flex items-center justify-center space-x-2 pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] text-left text-[18.92px] font-medium relative transition-colors duration-300 cursor-pointer ${isCategoryDropdownOpen ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                            >
                                <span>Category</span>
                                <ChevronDownIcon className={`w-4 h-4 transform transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu (Desktop) */}
                            {isCategoryDropdownOpen && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 p-4 w-[65rem] bg-transparent shadow-2xl rounded-3xl flex flex-row gap-4 animate-fadeIn z-50">
                                    {/* Left Column: Main Categories */}
                                    <div className="flex flex-col space-y-2 bg-white rounded-xl shadow-lg w-[225px] h-fit py-2">
                                        {categories.map((category) => (
                                            <Link
                                                to={category.path}
                                                key={category.name}
                                                onMouseEnter={() => setActiveCategory(category)}
                                                onClick={() => setIsCategoryDropdownOpen(false)}
                                                className={`flex justify-between items-center px-4 py-2 rounded-lg transition-colors duration-200 ${activeCategory.name === category.name ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                                            >
                                                <span>{category.name}</span>
                                                {category.subCategories && <ChevronRightIcon className="w-4 h-4 text-gray-400" />}
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Right Column: Sub-categories */}
                                    <div className="h-fit flex-1 bg-white rounded-xl shadow-lg p-4 grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                                        {activeCategory && activeCategory.subCategories && activeCategory.subCategories.map((sub, index) => (
                                            <Link to={sub.path} key={index} onClick={() => setIsCategoryDropdownOpen(false)} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-center">
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* For Business Dropdown (Desktop) */}
                        <div className="relative" ref={forBusinessRef}>
                            <button
                                onClick={() => { setIsForBusinessOpen(!isForBusinessOpen); setActiveLink('For Business'); }}
                                className={`flex items-center justify-start pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] text-left text-lg font-medium relative transition-colors duration-300 cursor-pointer ${isForBusinessOpen ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                            >
                                <span>For Business</span>
                                <ChevronDownIcon className={`w-4 h-4 ml-2 transform transition-transform duration-300 ${isForBusinessOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isForBusinessOpen && (
                                <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-lg p-2 z-50 bebas-font">
                                    <Link to='/claim-business' onClick={() => setIsForBusinessOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Claim Your Business</Link>
                                    <a href='https://business.mypal-inc.com/login' target='_blank' rel="noopener noreferrer" onClick={() => setIsForBusinessOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Log in to Business Account</a>
                                    <Link to="/forbusiness" onClick={() => setIsForBusinessOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded">Explore for Business</Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="hidden lg:flex items-center space-x-4">
                        {/* Link to claim your business Button */}
                        {/* <Link to="/claim-business" className="hidden lg:block px-6 py-2 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#DB3A06] cursor-pointer">
                            List your business
                        </Link> */}

                        {/* Download App Button */}
                        <button onClick={() => setShowDownloadModal(true)} className="hidden lg:block px-6 py-2 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#DB3A06] cursor-pointer">
                            Download App
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu (outside the header to use fixed positioning) */}
            {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
                {/* Background Overlay */}
                <div
                className="absolute inset-0 bg-transparent"
                onClick={toggleMobileMenu}
                ></div>

                {/* Sliding Menu Panel */}
                <div className="absolute top-0 right-0 w-4/5 max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-500 ease-in-out animate-slideIn flex flex-col overflow-y-auto">
                {/* Close Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="absolute top-5 right-5 text-[#DB3A06] hover:text-red-500 transition"
                >
                    <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                    ></path>
                    </svg>
                </button>

                {/* Menu Items */}
                <div className="mt-20 px-6 flex flex-col space-y-6">
                    <Link
                    to="/"
                    onClick={toggleMobileMenu}
                    className="text-2xl font-medium text-gray-800 hover:text-[#DB3A06] transition-colors"
                    >
                    Home
                    </Link>

                    {/* Category Dropdown for Mobile */}
                    <div className="w-full">
                        <button
                            // FIX: Use the new state and toggle function for the mobile category list
                            onClick={() => setIsMobileCategoryListOpen(!isMobileCategoryListOpen)}
                            className="w-full flex justify-between items-center text-2xl font-medium text-gray-800 hover:text-[#DB3A06] transition-colors"
                        >
                            Category
                            <ChevronDownIcon
                                // FIX: Use the new state to control the icon's rotation
                                className={`w-6 h-6 ml-2 transform transition-transform duration-300 ${
                                    isMobileCategoryListOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>

                        {/* FIX: Conditional rendering based on the new state */}
                        {isMobileCategoryListOpen && (
                            <div className="mt-4 flex flex-col space-y-4 pl-0">
                                {categories.map((category) => (
                                    <div key={category.name}>
                                        {/* Main category link/button */}
                                        {category.subCategories ? (
                                            <button
                                                onClick={() => handleMobileCategoryClick(category)}
                                                className="w-full flex justify-between items-center text-lg font-normal text-gray-600 hover:text-gray-900 transition-colors focus:outline-none"
                                            >
                                                {category.name}
                                                <ChevronDownIcon
                                                    className={`w-4 h-4 transform transition-transform duration-300 ${
                                                        mobileActiveCategory?.name === category.name ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </button>
                                        ) : (
                                            <Link
                                                to={category.path}
                                                onClick={toggleMobileMenu}
                                                className="block text-lg font-normal text-gray-600 hover:text-gray-900 transition-colors"
                                            >
                                                {category.name}
                                            </Link>
                                        )}

                                        {/* Subcategories */}
                                        {mobileActiveCategory?.name === category.name &&
                                            category.subCategories && (
                                            <div className="mt-2 ml-4 flex flex-col space-y-2 text-sm text-gray-500">
                                                {category.subCategories.map((sub, index) => (
                                                    <Link
                                                        to={sub.path}
                                                        key={index}
                                                        onClick={toggleMobileMenu}
                                                        className="hover:text-gray-800 transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    
                    <div>
                        <button
                        onClick={() => setIsMobileForBusinessOpen(!isMobileForBusinessOpen)}
                        className="w-full text-left text-2xl font-medium text-gray-800 hover:text-[#DB3A06] transition-colors flex items-center justify-between"
                        >
                        <span>For Business</span>
                        <ChevronDownIcon className={`w-6 h-6 ml-2 transform transition-transform duration-300 ${isMobileForBusinessOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMobileForBusinessOpen && (
                            <div className="mt-3 ml-4 flex flex-col space-y-2 text-base text-gray-700">
                                <Link to="/claim-business" className="hover:text-gray-800">Claim your business</Link>
                                <a href='https://business.mypal-inc.com/login' target='_blank' onClick={() => { toggleMobileMenu(); }} className="hover:text-gray-800">Log in to Business Account</a>
                                <Link to="/forbusiness" onClick={() => { toggleMobileMenu(); }} className="hover:text-gray-800">Explore for Business</Link>
                            </div>
                        )}
                    </div>

                    <button
                    onClick={() => { toggleMobileMenu(); setShowDownloadModal(true); }}
                    className="mt-6 px-6 py-3 bg-[#DB3A06] text-white font-semibold rounded-full hover:bg-orange-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-orange-700"
                    >
                    Download App
                    </button>
                </div>
                </div>
            </div>
            )}
            {/* Coming Soon Modal for Download App */}
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
            {/* Claim Business Modal */}
            {showClaimModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-70" onClick={() => setShowClaimModal(false)} />
                    <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6 z-60 mx-4">
                        <button onClick={() => setShowClaimModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">✕</button>
                        <ClaimYourBusiness onClose={() => setShowClaimModal(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}