import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { fetchDefaultAttractions } from './attractionsService.js';

export default function ServiceAttractions({ business }) {
  const [attractions, setAttractions] = useState([]);
  const [isMapped, setIsMapped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadAttractions = async () => {
      // Get the business type from category or business_type field
      const businessType = business?.category?.name || 
                           business?.category?.business_type || 
                           business?.business_type;

      if (!businessType) return;

      setLoading(true);
      setError(null);

      try {
        const result = await fetchDefaultAttractions(businessType);
        setAttractions(result.attractions);
        setIsMapped(result.isMapped);
      } catch (err) {
        setError('Failed to load attractions');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAttractions();
  }, [business?.category, business?.business_type]);

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

  const displayCount = 4;
  const visibleAttractions = isExpanded ? attractions : attractions.slice(0, displayCount);
  const hasMore = attractions.length > displayCount;

  return (
    <div className="bg-white rounded-[10px] p-6 md:p-8 border border-solid border-gray-300 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h3 className="text-xl md:text-2xl text-[#000000] bebas-sub-title-font">
          {isMapped ? 'Attractions' : 'Typical Features'}
        </h3>
        {!isMapped && (
          <p className="text-xs md:text-sm text-gray-500 mt-2 sm:mt-0 mont-normal-font">
            Common amenities for this business type
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleAttractions.map((attraction, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
            <span className="text-[#DB3A06] font-bold">•</span>
            <div>
              <p className="text-[#000000] text-[14px] md:text-base font-normal mont-normal-font">
                {attraction.attraction_name || attraction.name || attraction.title}
              </p>
              {attraction.description && (
                <p className="text-gray-600 text-[12px] md:text-sm mt-1 mont-normal-font">
                  {attraction.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-[#DB3A06] font-medium"
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
