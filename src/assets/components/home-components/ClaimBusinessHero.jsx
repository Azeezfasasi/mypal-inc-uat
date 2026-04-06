import React, { useState, useEffect, useCallback, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import MainHeader from './MainHeader';
import MultiStepClaimBusinessModal from './MultiStepClaimBusinessModal';
import heroimagedeem from '../../images/heroimagedeem.svg';
import { Search, MapPin, Phone, Mail } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const heroImage = heroimagedeem;

export default function ClaimBusinessHeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const searchContainerRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { 'x-api-key': API_KEY },
      });
      
      // Filter for specific categories in desired order
      const allCategories = response.data.data || [];
      const desiredCategories = [
        'Fine Dining',           // Restaurants
        'Buffet services',         // Restaurants
        'Iconic Delicacies',         // Restaurants
        'Short-let Homes & Beach Houses',         // Accommodation
        'Beach Resort Accommodation',         // Accommodation
        'Hotel Experience',         // Accommodation
      ];
      
      const filteredCategories = desiredCategories
        .map(name => allCategories.find(cat => cat.name === name))
        .filter(cat => cat !== undefined);
      
      setCategories(filteredCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [API_BASE_URL, API_KEY]);

  // Fetch popular categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showResults]);

  const handleSearchBusinesses = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      console.log('🔍 Searching for:', { query: searchQuery, lat: 6.5244, lng: 3.3792 });
      const response = await axios.post(
        `${API_BASE_URL}/business/claim/search`,
        {
          query: searchQuery,
          lat: 6.5244,
          lng: 3.3792,
        },
        { headers: { 'x-api-key': API_KEY } }
      );

      console.log('✅ Full API Response:', response);
      console.log('📊 Response data:', response.data);
      console.log('📊 Response status:', response.status);

      // API returns results directly in response.data (array)
      let results = Array.isArray(response.data) ? response.data : (response.data.data || response.data.results || []);
      console.log('🎯 Final results:', results, 'Length:', Array.isArray(results) ? results.length : 'Not an array');

      // Fetch details for all results to get photo URLs
      if (results && results.length > 0) {
        console.log('📸 Fetching details for', results.length, 'businesses...');
        const detailsPromises = results.map((result) =>
          axios.get(
            `${API_BASE_URL}/business/claim/${result.google_place_id}/details`,
            { headers: { 'x-api-key': API_KEY } }
          )
            .then((res) => ({
              ...result,
              photoUrl: res.data.photos?.[0]?.url,
              displayName: res.data.displayName?.text || result.business_name,
            }))
            .catch((err) => {
              console.error(`Error fetching details for ${result.google_place_id}:`, err);
              return result; // Return original result if details fetch fails
            })
        );

        const enrichedResults = await Promise.all(detailsPromises);
        console.log('✅ Enriched results with photos:', enrichedResults);
        setSearchResults(enrichedResults);
      } else {
        setSearchResults(Array.isArray(results) ? results : []);
      }

      setShowResults(true);
      
      if (!results || (Array.isArray(results) && results.length === 0)) {
        toast.error('No businesses found. Try searching by business name (e.g., "The Orchid Lagos" or "Rivas Event")');
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      setSearchResults([]);
      setShowResults(true);
      toast.error(error.response?.data?.message || 'Error searching businesses');
    } finally {
      setLoading(false);
    }
  };

  const handleBusinessClick = async (business) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/business/claim/${business.google_place_id}/details`,
        { headers: { 'x-api-key': API_KEY } }
      );
      const fullBusinessDetails = response.data;
      console.log('Full business details:', fullBusinessDetails);
      setSelectedBusiness(fullBusinessDetails);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching business details:', error);
      toast.error('Failed to fetch business details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="relative w-full">
        {/* <MainHeader /> */}

        {/* Hero Section */}
        <div className="relative w-full min-h-[600px] md:min-h-[700px]">
            <MainHeader />
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black opacity-45"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] md:min-h-[700px] text-white px-4 md:px-8 py-12">
            {/* Text Content */}
            <div className="w-full max-w-4xl text-center mb-8 md:mb-10 flex flex-col items-center">
              <h1 className="text-[32px] md:text-[48px] lg:text-[48px] leading-tight font-bold drop-shadow-lg mb-4 bebas-font">
                Find and claim your business on Mypal
              </h1>
              <p className="text-[14px] md:text-[24px] text-gray-100 drop-shadow-md max-w-2xl">
                Search and claim your business to manage events, deals and experiences in one place.
              </p>
            </div>

            {/* Search Bar and Categories Container */}
            <div className="w-full md:max-w-[60%] mx-auto" ref={searchContainerRef}>
              {/* Search Bar */}
              <form onSubmit={handleSearchBusinesses} className="mb-6">
                <div className="flex gap-3 bg-white rounded-lg p-1 md:p-2 shadow-lg">
                  <div className="flex-1 flex items-center px-3">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for your business..."
                      className="flex-1 ml-2 text-[12px] md:text-[20px] leading-[145%] font-semibold outline-none text-[#667185] placeholder-gray-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-3 md:px-8 py-2 bg-[#DB3A06] text-white rounded-md text-[15.92px] leading-[145%] font-bold hover:bg-orange-700 transition disabled:opacity-70"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </form>

              {/* Category Buttons */}
              {!showResults && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      className="px-[12px] py-[8px] bg-[#FEF2EE] bg-opacity-90 text-[14px] text-[#68798A] rounded-[6px] font-medium hover:bg-opacity-100 transition text-sm"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="bg-white rounded-lg shadow-xl max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <div className="divide-y">
                      {searchResults.map((result) => (
                        <div
                          key={result.google_place_id}
                          className=" p-2 md:p-4 hover:bg-orange-50 cursor-pointer transition flex items-center gap-4"
                          onClick={() => handleBusinessClick(result)}
                        >
                          {/* Business Image from Details or Placeholder */}
                          <div className="w-20 md:w-[142px] h-20 md:h-[98px] flex-shrink-0 rounded-md overflow-hidden bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 flex items-center justify-center shadow-sm">
                            {result.photoUrl ? (
                              <img
                                src={result.photoUrl}
                                alt={result.business_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center">
                                <MapPin className="w-8 h-8 text-white opacity-90 mx-auto mb-1" />
                                <span className="text-xs text-white font-semibold">Image</span>
                              </div>
                            )}
                          </div>

                          {/* Business Details */}
                          <div className='w-full flex flex-col md:flex-row md:justify-between'>
                            <div className="flex-1 min-w-0 py-1">
                              <h3 className="font-semibold text-gray-900 text-sm">{result.business_name}</h3>
                              <div className="flex items-start gap-1 text-xs text-gray-600 mt-2">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                                <span className="truncate text-wrap">{result.formatted_address}</span>
                              </div>
                            </div>
                            {/* Claim Button */}
                            <button
                              type="button"
                              className="w-fit px-3 py-1.5 border-2 border-[#DB3A06] text-[#DB3A06] rounded-md font-medium hover:bg-orange-50 transition text-xs whitespace-nowrap flex-shrink-0 cursor-pointer"
                            >
                              Claim Business
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      No businesses found. Try a different search.
                    </div>
                  )}

                  {/* Clear Results Button */}
                  <div className="p-3 border-t">
                    <button
                      onClick={() => {
                        setShowResults(false);
                        setSearchQuery('');
                        setSearchResults([]);
                      }}
                      className="w-full text-center text-sm text-[#DB3A07] font-semibold hover:text-orange-800 transition cursor-pointer"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Section - Call to Action */}
            <div className="relative text-white py-12 text-center">
              <motion.p className="text-[14px] mont-normal-font md:text-[24px] font-bold">
                {'Claim your business in seconds.'.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,  // Stagger the animation of each letter
                      duration: 0.6,
                      repeat: Infinity,        // Loop forever
                      repeatType: "loop",   // Options: "reverse", "loop", "mirror", "delay", "none",
                      repeatDelay: 3, // Delay between each loop
                    }}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </motion.p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Multi-Step Modal */}
      <MultiStepClaimBusinessModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBusiness(null);
        }}
        business={selectedBusiness}
      />
    </>
  );
}

