// import React, { useEffect, useState } from 'react';
// import { Star, MapPin } from 'lucide-react';
// import star from '../../images/star.svg';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { Commet } from "react-loading-indicators";

// // Reusable card component
// const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => {
//   return (
//     <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
//       <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
//         <Link to={`/services/servicedetails/${id}`}>
//           <img
//             src={imageSrc}
//             alt={title}
//             className="w-full h-[252px] object-contain bg-amber-100 rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
//           />
//         </Link>
//       </div>

//       <div className="p-4 sm:p-6">
//         <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
//         <p className="text-[15px] text-gray-500 mb-2">{description.split(" ").slice(0, 5).join(" ")}...</p>
//         <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
//           <div className='flex flex-row justify-start items-center'>
//             <img src={star} alt="star" />
//             <span className="font-semibold text-[14.5px] text-gray-700 mr-0">{rating}</span>
//             <span className="text-[14.5px] mr-0">({reviews})</span>
//           </div>
//           <div className='flex flex-row justify-start items-center'>
//             <MapPin className="w-4 h-4 text-gray-400 mr-1" />
//             <span className='text-[14.5px]'>
//               {location?.length > 10 ? location.slice(0, 12) + "…" : location}
//             </span>
//           </div>
//         </div>
//         <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
//           <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans">
//             View Details
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default function FeaturedExperiences() {
//   const [experiences, setExperiences] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const API_KEY = import.meta.env.VITE_API_KEY;
//   // we'll fetch from the global businesses endpoint and sample across all categories

//   useEffect(() => {
//     async function fetchBusinesses() {
//       try {
//         setLoading(true);

//         const base = API_BASE.replace(/\/+$/g, '');

//         // Fetch all businesses directly
//         const resp = await axios.get(`${base}/businesses/all`, { headers: API_KEY ? { 'x-api-key': API_KEY } : {} });
//         let dataArr = resp.data?.data ?? resp.data ?? [];
//         if (!Array.isArray(dataArr) && typeof dataArr === 'object') dataArr = Object.values(dataArr);

//         // Shuffle and pick 8 random businesses each page load
//         const shuffled = dataArr.sort(() => Math.random() - 0.5).slice(0, 8);

//         const mappedData = shuffled.map((biz, idx) => ({
//           id: biz.id || `biz-${idx}`,
//           title: biz.business_name || biz.name || 'Unnamed Business',
//           description: biz.description || 'No description available',
//           rating: biz.average_rating || 0,
//           reviews: biz.total_reviews || biz.reviews || 0,
//           location: biz.address || biz.city || 'Not specified',
//           imageSrc: biz.image_url || '/images/default.svg',
//         }));

//         setExperiences(mappedData);
//       } catch (err) {
//         setError(err.response ? err.response.data : err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBusinesses();
//   }, [API_BASE, API_KEY]);

//   // if (loading) return <div>Loading restaurant categories…</div>;
//   if (loading) {
//   return (
//     <div className="flex justify-center items-center py-20">
//       <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
//     </div>
//   );
// }
//   if (error) return <div>Error: {JSON.stringify(error)}</div>;

//   return (
//     <div id="featured-category" className="bg-gray-50 py-6 font-sans antialiased">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Title */}
//         <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
//             {/* Left Gradient Line */}
//             <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
//                 style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
//             ></div>

//             {/* Title */}
//             <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
//                 Featured Experiences
//             </div>

//             {/* Right Gradient Line */}
//             <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
//             ></div>
//         </div>
//         {experiences.length === 0 ? (
//           <div className="text-center text-gray-500 py-10 text-lg">
//             No businesses are available for this category.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
//             {experiences.map((experience, index) => (
//               <ExperienceCard key={index} {...experience} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../images/star.svg';
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
            className="w-full h-[252px] object-contain bg-amber-100 rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2">{description.split(" ").slice(0, 5).join(" ")}...</p>
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

export default function FeaturedExperiences() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  // we'll fetch from the global businesses endpoint and sample across all categories

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        setLoading(true);

        const base = API_BASE.replace(/\/+$/g, '');

        // Primary strategy: fetch categories, then fetch businesses per category until we gather enough
        const catsResp = await axios.get(`${base}/categories/all`, { headers: API_KEY ? { 'x-api-key': API_KEY } : {} });
        const allCats = catsResp.data?.data ?? catsResp.data ?? [];

        const agg = [];
        for (const mainCat of allCats) {
          const slug = mainCat.slug || (mainCat.name || '').toLowerCase().replace(/\s+/g, '-');
          if (!slug) continue;
          try {
            const resp = await axios.get(`${base}/categories/${slug}/businesses?page=1&limit=100`, { headers: API_KEY ? { 'x-api-key': API_KEY } : {} });
            let arr = resp.data?.data ?? resp.data;
            if (arr && arr.data) arr = arr.data;
            if (!Array.isArray(arr) && typeof arr === 'object') arr = Object.values(arr);
            if (Array.isArray(arr) && arr.length) {
              agg.push(...arr);
            }
          } catch (e) {
            // ignore per-category failures and continue
            // keep minimal logging to avoid noise
            console.debug && console.debug('Failed to fetch businesses for category', slug, e.response?.status ?? '', e.response?.data?.message ?? e.message);
          }
          if (agg.length >= 8) break;
        }

        let dataArr = Array.isArray(agg) ? agg : [];

        // Shuffle and pick 8 random businesses each page load
        const shuffled = dataArr.sort(() => Math.random() - 0.5).slice(0, 8);

        const mappedData = shuffled.map((biz, idx) => ({
          id: biz.id || `biz-${idx}`,
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
  }, [API_BASE, API_KEY]);

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
    <div id="featured-category" className="bg-gray-50 py-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
            {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
                style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                Featured Experiences
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{ borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)", borderImageSlice: 1, }}
            ></div>
        </div>
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

