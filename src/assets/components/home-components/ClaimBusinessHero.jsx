import React, { useState, useEffect, useCallback } from 'react';
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

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const fetchCategories = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`, {
        headers: { 'x-api-key': API_KEY },
      });
      // Get first 4 categories for the buttons
      setCategories(response.data.data?.slice(0, 4) || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [API_BASE_URL, API_KEY]);

  // Fetch popular categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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
      const results = Array.isArray(response.data) ? response.data : (response.data.data || response.data.results || []);
      console.log('🎯 Final results:', results, 'Length:', Array.isArray(results) ? results.length : 'Not an array');

      setSearchResults(Array.isArray(results) ? results : []);
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

  const handleBusinessClick = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
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
            <div className="w-full max-w-2xl mx-auto">
              {/* Search Bar */}
              <form onSubmit={handleSearchBusinesses} className="mb-6">
                <div className="flex gap-3 bg-white rounded-lg p-1 md:p-2 shadow-lg">
                  <div className="flex-1 flex items-center px-3">
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
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
                      onClick={() => setSearchQuery(category.name)}
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
                          className="p-4 hover:bg-gray-50 cursor-pointer transition flex flex-col md:flex-row gap-4"
                          onClick={() => handleBusinessClick(result)}
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900">{result.business_name}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
                              <MapPin className="w-4 h-4 flex-shrink-0" />
                              <span className="truncate">{result.formatted_address}</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="w-fit px-4 py-2 border-2 border-[#DB3A06] text-[#DB3A06] rounded-md font-medium hover:bg-orange-50 transition text-sm whitespace-nowrap flex-shrink-0"
                          >
                            Claim Business
                          </button>
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
                      className="w-full text-center text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Bottom Section - Call to Action */}
        <div className="relative text-white py-12 text-center">
          <p className="text-[14px] mont-normal-font md:text-[24px] font-bold">
            Already listed? <button 
            //   onClick={() => setIsModalOpen(true)}
              className="text-white"
            >
              Claim your business in seconds.
            </button>
          </p>
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

