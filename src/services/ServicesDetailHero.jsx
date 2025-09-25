import React, { useState } from 'react';
import { X, Star, MapPin } from 'lucide-react';
import servicestar from '../assets/images/servicestar.svg'
import servicesheroimg from '../assets/images/servicesheroimg.svg'
import servicesimg1 from '../assets/images/servicesimg1.svg'
import servicesimg2 from '../assets/images/servicesimg2.svg'
import servicesimg3 from '../assets/images/servicesimg3.svg'
import servicesimg4 from '../assets/images/servicesimg4.svg'

// Data for the images
const allImages = [
    servicesheroimg,
    servicesimg1,
    servicesimg2,
    servicesimg3,
    servicesimg4,
    'https://placehold.co/600x400/4B5563/111827?text=Thumbnail+4',
    'https://placehold.co/600x400/E5E7EB/6B7280?text=Extra+Image+1',
];

export default function ServicesDetailHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainImage, setMainImage] = useState(allImages[0]);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleThumbnailClick = (image) => {
        setMainImage(image);
    };

    // Number of thumbnails to display before the "+X" button
    const thumbnailsToShow = 4;
    const displayedThumbnails = allImages.slice(1, thumbnailsToShow + 1);
    const remainingImagesCount = allImages.length - (thumbnailsToShow + 1);

    return (
        <div className="w-[95%] bg-white py-3 md:py-6 font-sans antialiased mx-auto">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Image Section */}
                <div className="relative w-full h-[434px] rounded-3xl overflow-hidden shadow-xl mb-6">
                    <img
                        src={mainImage}
                        alt="Main view of the venue"
                        className="w-full h-full object-cover"
                    />
                    {/* Overlay content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-8">
                        {/* Rating and Reviews */}
                        <div className="flex items-center space-x-2 text-white text-sm mb-2">
                            <img src={servicestar} alt="star" />
                            <img src={servicestar} alt="star" />
                            <img src={servicestar} alt="star" />
                            <img src={servicestar} alt="star" />
                            <span className="font-semibold text-[32px]">4.0</span>
                            <span className="text-gray-300 text-[32px]">(137)</span>
                        </div>
                        {/* Location */}
                        <div className="flex items-center space-x-2 text-white text-xl font-normal mb-2">
                            <MapPin className="w-5 h-5 text-white" />
                            <span>Downtown Hills</span>
                        </div>
                        {/* Opening Hours */}
                        <p className="text-white text-xl">
                            <span className='text-[#23EE7F]'>Open</span> 05:00am - 10:00pm
                        </p>
                    </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 md:gap-0">
                    {displayedThumbnails.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => handleThumbnailClick(image)}
                            className={`w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/5 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 border-2 ${
                                mainImage === image ? 'border-orange-500' : 'border-transparent'
                            }`}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="md:w-[324px] md:h-[130px] object-cover"
                            />
                        </button>
                    ))}
                    {remainingImagesCount > 0 && (
                        <button
                            onClick={openModal}
                            className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/6 relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
                        >
                            <img
                                src={allImages[thumbnailsToShow + 1]}
                                alt="More images"
                                className="w-full h-full object-cover filter brightness-50"
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                                +{remainingImagesCount}
                            </div>
                        </button>
                    )}
                </div>
            </div>

            {/* Image Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-5xl h-full bg-white rounded-xl shadow-lg overflow-y-auto">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-white z-50 bg-gray-900 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                            {allImages.map((image, index) => (
                                <div key={index} className="rounded-xl overflow-hidden shadow-md">
                                    <img
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
