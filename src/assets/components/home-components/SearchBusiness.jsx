import React, { useState } from 'react';
import searchIcon from '../../images/search.svg';
import locationIcon from '../../images/location.svg';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

export default function SearchBusiness({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Using environment variables with fallback
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const MIN_QUERY_LENGTH = 2;

  const handleSearch = async () => {
    // Reset error on new search
    setError('');

    if (!query && !location) {
      setError('Please enter a business name or location to search.');
      return;
    }

    // Minimal guard for query length
    if (query && query.trim().length < MIN_QUERY_LENGTH) {
      setError(`Type at least ${MIN_QUERY_LENGTH} characters to search`);
      return;
    }

    setLoading(true);
    try {
      // Fetch all businesses with pagination
      const response = await axios.get(`${API_BASE_URL}/businesses/all`, {
        params: {
          page: 1,
          limit: 100, // API maximum limit is 100
        },
        headers: {
          'X-API-Key': API_KEY,
          'Accept': 'application/json',
        },
        timeout: 10000,
      });

      const responseData = response.data;

      // Normalize response - handle various possible structures
      let businesses = [];
      
      // Handle paginated response structure
      if (responseData.data) {
        if (Array.isArray(responseData.data)) {
          businesses = responseData.data;
        } else if (responseData.data.businesses && Array.isArray(responseData.data.businesses)) {
          businesses = responseData.data.businesses;
        } else if (responseData.data.data && Array.isArray(responseData.data.data)) {
          businesses = responseData.data.data;
        }
      }
      // Handle direct array response
      else if (Array.isArray(responseData)) {
        businesses = responseData;
      }

      if (!Array.isArray(businesses) || businesses.length === 0) {
        setError('No businesses found. Please try again later.');
        onSearchResults && onSearchResults([]);
        setLoading(false);
        return;
      }

      // Client-side filtering based on search query and location
      let filteredBusinesses = businesses.filter(b => {
        const nameMatch = !query || (b.business_name || b.name || '')
          .toLowerCase()
          .includes(query.toLowerCase());

        const locationMatch = !location || (
          (b.address || '').toLowerCase().includes(location.toLowerCase()) ||
          (b.city || '').toLowerCase().includes(location.toLowerCase()) ||
          (b.state || '').toLowerCase().includes(location.toLowerCase()) ||
          (b.country || '').toLowerCase().includes(location.toLowerCase())
        );

        return nameMatch && locationMatch;
      });

      if (!filteredBusinesses.length) {
        setError(`No businesses found for "${query}${location ? ' in ' + location : ''}". Try a different search.`);
        onSearchResults && onSearchResults([]);
        setLoading(false);
        return;
      }

      // Transform API response to match expected format
      const transformedResults = filteredBusinesses.map(b => ({
        id: b.id,
        name: b.name || b.business_name || 'Unnamed Business',
        business_name: b.business_name || b.name || 'Unnamed Business',
        description: b.description || '',
        image: b.image_url,
        image_url: b.image_url,
        address: b.address,
        city: b.city,
        state: b.state,
        country: b.country,
        is_verified: b.is_verified,
        cuisine_categories: b.cuisine_categories || [],
        menus: b.menus || [],
        reviews: b.reviews || {},
      }));

      onSearchResults && onSearchResults(transformedResults);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching search results:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      let errorMsg = 'Failed to fetch search results. ';
      if (err.response?.status === 401 || err.response?.status === 403) {
        errorMsg += 'API authentication failed.';
      } else if (err.response?.status === 404) {
        errorMsg += 'Endpoint not found. Please try again later.';
      } else if (err.code === 'ECONNABORTED') {
        errorMsg += 'Request timeout. Please try again.';
      } else {
        errorMsg += 'Please check your connection and try again.';
      }
      
      setError(errorMsg);
      onSearchResults && onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Allow search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full md:w-[95%] p-4 md:p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border border-white/30 flex flex-row justify-center items-center mont-normal-font">
      {/* Error Message */}
      {error && (
        <div className="absolute -bottom-10 left-0 right-0 text-center text-sm text-white font-medium">
          {error}
        </div>
      )}

      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={searchIcon} alt="search" />
          <input
            type="search"
            placeholder="Search business name"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className="w-full text-white placeholder-white focus:outline-none bg-transparent"
          />
        </div>

        {/* Location Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={locationIcon} alt="location" />
          <input
            type="search"
            placeholder="Location (optional)"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setError('');
            }}
            onKeyPress={handleKeyPress}
            className="w-full text-white placeholder-white focus:outline-none bg-transparent"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full md:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 disabled:bg-orange-400 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer flex items-center justify-center"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
              />
              <span className="ml-2">Searching...</span>
            </>
          ) : (
            'Search'
          )}
        </button>
      </div>
    </div>
  );
}
