import React, { useState } from 'react';
import MainHeader from './MainHeader';
import heroimagedeem from '../../images/heroimagedeem.svg'

import SearchBusiness from './SearchBusiness';
import SearchResultsModal from './SearchResultsModal';

const heroImage = heroimagedeem;


export default function HeroSection() {
    const [results, setResults] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const handleSearchResults = (data) => {
        setResults(data);
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
                <div className="w-full md:w-[95%] text-left mt-[-40px] md:mt-0 mb-16 flex flex-col items-start">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide drop-shadow-lg text-left font-['DrukCyr-Medium',_sans-serif] font-bold relative">
                        Effortlessly <span className="text-[#DB3A06]">discover</span>, reserve, book or order from our extensive list of <span className="text-[#DB3A06]">hospitality</span> services.
                    </h1>
                </div>
                <SearchBusiness onSearchResults={handleSearchResults} />
                {/* Modal for search results */}
                <SearchResultsModal open={modalOpen} onClose={handleCloseModal} results={results} />
            </div>
        </div>
    );
}

