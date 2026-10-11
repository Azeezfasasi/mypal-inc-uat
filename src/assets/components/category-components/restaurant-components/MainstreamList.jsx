import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

// "restaurants" is a segment slug, so this lists every business in the segment
export default function MainstreamLists({ subcategorySlug = 'restaurants' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
