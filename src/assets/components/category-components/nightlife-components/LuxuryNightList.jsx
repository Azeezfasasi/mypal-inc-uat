import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function LuxuryNightList({ subcategorySlug = 'Luxury Nightlife' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
