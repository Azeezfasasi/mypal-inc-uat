
import React from 'react';

export default function SearchResults({ results }) {
  // Handle empty or null results
  if (!results || (Array.isArray(results) && results.length === 0)) {
    return <div className="mt-8 text-center text-gray-400">No results found.</div>;
  }

  // If results is an array, assume it's a list of categories or businesses
  if (Array.isArray(results)) {
    return (
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-[#DB3A06] mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-2">{item.description}</p>
            {item.image_url && (
              <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-2" />
            )}
            {item.categories && item.categories.length > 0 && (
              <div>
                <h3 className="font-semibold mt-2 mb-1">Categories:</h3>
                <ul className="list-disc ml-5">
                  {item.categories.map((cat) => (
                    <li key={cat.id} className="mb-1">
                      {cat.name}
                      {cat.image_url && (
                        <img src={cat.image_url} alt={cat.name} className="inline-block w-8 h-8 object-cover rounded ml-2" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.total_businesses !== undefined && (
              <div className="mt-2 text-sm text-gray-500">Total businesses: {item.total_businesses}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // If results is an object, assume it's a single business detail response
  // Some APIs wrap the business object in a 'data' property
  const business = results.data ? results.data : results;

  return (
    <div className="mt-8 max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#DB3A06] mb-2">{business.business_name || business.name}</h2>
      <p className="text-gray-700 mb-2">{business.description}</p>
      {business.image_url && (
        <img src={business.image_url} alt={business.business_name || business.name} className="w-full h-56 object-cover rounded-lg mb-2" />
      )}
      {business.address && (
        <div className="mb-2 text-gray-500">Address: {business.address}</div>
      )}
      {business.category && (
        <div className="mb-2">
          <span className="font-semibold">Category:</span> {business.category.business_type}
        </div>
      )}
      {business.reviews && business.reviews.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Reviews:</h3>
          <ul className="list-disc ml-5">
            {business.reviews.map((review) => (
              <li key={review.id} className="mb-2">
                <span className="font-bold">{review.user?.firstname || 'Anonymous'}:</span> {review.comment}
                <span className="ml-2 text-yellow-500">Rating: {review.rating}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {business.totalReviews !== undefined && (
        <div className="mt-2 text-sm text-gray-500">Total reviews: {business.totalReviews}</div>
      )}
      {business.averageRating !== undefined && (
        <div className="mt-2 text-sm text-gray-500">Average rating: {business.averageRating}</div>
      )}
    </div>
  );
}
