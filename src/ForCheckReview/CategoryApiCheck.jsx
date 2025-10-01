// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function CategoryApiCheck() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_BASE = import.meta.env.VITE_API_BASE_URL;
//   const API_KEY = import.meta.env.VITE_API_KEY;

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await axios.get(`${API_BASE}/categories/all`, {
//           headers: {
//             "x-api-key": API_KEY,
//           },
//         });

//         const catArray = response.data.data ?? response.data;
//         setCategories(catArray);
//       } catch (err) {
//         setError(err.response ? err.response.data : err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchCategories();
//   }, [API_BASE, API_KEY]);

//   if (loading) return <div>Loading categories…</div>;
//   if (error) return <div>Error: {JSON.stringify(error)}</div>;

//   return (
//     <div>
//       <h1 className="text-red-600 text-[24px] font-bold border border-solid border-red-600 py-2 pl-2">All Categories API DATA</h1>
//       <ul>
//         {categories.map((mainCat) => (
//           <li key={mainCat.id}>
//             <strong>{mainCat.name}</strong> – {mainCat.description}
//             {mainCat.categories && mainCat.categories.length > 0 && (
//               <ul>
//                 {mainCat.categories.map((subCat) => (
//                   <li key={subCat.id}>
//                     {subCat.name} (ID: {subCat.id})
//                     {subCat.image_url && (
//                       <img
//                         src={subCat.image_url}
//                         alt={subCat.name}
//                         style={{ width: "60px", marginLeft: "10px" }}
//                       />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <header className="bg-gray-900 text-white sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-2">
                <div className="flex-shrink-0">
                    <Link to="/" className="text-cyan-400 text-2xl font-bold tracking-wide">MyApp</Link>
                </div>
                <nav
                    className={`
                        fixed md:static top-0 right-0 h-full md:h-auto w-56 md:w-auto bg-gray-900 md:bg-transparent flex flex-col md:flex-row md:items-center md:gap-8 gap-6 pt-20 md:pt-0 px-6 md:px-0 transition-all duration-300 ease-in-out
                        shadow-lg md:shadow-none
                        ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0
                        ${menuOpen ? 'block' : 'hidden'} md:flex
                    `}
                >
                    <ul className="flex flex-col md:flex-row gap-6 md:gap-8 w-full md:w-auto">
                        <li><Link to="/" className="hover:text-cyan-400 transition-colors bg-white" onClick={() => setMenuOpen(false)}>Home</Link></li>
                        <li><Link to="/login" className="hover:text-cyan-400 transition-colors" onClick={() => setMenuOpen(false)}>Login</Link></li>
                        <li><Link to="/Register" className="hover:text-cyan-400 transition-colors" onClick={() => setMenuOpen(false)}>Register</Link></li>
                        <li><Link to="/dashboard/dashboard" className="hover:text-cyan-400 transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link></li>
                    </ul>
                </nav>
                {/* Hamburger Button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none z-50"
                    onClick={handleMenuToggle}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-7 h-1 bg-white rounded my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                {/* Overlay for mobile menu */}
                {menuOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40 sz-20 md:hidden"
                        onClick={() => setMenuOpen(false)}
                    >
                      <li><Link to="/" className="hover:text-cyan-400 transition-colors" onClick={() => setMenuOpen(false)}>Home</Link></li>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;