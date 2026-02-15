import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import restaurant from '../../images/restaurant.svg';
import outdoor from '../../images/outdoor.svg';
import accomodation from '../../images/accomodation.svg';
import beauty from '../../images/beauty.svg';
import nightlife from '../../images/nightlife.svg';
import mobility from '../../images/mobility.svg';
import { Commet } from "react-loading-indicators";

// Helper to join base URL and path avoiding duplicate segments like /v1/v1
function joinBaseAndPath(base, path) {
    if (!base) return path;
    const cleanedBase = base.replace(/\/+$/g, '');
    let cleanedPath = path.startsWith('/') ? path : `/${path}`;
    // Avoid duplicate /v1 if base already contains it and path starts with /v1
    if (cleanedBase.includes('/v1') && cleanedPath.startsWith('/v1')) {
        cleanedPath = cleanedPath.replace(/^\/v1/, '');
    }
    return `${cleanedBase}${cleanedPath}`;
}

const ICON_MAP = {
    restaurants: restaurant,
    'outdoor-activities': outdoor,
    accommodation: accomodation,
    'beauty-health': beauty,
    nightlife: nightlife,
    mobility: mobility,
};

// Map backend icon names (like "chef-hat", "waves") to local svg assets
const BACKEND_ICON_MAP = {
    'chef-hat': restaurant,
    'waves': outdoor,
    'bed': accomodation,
    'sparkles': beauty,
    'moon': nightlife,
    'car': mobility,
    'ticket': restaurant,
};

export default function ExploreCategory() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
    const API_KEY = import.meta.env.VITE_API_KEY || '';
    const endpointPath = '/v1/categories/all';
    const endpoint = joinBaseAndPath(API_BASE, endpointPath);

    useEffect(() => {
        let cancelled = false;
        async function loadCategories() {
            setLoading(true);
            setError(null);
            try {
                const headers = {};
                // Ensure we only send the allowed header name. Some servers only allow 'x-api-key' in CORS.
                if (API_KEY) headers['x-api-key'] = API_KEY;

                const res = await axios.get(endpoint, { headers });
                if (cancelled) return;

                const data = Array.isArray(res.data) ? res.data : res.data?.data || [];

                const mapped = data.map(group => ({
                    id: group.id,
                    name: group.name,
                    description: `${group.total_businesses ?? 0}`,
                    // prefer (in order): explicit image URL from backend, mapped backend icon name,
                    // local slug-based icon, then final fallback
                    icon: group.image_url || BACKEND_ICON_MAP[group.icon] || ICON_MAP[group.slug] || restaurant,
                    link: `/category/${group.slug}`,
                }));

                setCategories(mapped);
            } catch (err) {
                console.error('Failed to load categories', err);
                if (!cancelled) setError(err.message || 'Failed to load categories');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadCategories();
        return () => { cancelled = true; };
    }, [endpoint, API_KEY]);

    return (
        <div className="bg-white py-12 md:py-24 font-sans antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bebas-font">
                {/* Section Title */}
                <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
                    {/* Left Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
                        style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
                    ></div>

                    {/* Title */}
                    <div className="text-[#000000] text-center md:text-left text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto bebas-font">
                        Explore By Category
                    </div>

                    {/* Right Gradient Line */}
                    <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
                    ></div>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
                    </div>
                )}

                {error && (
                    <div className="py-8 text-center text-red-600">Error: {error}</div>
                )}

                {/* Categories Grid */}
                {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id || index}
                                to={category.link}
                                className="text-center transition-transform duration-300 hover:scale-105 bg-[#ffffff] rounded-[20px] border-solid border-gray-300 border pt-10 pr-5 pb-10 pl-5 flex flex-col gap-1 items-center justify-center shrink-0 relative overflow-hidden bebas-font"
                            >
                                {/* Icon */}
                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#FAE1DA] border-2 border-orange-100">
                                    {typeof category.icon === 'string' ? (
                                        <img src={category.icon} alt={category.name} className="w-8 h-8" />
                                    ) : (
                                        <img src={category.icon} alt={category.name} className="w-8 h-8" />
                                    )}
                                </div>

                                {/* Category Name */}
                                <h3 className="mt-2 font-bold text-[#000000] text-center text-[24px] md:text-[24px] lg:text-[32px] relative self-stretch mont-category-font">
                                    {category.name}
                                </h3>

                                {/* description Count */}
                                {/* <p className="mt-0 text-[#A42C05] text-foundation-red-dark text-center font-['AvenirNextRoundedStd-Medium',_sans-serif] sm:text-[18px] md:text-[22px] lg:text-2xl font-medium relative self-stretch underline">
                                    {category.description} businesses
                                </p> */}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
