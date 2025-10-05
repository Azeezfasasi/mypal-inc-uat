// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { MapPin } from 'lucide-react';
// import star from '../../../images/star.svg';
// import { Link } from 'react-router-dom';
// import { Commet } from "react-loading-indicators";

// // Reusable card component
// const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => (
//   <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
//     <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
//       <Link to={`/services/servicedetails/${id}`}>
//         <img
//           src={imageSrc || star}
//           alt={title || 'Business Image'}
//           className="w-full h-[252px] object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
//         />
//       </Link>
//     </div>

//     <div className="p-4 sm:p-6">
//       <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">
//         {title || 'Untitled Business'}
//       </Link>
//       <p className="text-[15px] text-gray-500 mb-2">{description || 'No description available'}</p>

//       <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
//         <div className="flex flex-row justify-start items-center">
//           <img src={star} alt="star" />
//           <span className="font-semibold text-[14.5px] text-gray-700 mr-1">{rating ?? 'N/A'}</span>
//           <span className="text-[14.5px]">({reviews ?? 0})</span>
//         </div>
//         <div className="flex flex-row justify-start items-center">
//           <MapPin className="w-4 h-4 text-gray-400 mr-1" />
//           <span className="text-[14.5px]">
//             {location?.length > 10 ? location.slice(0, 12) + "…" : location || 'Unknown'}
//           </span>
//         </div>
//       </div>

//       <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
//         <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-[#000000] font-['AvenirNextRoundedStd-Regular',_sans-serif] text-[14.5px] font-normal cursor-pointer">
//           View Details
//         </button>
//       </Link>
//     </div>
//   </div>
// );

// // Main component
// export default function FineDiningLists({ filter = 'All' }) {
//   const [businesses, setBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   const FINE_DINING_CATEGORY_ID = '4a85050b-da46-4fb6-8bf0-6eee16858d00';

//   useEffect(() => {
//     const fetchFineDining = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         // Try to apply filter as server-side query params when possible
//         const params = {};
//         const normalized = String(filter || '').toLowerCase();

//   // Simple server-side mappings (adjust to match your backend API if different)
//   if (normalized === 'open') params.open = true;
//   if (normalized === 'offers delivery') params.delivery = true;
//   if (normalized === 'offers takeout') params.takeout = true;
//   // treat cuisine names as `cuisine` query param
//   const cuisines = ['chinese','italian','mexican','indian','american','asian','french','lebanese','nigerian','continental','african','egyptian','spanish','brazilian','greek','caribbean','oriental'];
//   if (cuisines.includes(normalized)) params.cuisine = normalized;

//         const endpoint = `${API_BASE}/business-categories/${FINE_DINING_CATEGORY_ID}/businesses`;
//         const response = await axios.get(endpoint, { headers: { 'x-api-key': API_KEY }, params });

//         // Correctly access the nested array
//         const dataArray = Array.isArray(response.data?.data?.data)
//           ? response.data.data.data
//           : [];

//         // Always apply client-side filtering when a filter (other than 'All') is selected.
//         let finalArray = dataArray;
//         if (filter && filter !== 'All') {
//           const f = filter.toLowerCase();
//           finalArray = dataArray.filter(biz => {
//             // collect possible cuisine names from different response fields
//             const catName = biz?.category?.name?.toLowerCase() || '';
//             const cuisineFromResponse = (biz?.cuisineCategories && biz.cuisineCategories.length > 0)
//               ? biz.cuisineCategories.map(c=> (c.name || '').toLowerCase()).join(' ')
//               : '';
//             const topLevelCuisine = (response.data?.data?.cuisineCategory?.name || '').toLowerCase();
//             const businessName = (biz.business_name || '').toLowerCase();

//             // direct cuisine/category match
//             if (catName.includes(f)) return true;
//             if (cuisineFromResponse.includes(f)) return true;
//             if (topLevelCuisine.includes(f)) return true;
//             if (businessName.includes(f)) return true;

//             // check flags if available
//             if (f === 'open' && biz.is_active) return true;
//             if (f === 'offers delivery' && (biz.offers_delivery || biz.offersDelivery)) return true;
//             if (f === 'offers takeout' && (biz.offers_takeout || biz.offersTakeout)) return true;

//             return false;
//           });
//         }

//         if (!dataArray.length) console.warn('No array found in API response, defaulting to empty array.');
          
//         // Map the data to match ExperienceCard props
//         const mappedData = (finalArray || dataArray).map(biz => ({
//           id: biz.id || biz.business_id || biz._id, // try other possible keys
//           title: biz.business_name ?? 'Untitled Business',
//           description: biz.description ?? 'No description available',
//           rating: biz.average_rating ?? 0,
//           reviews: biz.total_reviews ?? 0,
//           location: biz.city ?? 'Unknown',
//           imageSrc: biz.image_url ?? star,
//         }));


//         setBusinesses(mappedData);
//       } catch (err) {
//         console.error('Error fetching fine dining:', err);
//         setError(err.response?.data?.message || err.message || 'Unknown error');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (API_BASE && API_KEY && FINE_DINING_CATEGORY_ID) fetchFineDining();
//     else setError('Configuration Error: API_BASE, API_KEY, or Category ID missing.');
//   }, [API_BASE, API_KEY, FINE_DINING_CATEGORY_ID, filter]);

//   // if (loading) return <div>Loading restaurant categories…</div>;
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
//       </div>
//     );
//   }
//   if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;
//   if (!businesses.length) return <p className="text-center py-10 text-gray-600">No Fine Dining businesses found.</p>;

//   return (
//     <div className="bg-gray-50 py-6 md:py-12 font-sans antialiased">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
//           {businesses.map(biz => (
//             <ExperienceCard key={biz.id} id={biz.id} {...biz} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

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
        <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2">{description}</p>
        <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className='flex flex-row justify-start items-center'>
            <img src={star} alt="star" />
            <span className="font-semibold text-[14.5px] text-gray-700 mr-0">{rating}</span>
            <span className="text-[14.5px] mr-0">({reviews})</span>
          </div>
          <div className='flex flex-row justify-start items-center'>
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className='text-[14.5px]'>
              {location?.length > 10 ? location.slice(0, 12) + "…" : location}
            </span>
          </div>
        </div>
        <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
          <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function FineDiningLists() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  const CATEGORY_ID = '4a85050b-da46-4fb6-8bf0-6eee16858d00'; // Fine Dining category ID

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        // First fetch categories to find the parent slug that contains our subcategory id
        const catsResp = await axios.get(`${API_BASE}/categories/all`, {
          headers: { "x-api-key": API_KEY },
        });

        const allCats = catsResp.data.data ?? catsResp.data ?? [];

        // Find parent category (top-level) that contains our subcategory id
        let parentSlug = null;
        for (const mainCat of allCats) {
          if (Array.isArray(mainCat.categories)) {
            const found = mainCat.categories.find((sc) => sc.id === CATEGORY_ID);
            if (found) {
              parentSlug = mainCat.slug || mainCat.name?.toLowerCase().replace(/\s+/g, '-') || null;
              break;
            }
          }
        }

        // If no parentSlug found, try to find the subcategory itself and use its slug as fallback
        if (!parentSlug) {
          const foundSub = allCats
            .flatMap((c) => (Array.isArray(c.categories) ? c.categories : []))
            .find((sc) => sc.id === CATEGORY_ID);
          if (foundSub && foundSub.slug) parentSlug = foundSub.slug;
        }

        // If still no parentSlug, set error and return early
        if (!parentSlug) {
          setError({ message: 'Category parent slug not found for the given CATEGORY_ID' });
          setLoading(false);
          return;
        }

        // Call the businesses endpoint using the parent slug and categoryId query param
        const resp = await axios.get(`${API_BASE}/categories/${parentSlug}/businesses?categoryId=${CATEGORY_ID}`, {
          headers: { "x-api-key": API_KEY },
        });

        // Normalize response: some endpoints return data.data.data, some return data.data or plain array
        let dataArr = resp.data?.data ?? resp.data;
        if (dataArr && dataArr.data) dataArr = dataArr.data;
        if (!Array.isArray(dataArr)) {
          if (dataArr == null) dataArr = [];
          else if (typeof dataArr === 'object') dataArr = Object.values(dataArr);
          else dataArr = [];
        }

        const mappedData = dataArr.map((biz) => ({
          id: biz.id,
          title: biz.business_name || biz.name || 'Unnamed Business',
          description: biz.description || 'No description available',
          rating: biz.average_rating || 0,
          reviews: biz.total_reviews || biz.reviews || 0,
          location: biz.address || biz.city || 'Not specified',
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
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

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
