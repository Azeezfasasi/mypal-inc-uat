// import React from 'react';
// import { Link } from 'react-router-dom';
// import finediningimg from '../../../images/finediningimg.svg'
// import buffetimg from '../../../images/buffetimg.svg'
// import delicaciesimg from '../../../images/delicaciesimg.svg'

// // Main component that contains all the cards
// export default function AccommodationCategory() {
//   const categories = [
//     {
//       title: 'HOTELS',
//       image: finediningimg,
//       alt: 'A classy restaurant interior with hanging lights and a bar.',
//       link: '/category/accommodation',
//     },
//     {
//       title: 'SHOTLETS',
//       image: buffetimg,
//       alt: 'A bustling scene of people enjoying a buffet.',
//       link: '/category/accommodation',
//     },
//     {
//       title: 'SERVICED APARTMENTS',
//       image: delicaciesimg,
//       alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
//       link: '/category/accommodation',
//     },
//   ];

//   return (
//     <div className="bg-white flex items-center justify-center p-4 sm:p-8">
//       <div className="container mx-auto">
//         <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
//           {categories.map((category, index) => (
//             <Link
//               key={index}
//               to={category.link}
//               className="bg-[rgba(0,0,0,0.40)] relative w-full h-[300px] md:h-[563px] max-w-sm overflow-hidden rounded-[10px] shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
//             >
//               {/* Image with a dark overlay */}
//                 <img
//                     src={category.image}
//                     alt={category.alt}
//                     className="w-full h-full object-cover rounded-[20px]"
//                 />

//               {/* Text centered on the card */}
//               <div className="absolute inset-0 flex items-center justify-center p-4">
//                 <h2 className="text-white text-3xl sm:text-4xl font-extrabold text-center drop-shadow-lg">
//                   {category.title}
//                 </h2>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AccommodationCategory() {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${API_BASE}/categories/all`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        const categoriesArray = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        // Find the "Accommodation" category
        const accommodationCategory = categoriesArray.find(
          (cat) => cat.slug === "accommodation"
        );

        if (accommodationCategory) {
          setSubCategories(accommodationCategory.categories || []);
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [API_BASE, API_KEY]);

  if (loading) return <div>Loading accommodation…</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
          {subCategories.map((category) => (
            <Link
              key={category.id}
              to={`/accommodation/${category.name
                .toLowerCase()
                .replace(/\s+/g, "")}`}
              className="bg-[rgba(0,0,0,0.40)] relative w-full h-[300px] md:h-[563px] max-w-sm overflow-hidden rounded-[10px] shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {/* Image */}
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover rounded-[20px]"
              />

              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h2 className="text-white text-3xl sm:text-4xl font-extrabold text-center drop-shadow-lg">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
