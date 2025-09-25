import React from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../../images/star.svg'
import img1 from '../../../images/img1.svg'
import img2 from '../../../images/img2.svg'
import img3 from '../../../images/img3.svg'
import img4 from '../../../images/img4.svg'
import img5 from '../../../images/img5.svg'
import img6 from '../../../images/img6.svg'
import img7 from '../../../images/img7.svg'
import img8 from '../../../images/img8.svg'
import { Link } from 'react-router-dom';

// Reusable card component for each experience
const ExperienceCard = ({ imageSrc, title, description, rating, reviews, location }) => {
    return (
        <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
            {/* Image section */}
            <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                <Link to="/services/servicedetails">
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Content section */}
            <div className="p-4 sm:p-6">
                <Link to="/services/servicedetails" className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
                <p className="text-[15px] text-gray-500 mb-2">{description}</p>
                
                {/* Rating and location */}
                <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
                    <div className='flex flex-row justify-start items-center'>
                        <img src={star} alt="star" />
                        <span className="font-semibold text-[14.576732635498047px] text-gray-700 mr-0">{rating}</span>
                        <span className="text-[14.576732635498047px] mr-0">({reviews})</span>
                    </div>
                    <div className='flex flex-row justify-start items-center'>
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        <span className='text-[14.576732635498047px]'>{location}</span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link to="/services/servicedetails" className="flex justify-center">
                    <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white der-orange-600 text-[#000000] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-[14.576732635498047px] font-normal cursor-pointer">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

// Main component that uses the card
export default function FineDiningLists() {
    const experiences = [
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img1,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img2,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img3,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img4,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img5,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img6,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img7,
        },
        {
            title: 'The Golden Terrace',
            description: 'Award winning wellness restaurant',
            rating: 4.5,
            reviews: 137,
            location: 'Downtown Hills',
            imageSrc: img8,
        },
    ];

    return (
        <div className="bg-gray-50 py-0 md:py-0 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Grid of experience cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                    {experiences.map((experience, index) => (
                        <ExperienceCard
                            key={index}
                            {...experience}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
