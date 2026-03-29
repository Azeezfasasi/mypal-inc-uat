import React, { useState, useEffect } from 'react';
import { ChevronDown, Star } from 'lucide-react';
import { fetchDefaultAttractions } from './attractionsService.js';
import magicstar from '../assets/images/magicstar.svg';

export default function ServiceAttractions({ business }) {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadAttractions = async () => {
      // Get the business ID
      const businessId = business?.id || business?._id;

      if (!businessId) return;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchDefaultAttractions(businessId);
        setAttractions(result.attractions);
      } catch (err) {
        setError('Failed to load attractions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAttractions();
  }, [business?.id, business?._id]);

  if (loading) {
    return (
      <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300 mb-8">
        <h3 className="text-xl md:text-2xl text-[#000000] mb-6 bebas-sub-title-font">
          Attractions
        </h3>
        <p className="text-gray-500 mont-normal-font">Loading attractions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300 mb-8">
        <h3 className="text-xl md:text-2xl text-[#000000] mb-6 bebas-sub-title-font">
          Attractions
        </h3>
        <p className="text-red-500 mont-normal-font">{error}</p>
      </div>
    );
  }

  if (!attractions || attractions.length === 0) {
    return null;
  }

  const displayCount = 6;
  
  // Extract unique categories from attractions
  const categories = Array.from(
    new Set(
      attractions
        .map((attr) => {
          const cat = attr.category || attr.type || attr.tag;
          // If category is an object, extract the name property
          return typeof cat === 'object' && cat?.name ? cat.name : cat;
        })
        .filter(Boolean)
    )
  );

  // Filter attractions based on selected category
  const filteredAttractions = selectedCategory
    ? attractions.filter((attr) => {
        const cat = attr.category || attr.type || attr.tag;
        const catName = typeof cat === 'object' && cat?.name ? cat.name : cat;
        return catName === selectedCategory;
      })
    : attractions;

  const visibleAttractions = isExpanded ? filteredAttractions : filteredAttractions.slice(0, displayCount);
  const hasMore = filteredAttractions.length > displayCount;

  return (
    <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300 mb-8">
      <h3 className="text-xl md:text-2xl text-[#000000] mb-6 bebas-sub-title-font">
        Attractions
      </h3>

      {/* Category Tags */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 border rounded-full text-sm font-medium transition-colors duration-200 mont-normal-font cursor-pointer ${
                selectedCategory === category
                  ? 'border-[#DB3A06] bg-[#DB3A06] text-white'
                  : 'border-[#DB3A06] text-[#DB3A06] hover:bg-orange-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Attractions Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {visibleAttractions.map((attraction, index) => (
          <div key={index} className="flex items-center gap-3">
            <img src={magicstar} alt={attraction.label || attraction.attraction_name || attraction.name || attraction.title} className="w-6 md:w-8 h-6 md:h-8 object-cover rounded-full" />
            <p className="text-[#000000] text-sm md:text-base font-normal mont-normal-font">
              {attraction.label || attraction.attraction_name || attraction.name || attraction.title}
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-[#DB3A06] font-medium"
        >
          <span className="text-sm mont-normal-font">
            {isExpanded ? 'Show Less' : `Show ${attractions.length - displayCount} More`}
          </span>
          <ChevronDown 
            size={18} 
            className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
}
