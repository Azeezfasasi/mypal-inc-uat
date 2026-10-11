import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function LuxuryLists({ subcategorySlug = 'Luxury on Demand' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
