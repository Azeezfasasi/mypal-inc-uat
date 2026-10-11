import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../images/star.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiHeaders, apiUrl, isApiConfigured, unwrapList } from '../../../lib/api';
import { Commet } from "react-loading-indicators";

// Reusable card component
const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => {
  return (
    <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl bebas-font">
      <div className="relative overflow-hidden aspect-w-4 aspect-h-3 bebas-font">
        <Link to={`/services/servicedetails/${id}`}>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[252px] object-fill bg-amber-100 rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-6 bebas-font">
        <Link to={`/services/servicedetails/${id}`} className="text-lg font-medium text-gray-800 mb-1">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2 mont-normal-font">{description.split(" ").slice(0, 5).join(" ")}...</p>
        <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className='flex flex-row justify-start items-center'>
            <img src={star} alt="star" />
            <span className="font-semibold text-[14.5px] text-gray-700 mr-0">{rating}</span>
            <span className="text-[14.5px] mr-0">({reviews})</span>
          </div>
          <div className='flex flex-row justify-start items-center'>
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className='text-[14.5px] mont-normal-font truncate max-w-[9rem]' title={location}>
              {location}
            </span>
          </div>
        </div>
        <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
          <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans mont-normal-font">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function FeaturedExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // we'll fetch from the global businesses endpoint and sample across all categories

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);
        if (!isApiConfigured) throw new Error('API is not configured');

        // Fetch all businesses directly with pagination parameters
        const resp = await axios.get(apiUrl('/businesses/all'), {
          params: {
            page: 1,
            limit: 20, // fetch more to have a better sample for randomness
            sort: 'createdAt',
            order: 'DESC'
          },
          headers: apiHeaders(),
        });
        const { items } = unwrapList(resp.data);

        // Fisher–Yates shuffle (sort-by-random is biased), then pick 8; skip items without an id
        const pool = items.filter((biz) => biz?.id);
        for (let i = pool.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        const shuffled = pool.slice(0, 8);

        const mappedData = shuffled.map((biz) => ({
          id: biz.id,
          title: biz.business_name || biz.name || 'Unnamed Business',
          description: biz.description || 'No description available',
          rating: Number(biz.average_rating) || 0,
          reviews: Number(biz.total_reviews) || 0,
          location: biz.address || biz.city || biz.state || biz.country || 'Not specified',
          imageSrc: biz.image_url || '/images/default.svg',
        }));

        setExperiences(mappedData);
      } catch (err) {
        console.error('Failed to load featured experiences', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, []);

  // if (loading) return <div>Loading restaurant categories…</div>;
  if (loading) {
  return (
    <div className="flex justify-center items-center py-20">
      <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
    </div>
  );
}
  // Never show raw server errors to visitors
  if (error) {
    return (
      <div className="text-center text-gray-600 py-10 text-lg mont-normal-font">
        We couldn&apos;t load featured experiences right now. Please try again shortly.
      </div>
    );
  }

  return (
    <div id="featured-category" className="bg-gray-50 py-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
            {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
                style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto bebas-font">
                Featured Experiences
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
            ></div>
        </div>
        {experiences.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg mont-normal-font">
            No businesses are available for this category.
          </div>
        ) : (
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
