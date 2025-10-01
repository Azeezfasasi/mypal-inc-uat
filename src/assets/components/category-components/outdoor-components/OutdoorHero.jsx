import React, { useState } from 'react';
// import search from '../../../images/search.svg'
// import location from '../../../images/location.svg'
import mobilityheroimg from '../../../images/mobilityheroimg.svg'
import RestaurantHeader from '../restaurant-components/RestaurantHeader';
import SearchBusiness from '../../home-components/SearchBusiness';
import SearchResultsModal from '../../home-components/SearchResultsModal';

const heroImage = mobilityheroimg;

export default function OutdoorHero() {
    const [results, setResults] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
        <div className="relative w-full h-[850px] md:h-[676px]">
            <RestaurantHeader />
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center rounded-b-[20px]"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
            </div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
                {/* Text Content */}
                <div className="w-full md:w-[95%] flex flex-col gap-4 items-center justify-start relative mt-[-120px] md:mt-[-160px] mb-16">
                    <div className="bg-[rgba(255,255,255,0.34)] rounded-[50px] border-solid border-[rgba(255,255,255,0.41)] border shrink-0 w-[350px] md:w-[350px] h-[55px] md:h-[33px] relative flex justify-center items-center overflow-hidden" style={{ backdropFilter: "blur(8.7px)" }}>
                        <div className="text-[#ffffff] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-sm font-normal flex items-center justify-center px-2 md:px-0">
                        Outdoor Escapes - Breathe. Explore. Experience.
                        </div>
                    </div>
                    <div className="text-[#ffffff] text-center font-['DrukCyr-Medium',_sans-serif] text-[50px] md:text-[80px] font-bold relative self-stretch flex items-center justify-center">
                        OUTDOOR ACTIVITIES
                    </div>
                    <div className="w-full md:w-[70%] text-[#ffffff] text-center font-['AvenirNextRoundedStd-Medium',_sans-serif] text-[17px] md:text-xl font-medium relative self-stretch flex items-center justify-center mx-auto">
                        Reimagine leisure with curated outdoor experiences that let you soak in the sun, reconnect with nature, and enjoy unforgettable moments from sandy shores to serene cruises and vibrant parks..
                    </div>
                </div>


                {/* Search Bar Section */}
                <SearchBusiness onSearchResults={handleSearchResults} />
                {/* Modal for search results */}
                <SearchResultsModal open={modalOpen} onClose={handleCloseModal} results={results} />
            </div>
        </div>
    );
}

