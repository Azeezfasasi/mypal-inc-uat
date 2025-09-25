import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import mypallogo from '../../../images/mypallogo.svg'


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
    { name: 'Mobility', path: '/category/mobility', subCategories: [
        { name: 'Luxury Rides', path: '/mobility/luxuryrides' },
        { name: 'Ride Hailing Taxi', path: '/mobility/incityrides' },
        { name: 'Logistics & Delivery', path: '/mobility/householdlogistics' }
    ] },
    { name: 'Night Life', path: '/category/nightlife', subCategories: [
        { name: 'Activities', path: '/' },
        { name: 'Luxury Night', path: '/' },
        { name: 'Food & Drinks', path: '/' },
        { name: 'Bars & Lounges', path: '/' },
        { name: 'Clubbing & Parties', path: '/' },
        { name: 'Happening This Month', path: '/' }
    ] },
    { name: 'Restaurant', path: '/category/restaurant', subCategories: [
        { name: 'Chinese', path: '/restaurant/finedining' },
        { name: 'Indian', path: '/restaurant/finedining' },
        { name: 'Asian', path: '/restaurant/finedining' },
        { name: 'Greek', path: '/restaurant/finedining' },
        { name: 'Continental', path: '/restaurant/finedining' },
        { name: 'Arabian', path: '/restaurant/finedining' },
        { name: 'Mexican', path: '/restaurant/finedining' },
        { name: 'Brazilian', path: '/restaurant/finedining' },
        { name: 'Buffet Offering', path: '/restaurant/buffetservices' },
        { name: 'African Delicacies', path: '/restaurant/localdelicacies' },
        { name: 'Takeout', path: '/restaurant/finedining' },
        { name: 'Kids Friendly', path: '/restaurant/finedining' }
        
    ]},
    { name: 'Event ticketing', path: '/', subCategories: [
        { name: 'Sport Events', path: '/' },
        { name: 'Concerts & Shows', path: '/' },
        { name: 'Theatre and Cinema', path: '/' },
        { name: 'Festivals & Carnivals', path: '/' },
        { name: 'Conferences & Seminars', path: '/' }
    ]},
    { name: 'Beauty & Health', path: '/category/BeautyHealth', subCategories: [
        { name: 'Wellness & Spa’s', path: '/' },
        { name: 'Fitness & Gym', path: '/' },
        { name: 'Pharmacies', path: '/' }
    ] },
    { name: 'Accommodation', path: '/category/accommodation', subCategories: [
        { name: 'Short-lets & Beach Houses', path: '/' },
        { name: 'Beaches & Resorts', path: '/' },
        { name: 'Hotel Experience', path: '/' }
    ]},
    { name: 'Outdoor Activities', path: '/category/outdooractivities', subCategories: [
        { name: 'Beaches and Resort', path: '/outdooractivities/beachesresorts' },
        { name: 'Cruises (Boat and Yacht)', path: '/outdooractivities/boatsyatch' },
        { name: 'Parks and Recreation', path: '/outdooractivities/parksrecreation' }
    ]},
];

// MainHeader component - Removed default export
export default function RestaurantHeader() {
    // State for the desktop dropdown menu
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    
    // State for the mobile menu panel
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // State for the nested mobile category submenu
    const [mobileActiveCategory, setMobileActiveCategory] = useState(null);

    // state to control the mobile category list independently
    const [isMobileCategoryListOpen, setIsMobileCategoryListOpen] = useState(false);

    const dropdownRef = useRef(null);
    // const location = useLocation();
    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        // Set the active link based on the current URL path
        if (location.pathname === '/') {
            setActiveLink('Home');
        } else if (location.pathname.startsWith('/forbusiness')) {
            setActiveLink('For Business');
        } else {
            setActiveLink('');
        }
    }, [location.pathname]);

    // This effect handles closing the desktop dropdown when a click occurs outside of it
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsCategoryDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


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
        <div className="bg-transparent font-sans antialiased relative z-50">
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
                    <nav className="hidden lg:flex justify-center items-center space-x-8 h-[72px] px-1">
                        {/* Home Link */}
                        <Link
                            to="/"
                            onClick={() => setActiveLink('Home')}
                            className={`flex items-center justify-center pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] gap-[12.61px] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[18.92px] font-medium relative transition-colors duration-300 cursor-pointer ${activeLink === 'Home' ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                        >
                            Home
                        </Link>

                        {/* Category Dropdown (Desktop) */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={toggleCategoryDropdown}
                                className={`flex items-center justify-center space-x-2 pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[18.92px] font-medium relative transition-colors duration-300 cursor-pointer ${isCategoryDropdownOpen ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                            >
                                <span>Category</span>
                                <ChevronDownIcon className={`w-4 h-4 transform transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu (Desktop) */}
                            {isCategoryDropdownOpen && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 p-4 w-[60rem] bg-transparent shadow-2xl rounded-3xl flex flex-row gap-4 animate-fadeIn z-50">
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
                                            <Link to={sub.path} key={index} onClick={() => setIsCategoryDropdownOpen(false)} className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* For Business Link */}
                        <Link
                            to="/forbusiness"
                            onClick={() => setActiveLink('For Business')}
                            className={`flex items-center justify-start pt-[18.92px] pr-[25.23px] pb-[18.92px] pl-[25.23px] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-lg font-medium relative transition-colors duration-300 cursor-pointer ${activeLink === 'For Business' ? 'bg-white text-black rounded-[50.45px]' : 'text-white'}`}
                        >
                            For Business
                        </Link>
                    </nav>

                    {/*CTA Button */}
                    <div className="hidden lg:flex flex-row gap-[18px] items-center justify-start relative">
                        <a href="https://business.mypal-inc.com/login" target='_blank' className="text-[#ffffff] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-lg font-medium relative flex items-center justify-start">
                            Login
                        </a>
                        <a href="https://business.mypal-inc.com/signup" target='_blank' className="bg-[#DB3A06] rounded-[40px] p-5 flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                            <div className="text-[#FBEBE6] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-lg font-medium relative flex items-center justify-start">
                            Sign Up
                            </div>
                        </a>
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
                    className="text-2xl font-semibold text-gray-800 hover:text-[#DB3A06] transition-colors"
                    >
                    Home
                    </Link>

                    {/* Category Dropdown for Mobile */}
                    <div className="w-full">
                        <button
                            // FIX: Use the new state and toggle function for the mobile category list
                            onClick={() => setIsMobileCategoryListOpen(!isMobileCategoryListOpen)}
                            className="w-full flex justify-between items-center text-2xl font-semibold text-gray-800 hover:text-[#DB3A06] transition-colors"
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
                    
                    <Link
                    to="/forbusiness"
                    onClick={toggleMobileMenu}
                    className="text-2xl font-semibold text-gray-800 hover:text-[#DB3A06] transition-colors"
                    >
                    For Business
                    </Link>

                    {/*CTA Button */}
                    <div className="flex flex-col gap-[18px] items-center justify-center relative mt-6">
                        <a href="https://business.mypal-inc.com/login" target='_blank' className="text-[#4D1402] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-lg font-medium relative flex items-center justify-start">
                            Login
                        </a>
                        <a href="https://business.mypal-inc.com/signup" target='_blank' className="bg-[#DB3A06] rounded-[40px] px-10 py-5 flex flex-row gap-2.5 items-center justify-center shrink-0 relative">
                            <div className="text-[#FBEBE6] text-left font-['AvenirNextRoundedStd-Medium',_sans-serif] text-lg font-medium relative flex items-center justify-start">
                            Sign Up
                            </div>
                        </a>
                    </div>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}

