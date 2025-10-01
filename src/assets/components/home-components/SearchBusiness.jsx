import React, { useState } from 'react';
import searchIcon from '../../images/search.svg';
import locationIcon from '../../images/location.svg';

export default function SearchBusiness({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async () => {
    if (!query && !location) return;

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/businesses?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`,
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Send data to parent component
      if (onSearchResults) {
        onSearchResults(data);
      } else {
        console.warn('onSearchResults prop is missing!');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Failed to fetch search results. Please check your API key or network.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full md:w-[95%] p-4 md:p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border border-white/30 flex flex-row justify-center items-center">
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={searchIcon} alt="search" />
          <input
            type="search"
            placeholder="What are you looking for"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={locationIcon} alt="location" />
          <input
            type="search"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Explore Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg"
        >
          {loading ? 'Searching...' : 'Explore'}
        </button>
      </div>
    </div>
  );
}
