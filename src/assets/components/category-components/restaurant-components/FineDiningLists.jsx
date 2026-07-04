import React, { useEffect, useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import star from '../../../images/star.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useCategories from '../../../../hooks/useCategories';
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
            className="w-full h-[252px] object-fill rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1 bebas-font">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2 mont-normal-font">{description.split(" ").slice(0, 20).join(" ")}</p>
        <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
          <div className='flex flex-row justify-start items-center'>
            <img src={star} alt="star" />
            <span className="font-semibold text-[14.5px] text-gray-700 mr-0 bebas-font">{rating}</span>
            <span className="text-[14.5px] mr-0 bebas-font">({reviews})</span>
          </div>
          <div className='flex flex-row justify-start items-center'>
            <MapPin className="w-4 h-4 text-gray-400 mr-1" />
            <span className='text-[14.5px] mont-normal-font'>
              {location?.length > 10 ? location.slice(0, 12) + "…" : location}
            </span>
          </div>
        </div>
        <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
          <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans bebas-font">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default function FineDiningLists({ subcategorySlug = 'Fine Dining' }) {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  // We no longer hardcode a backend category ID. Instead we accept a
  // `subcategorySlug` prop (defaults to 'event-nights') and resolve the
  // category ID by fetching `/categories/all` at runtime.
  const { loading: catsLoading, error: catsError, findBySlug } = useCategories();

  useEffect(() => {
    async function fetchBusinesses() {
      try {
        const subcategory = findBySlug(subcategorySlug);

        if (!subcategory) {
          setExperiences([]);
          setLoading(false);
          return;
        }

        if (!API_BASE || !API_KEY) {
          console.warn('FineDining: missing API_BASE or API_KEY, aborting fetch');
          setExperiences([]);
          setLoading(false);
          return;
        }

        const filterCategoryId = subcategory.id;
        console.log('🔍 FineDining filterCategoryId:', filterCategoryId);
        console.log('🔍 FineDining subcategory:', subcategory);

        // Paginate the category endpoint to collect all pages
        const allBusinesses = [];
        let page = 1;
        const limit = 100; // reasonable page size
        let keepFetching = true;
        const MAX_CATEGORY_PAGES = 1000; // safety cap

        while (keepFetching && page <= MAX_CATEGORY_PAGES) {
          const resp = await axios.get(`${API_BASE}/business-categories/${filterCategoryId}/businesses`, {
            headers: { 'x-api-key': API_KEY },
            params: { page, limit },
          });

          console.log(`📦 FineDining API Response page ${page}:`, resp.data);

          const respBody = resp.data ?? {};
          const payload = respBody.data ?? respBody;

          // extract items and pagination metadata
          let items = [];
          let hasNext = false;
          let currentPage = page;
          let totalPages = null;

          if (payload) {
            if (Array.isArray(payload.data)) items = payload.data;
            else if (Array.isArray(payload)) items = payload;
            else if (payload.items && Array.isArray(payload.items)) items = payload.items;

            if (payload.hasNext != null) hasNext = Boolean(payload.hasNext);
            if (payload.page != null) currentPage = Number(payload.page) || page;
            if (payload.totalPages != null) totalPages = Number(payload.totalPages);
          }

          console.log(`📋 FineDining page ${page}: fetched ${items.length} items, hasNext=${hasNext}, totalPages=${totalPages}`);

          if (items.length) allBusinesses.push(...items);

          if (hasNext) {
            page += 1;
            continue;
          }

          if (totalPages != null && currentPage < totalPages) {
            page = currentPage + 1;
            continue;
          }

          keepFetching = false;
        }

        const mappedData = allBusinesses.map((biz) => ({
          id: biz.id,
          title: biz.business_name || biz.name || 'Unnamed Business',
          description: biz.description || 'No description available',
          rating: biz.average_rating || 0,
          reviews: biz.total_reviews || biz.reviews || 0,
          location: biz.address || biz.city || 'Not specified',
          imageSrc: biz.image_url || '/images/default.svg',
        }));

        console.log(`📋 FineDining: Got ${mappedData.length} businesses from category endpoint`);

        // If backend reports more businesses than we fetched, run a global fallback scan
        const expectedCount = Number(subcategory.total_businesses || 0);
        let finalData = mappedData;

        if (expectedCount > mappedData.length) {
          console.warn(`FineDining: expected ${expectedCount} businesses but fetched ${mappedData.length}. Running fallback scan of /businesses/all`);

          const seen = new Map(finalData.map((b) => [b.id, b]));
          const aggr = [];

          let gPage = 1;
          const gLimit = 1000;
          let gKeep = true;
          const MAX_GLOBAL_PAGES = 1000;

          while (gKeep && gPage <= MAX_GLOBAL_PAGES) {
            const gres = await axios.get(`${API_BASE}/businesses/all`, {
              headers: { 'x-api-key': API_KEY },
              params: { page: gPage, limit: gLimit },
            });

            const gbody = gres.data ?? {};
            const gpayload = gbody.data ?? gbody;

            let gitems = [];
            let gHasNext = false;
            let gCurrent = gPage;
            let gTotal = null;

            if (gpayload) {
              if (Array.isArray(gpayload.data)) gitems = gpayload.data;
              else if (Array.isArray(gpayload)) gitems = gpayload;
              else if (gpayload.items && Array.isArray(gpayload.items)) gitems = gpayload.items;

              if (gpayload.hasNext != null) gHasNext = Boolean(gpayload.hasNext);
              if (gpayload.page != null) gCurrent = Number(gpayload.page) || gPage;
              if (gpayload.totalPages != null) gTotal = Number(gpayload.totalPages);
            }

            // keep only those in the target category
            const matched = gitems.filter((b) => {
              if (!b) return false;
              if (b.category && (b.category.id === filterCategoryId || String(b.category.id) === String(filterCategoryId))) return true;
              if (Array.isArray(b.categories)) return b.categories.some((c) => c && (c.id === filterCategoryId || String(c.id) === String(filterCategoryId)));
              return false;
            });

            for (const biz of matched) {
              if (!seen.has(biz.id)) {
                const normalized = {
                  id: biz.id,
                  title: biz.business_name || biz.name || 'Unnamed Business',
                  description: biz.description || 'No description available',
                  rating: biz.average_rating || 0,
                  reviews: biz.total_reviews || biz.reviews || 0,
                  location: biz.address || biz.city || 'Not specified',
                  imageSrc: biz.image_url || '/images/default.svg',
                };
                seen.set(biz.id, normalized);
                aggr.push(normalized);
              }
            }

            if (gHasNext) {
              gPage += 1;
              continue;
            }
            if (gTotal != null && gCurrent < gTotal) {
              gPage = gCurrent + 1;
              continue;
            }
            gKeep = false;
          }

          if (aggr.length) finalData = [...finalData, ...aggr];
        }

        console.log(`📋 FineDining: total businesses fetched after fallback ${finalData.length}`);
        setExperiences(finalData);
      } catch (err) {
        console.error('FineDining fetch error', err);
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    if (catsLoading) return;
    if (catsError) {
      setError(catsError);
      setLoading(false);
      return;
    }

    fetchBusinesses();
  }, [API_BASE, API_KEY, subcategorySlug, catsLoading, catsError, findBySlug]);

  // if (loading) return <div>Loading restaurant categories…</div>;
  if (loading) {
  return (
    <div className="flex justify-center items-center py-20">
      <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
    </div>
  );
}
  
  if (error) return (
    <div className="text-center text-red-500 py-10 text-lg bebas-font">
      No businesses are available for this category. Check back later or explore other categories!
    </div>
  );

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
