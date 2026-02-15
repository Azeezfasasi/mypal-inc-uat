import React, { useState } from 'react';
import MainHeader from './MainHeader';
import heroimagedeem from '../../images/heroimagedeem.svg'
import SearchBusiness from './SearchBusiness';
import SearchResultsModal from './SearchResultsModal';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const heroImage = heroimagedeem;


export default function HeroSection() {
    const [results, setResults] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleSearchResults = (apiResponse) => {
        // If response has a 'data' property, use it; otherwise, use the response directly
        setResults(apiResponse.data ? apiResponse.data : apiResponse);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setResults(null);
    };

    return (
        <div className="relative w-full h-[800px] md:h-[800px]">
            <MainHeader />
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center rounded-b-[20px]"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black opacity-40 rounded-b-[20px]"></div>
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
                {/* Text Content */}
                <div className="w-full md:w-[95%] text-left mt-[-120px] md:mt-[-100px] mb-6 md:mb-8 flex flex-col items-start">
                    <h1 className="text-[30px] md:text-5xl lg:text-6xl leading-tight tracking-wide drop-shadow-lg text-left font-bold relative bebas-font">
                        Effortlessly <span className="text-[#DB3A06]">discover</span> real experiences on MyPal. Reserve, enjoy, and share <span className="text-[#DB3A06]">Unforgettable</span> moments.
                    </h1>
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            const targetId = 'featured-category';
                            // If already on home, try to scroll to element
                            if (location.pathname === '/' || location.pathname === '' || location.pathname === '/home') {
                                const el = document.getElementById(targetId);
                                if (el) {
                                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                } else {
                                    // retry a few times in case the element hasn't rendered yet
                                    let tries = 0;
                                    const id = setInterval(() => {
                                        tries += 1;
                                        const delayedEl = document.getElementById(targetId);
                                        if (delayedEl) {
                                            delayedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                            clearInterval(id);
                                        } else if (tries > 10) {
                                            clearInterval(id);
                                        }
                                    }, 100);
                                }
                            } else {
                                // navigate to home and instruct it to scroll after mount
                                navigate('/', { state: { scrollTo: 'featured-category' } });
                            }
                        }}
                        className="w-full md:w-[40%] lg:w-[22%] px-2 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-800 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer mt-8 text-center mont-normal-font"
                    >
                        Explore Featured Experience
                    </Link>
                </div>
                <SearchBusiness onSearchResults={handleSearchResults} />
                {/* Modal for search results */}
                <SearchResultsModal open={modalOpen} onClose={handleCloseModal} results={results} />
            </div>
        </div>
    );
}

