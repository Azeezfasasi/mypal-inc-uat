import React from 'react';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Commet } from 'react-loading-indicators';
import star from '../../images/star.svg';
import useCategories from '../../../hooks/useCategories';
import { apiHeaders, apiUrl, unwrapList } from '../../../lib/api';

const PAGE_SIZE = 20;

const toCard = (biz) => ({
  id: biz.id,
  title: biz.business_name || biz.name || 'Unnamed Business',
  description: biz.description || 'No description available',
  rating: Number(biz.average_rating) || 0,
  reviews: Number(biz.total_reviews) || 0,
  location: biz.address || biz.city || 'Not specified',
  imageSrc: biz.image_url || '/images/default.svg',
});

export function ExperienceCard({ id, imageSrc, title, description, rating, reviews, location, imageFit = 'object-cover' }) {
  const href = `/services/servicedetails/${id}`;
  return (
    <div className="group bg-white rounded-[16.2px] border border-solid border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="relative overflow-hidden aspect-w-4 aspect-h-3">
        <Link to={href}>
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            className={`w-full h-[252px] ${imageFit} rounded-t-3xl transition-transform duration-300 group-hover:scale-105`}
          />
        </Link>
      </div>

      <div className="p-4 sm:p-6">
        <Link to={href} className="text-lg font-bold text-gray-800 mb-1 bebas-font">{title}</Link>
        <p className="text-[15px] text-gray-500 mb-2 mont-normal-font">{description.split(' ').slice(0, 20).join(' ')}</p>
        <div className="w-full flex justify-between items-center gap-3 text-sm text-gray-500 mb-4">
          <div className="flex flex-row justify-start items-center shrink-0">
            <img src={star} alt="" />
            <span className="font-semibold text-[14.5px] text-gray-700 mr-0 bebas-font">{rating.toFixed(1)}</span>
            <span className="text-[14.5px] mr-0 bebas-font">({reviews})</span>
          </div>
          <div className="flex flex-row justify-end items-center min-w-0">
            <MapPin className="w-4 h-4 text-gray-400 mr-1 shrink-0" />
            <span className="text-[14.5px] mont-normal-font truncate" title={location}>{location}</span>
          </div>
        </div>
        <Link to={href} className="flex justify-center">
          <button className="w-full py-2 px-4 rounded-full text-sm transition-colors duration-300 border border-solid border-gray-300 group-hover:bg-orange-600 group-hover:text-white text-black text-center font-sans bebas-font">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}

/**
 * Businesses for one category (looked up by name, e.g. "Fine Dining") or,
 * when the name matches a whole segment (e.g. "restaurants"), every business
 * in that segment. Loads PAGE_SIZE at a time with a "Load more" button.
 */
export default function CategoryBusinessList({ category, imageFit }) {
  const { loading: catsLoading, error: catsError, findBySlug } = useCategories();
  const match = catsLoading ? null : findBySlug(category);

  const endpoint = match
    ? match._isSegment
      ? apiUrl(`/categories/${encodeURIComponent(match.slug)}/businesses`)
      : apiUrl(`/business-categories/${match.id}/businesses`)
    : null;

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['category-businesses', endpoint],
    queryFn: async ({ pageParam }) => {
      const resp = await axios.get(endpoint, {
        headers: apiHeaders(),
        params: { page: pageParam, limit: PAGE_SIZE },
      });
      return unwrapList(resp.data);
    },
    initialPageParam: 1,
    getNextPageParam: (last) => (last.hasNext ? last.page + 1 : undefined),
    enabled: Boolean(endpoint),
    staleTime: 1000 * 60 * 2,
  });

  if (catsLoading || (endpoint && isLoading)) {
    return (
      <div className="flex justify-center items-center py-20">
        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
      </div>
    );
  }

  if (catsError || error) {
    return (
      <div className="text-center text-gray-600 py-10 text-lg mont-normal-font">
        We couldn&apos;t load businesses right now. Please try again shortly.
      </div>
    );
  }

  const businesses = (data?.pages ?? []).flatMap((page) => page.items).map(toCard);

  return (
    <div className="bg-gray-50 py-6 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {businesses.length === 0 ? (
          <div className="text-center text-gray-500 py-10 text-lg">
            No businesses are available for this category. Check back later or explore other categories!
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 cursor-pointer">
              {businesses.map((business) => (
                <ExperienceCard key={business.id} {...business} imageFit={imageFit} />
              ))}
            </div>
            {hasNextPage && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 py-3 rounded-full border border-solid border-gray-300 bg-white hover:bg-orange-600 hover:text-white transition-colors duration-300 bebas-font disabled:opacity-60"
                >
                  {isFetchingNextPage ? 'Loading…' : 'Load more'}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
