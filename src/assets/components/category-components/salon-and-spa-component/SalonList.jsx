import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../../images/star.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Commet } from "react-loading-indicators";

// Reusable card component
const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => {
  return (
    <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
        <Link to={`/services/servicedetails/${id}`}>
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-[252px] object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1 bebas-font">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2 mont-normal-font">{description.split(" ").slice(0, 20).join(" ")}</p>
        <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className='flex flex-row justify-start items-center'>
            <img src={star} alt="star" />
            <span className="font-semibold text-[14.5px] text-gray-700 mr-0 bebas-font">{rating}</span>
            <span className="text-[14.5px] mr-0 bebas-font">({reviews})</span>
          </div>
          <div className='flex flex-row justify-start items-center'>
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className='text-[14.5px] mont-normal-font'>
              {location?.length > 10 ? location.slice(0, 12) + "…" : location || 'Unknown'}
            </span>
          </div>
        </div>
        <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
          <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans bebas-font">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function SalonList() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const CATEGORY_ID = "00d0f1bf-bc6e-4f92-a6e6-1e6ee94319d8"; // Salon and Spa category ID

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const response = await axios.get(
          `${API_BASE}/business-categories/${CATEGORY_ID}/businesses`,
          {
            headers: { "x-api-key": API_KEY },
          }
        );

        const data = response.data.data?.data ?? [];
        const mappedData = data.map((biz) => ({
          id: biz.id,
          title: biz.business_name,
          description: biz.description || "No description available",
          rating: biz.average_rating || 0,
          reviews: biz.total_reviews || 0,
          location: biz.address || "Not specified",
          imageSrc: biz.image_url || '/images/default.svg',
        }));

        setExperiences(mappedData);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBusinesses();
  }, [API_BASE, API_KEY, CATEGORY_ID]);

  // if (loading) return <div>Loading restaurant categories…</div>;
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
      </div>
    );
  }
  
  if (error) return (
    <div className="text-center text-red-500 py-10 text-lg bebas-font">
      No businesses are available for this category. Check back later or explore other categories!
    </div>
  );

  return (
    <div className="bg-gray-50 py-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {experiences.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg">
            No businesses are available for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
