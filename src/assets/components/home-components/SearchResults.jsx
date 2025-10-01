

import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchResults({ results }) {
  if (!results || (Array.isArray(results) && results.length === 0)) {
    return <div className="mt-8 text-center text-gray-400">No results found.</div>;
  }

  // If results is an array, show business cards
  if (Array.isArray(results)) {
    return (
      <div className="h-[500px] mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-2 gap-6 border border-solid border-red-200 rounded-lg overflow-y-auto">
        {results.map((business) => (
          <div key={business.id} className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center border border-solid border-red-100 h-[300px]">
            {business.image_url && (
              <img src={business.image_url} alt={business.name} className="w-32 h-32 object-cover rounded-full mb-4" />
            )}
            <h2 className="text-lg font-bold text-[#DB3A06] mb-2">{business.business_name || business.name}</h2>
            <Link
              to={`/services/servicedetails/${business.id}`}
              className="mt-2 px-4 py-2 bg-[#DB3A06] text-white rounded-lg shadow hover:bg-orange-700 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    );
  }

  // If results is an object, show single business card
  const business = results.data ? results.data : results;
  return (
    <div className="mt-8 max-w-md mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col items-center h-[500px] border border-solid border-red-200 overflow-y-auto">
      {business.image_url && (
        <img src={business.image_url} alt={business.business_name || business.name} className="w-32 h-32 object-cover rounded-full mb-4" />
      )}
      <h2 className="text-lg font-bold text-[#DB3A06] mb-2">{business.business_name || business.name}</h2>
      <Link
        to={`/business/${business.id}`}
        className="mt-2 px-4 py-2 bg-[#DB3A06] text-white rounded-lg shadow hover:bg-orange-700 transition-colors duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
