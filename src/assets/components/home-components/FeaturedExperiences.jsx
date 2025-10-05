import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../images/star.svg'
import img1 from '../../images/img1.svg'
import img2 from '../../images/img2.svg'
import img3 from '../../images/img3.svg'
import img4 from '../../images/img4.svg'
import img5 from '../../images/img5.svg'
import img6 from '../../images/img6.svg'
import img7 from '../../images/img7.svg'
import img8 from '../../images/img8.svg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Commet } from "react-loading-indicators";

// module-scoped fallback images so the effect has no external dependencies
const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8];

// Reusable card component for each experience
const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => {
    return (
        <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
            {/* Image section */}
            <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
                <Link to={`/services/servicedetails/${id}`}>
                    <img
                        src={imageSrc}
                        alt={title}
                        className="w-full h-[200px] object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            </div>

            {/* Content section */}
            <div className="p-4 sm:p-6">
                <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
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
                        <span className='text-[14.576732635498047px]'>
                            {location?.length > 10 ? location.slice(0, 12) + "…" : location}
                        </span>
                    </div>
                </div>

                {/* View Details Button */}
                <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
                    <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white der-orange-600 text-[#000000] text-center font-['AvenirNextRoundedStd-Regular',_sans-serif] text-[14.576732635498047px] font-normal cursor-pointer">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
};

// Main component that uses the card
export default function FeaturedExperiences() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // helper: shuffle and return a copy
    function shuffleArray(arr) {
        const a = Array.isArray(arr) ? arr.slice() : [];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    useEffect(() => {
        let cancelled = false;

        async function loadFeatured() {
            setLoading(true);
            setError(null);
            try {
                const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
                const API_KEY = import.meta.env.VITE_API_KEY || '';
                const base = API_BASE.replace(/\/+$/g, '');

                // candidate endpoints to try (in order)
                const candidates = [
                    `${base}/businesses/all?page=1&limit=100`,
                    `${base}/businesses?page=1&limit=100`,
                    `${base}/businesses?limit=100`,
                    `${base}/businesses`,
                ];

                let payload = null;
                let lastErr = null;

                for (const endpoint of candidates) {
                    try {
                        const res = await axios.get(endpoint, { headers: { 'x-api-key': API_KEY } });
                        if (cancelled) return;
                        const p = res.data;
                        const arr = Array.isArray(p?.data) ? p.data : p?.data?.data ?? [];
                        // if we got an array (possibly empty), accept it
                        if (Array.isArray(arr)) {
                            payload = arr;
                            break;
                        }
                    } catch (err) {
                        lastErr = err;
                        // If server responded with the specific 400 message for 'all' treated as id, skip to next
                        const serverMsg = err.response?.data?.message || '';
                        const status = err.response?.status;
                        console.warn('Candidate endpoint failed', { endpoint, status, serverMsg });
                        // continue to next candidate
                        continue;
                    }
                }

                if (!payload) {
                    throw lastErr || new Error('No endpoint returned business list');
                }

                const all = payload;

                // pick 8 random unique businesses (or fewer if not available)
                const sample = shuffleArray(all).slice(0, Math.min(8, all.length));

                const mapped = sample.map((biz, idx) => ({
                    id: biz.id || `biz-${idx}`,
                    title: biz.business_name || biz.name || 'Untitled business',
                    description: biz.description || biz.short_description || '',
                    rating: biz.average_rating || biz.averageRating || (biz.reviews ? (biz.reviews.reduce((s, r) => s + (r.rating || 0), 0) / (biz.reviews.length || 1)) : 0),
                    reviews: biz.total_reviews || (biz.reviews ? biz.reviews.length : 0) || 0,
                    location: biz.address || biz.formatted_address || biz.city || '',
                    imageSrc: biz.image_url || fallbackImages[idx % fallbackImages.length],
                }));

                setExperiences(mapped);
            } catch (err) {
                console.error('Failed to load featured experiences', {
                    status: err.response?.status,
                    data: err.response?.data,
                    message: err.message,
                });
                if (!cancelled) setError(err.response?.data ?? err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadFeatured();
        return () => { cancelled = true; };
    }, []);

    return (
        <div className="bg-gray-50 py-0 md:py-0 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
                {/* Left Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
                    style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
                    borderImageSlice: 1,}}
                    ></div>

                    {/* Title */}
                    <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                        Featured Experiences
                    </div>

                    {/* Right Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
                    ></div>
                </div>

                {/* Grid of experience cards */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
                    </div>
                )}
                {error && (
                    <div className="py-8 text-center text-red-600">Error: {JSON.stringify(error)}</div>
                )}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
                        {experiences.map((experience) => (
                            <ExperienceCard key={experience.id} {...experience} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
