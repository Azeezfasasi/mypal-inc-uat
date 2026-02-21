import React, { useState } from 'react';
import finediningheroimg from '../../../images/finediningheroimg.svg'
import RestaurantHeader from './RestaurantHeader';
import SearchBusiness from '../../home-components/SearchBusiness';
import SearchResultsModal from '../../home-components/SearchResultsModal';

const heroImage = finediningheroimg;

export default function FineDiningHero() {
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
        <div className="relative w-full h-[800px] md:h-[676px]">
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
                    <div className="bg-[rgba(255,255,255,0.34)] rounded-[50px] border-solid border-[rgba(255,255,255,0.41)] border shrink-0 px-4 h-[55px] md:h-[33px] relative overflow-hidden flex justify-center items-center" style={{ backdropFilter: "blur(8.7px)" }}>
                        <div className="text-[#ffffff] text-center text-sm font-normal flex items-center justify-center px-2 md:px-0 bebas-font">
                        An experience beyond the meal.
                        </div>
                    </div>
                    <div className="text-[#ffffff] text-center text-[50px] md:text-[80px] font-bold relative self-stretch flex items-center justify-center bebas-font">
                        FINE DINING
                    </div>
                    <div className="w-full md:w-[70%] text-[#ffffff] text-center text-[17px] md:text-xl font-medium relative self-stretch flex items-center justify-center mx-auto mont-normal-font">
                        Dine in elegance at premium restaurants that combine world-class cuisine, exceptional service, and luxurious ambiance. Ideal for date nights, business dinners, or special celebrations — where every detail is crafted to perfection.
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

