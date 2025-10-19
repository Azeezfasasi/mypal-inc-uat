import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useCategories from '../hooks/useCategories';
import { Commet } from 'react-loading-indicators';
import { Link } from 'react-router-dom';

const ExperienceCard = ({ id, imageSrc, title, description, rating, reviews, location }) => (
  <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
    <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
      <Link to={`/services/servicedetails/${id}`}>
        <img src={imageSrc} alt={title} className="w-full h-[252px] object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105" />
      </Link>
    </div>

    <div className="p-4 sm:p-6">
      <Link to={`/services/servicedetails/${id}`} className="text-lg font-bold text-gray-800 mb-1">{title}</Link>
      <p className="text-[15px] text-gray-500 mb-2">{description}</p>
      <div className="w-full flex justify-between items-center text-sm text-gray-500 mb-4">
        <div className='flex flex-row justify-start items-center'>
          <span className="font-semibold text-[14.5px] text-gray-700 mr-0">{rating}</span>
          <span className="text-[14.5px] mr-0">({reviews})</span>
        </div>
        <div className='flex flex-row justify-start items-center'>
          <span className='text-[14.5px]'>
            {location?.length > 10 ? location.slice(0, 12) + "…" : location}
          </span>
        </div>
      </div>
      <Link to={`/services/servicedetails/${id}`} className="flex justify-center">
        <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans">View Details</button>
      </Link>
    </div>
  </div>
);

export default function BusinessListBySlug() {
  const { segmentSlug, subcategorySlug } = useParams();
  const { findBySlug, loading: catsLoading, error: catsError } = useCategories();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        if (catsLoading) return;
        if (catsError) throw catsError;

        // find the subcategory using either segmentSlug or subcategorySlug
        const target = findBySlug(subcategorySlug) || findBySlug(segmentSlug);
        if (!target) {
          setBusinesses([]);
          setLoading(false);
          return;
        }

        const parentSlug = target._parentSlug || target.slug || segmentSlug;
        const resp = await axios.get(`${API_BASE}/categories/${parentSlug}/businesses?categoryId=${target.id}`, { headers: { 'x-api-key': API_KEY } });
        let dataArr = resp.data?.data ?? resp.data;
        if (dataArr && dataArr.data) dataArr = dataArr.data;
        if (!Array.isArray(dataArr)) dataArr = dataArr ? Object.values(dataArr) : [];

        const mapped = dataArr.map(biz => ({
          id: biz.id,
          title: biz.business_name || biz.name || 'Unnamed Business',
          description: biz.description || 'No description available',
          rating: biz.average_rating || 0,
          reviews: biz.total_reviews || biz.reviews || 0,
          location: biz.address || biz.city || 'Not specified',
          imageSrc: biz.image_url || '/images/default.svg',
        }));

        setBusinesses(mapped);
      } catch (err) {
        setError(err.response ? err.response.data : err.message || err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [segmentSlug, subcategorySlug, findBySlug, catsLoading, catsError, API_BASE, API_KEY]);

  if (loading) return <div className="flex justify-center items-center py-20"><Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8"/></div>;
  if (error) return <div className="p-6 text-red-600">Error: {JSON.stringify(error)}</div>;

  return (
    <div className="bg-gray-50 py-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {businesses.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg">No businesses are available for this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
            {businesses.map((b, i) => <ExperienceCard key={i} {...b} />)}
          </div>
        )}
      </div>
    </div>
  );
}
