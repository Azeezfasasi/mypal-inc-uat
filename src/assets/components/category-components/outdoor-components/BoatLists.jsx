import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function BoatLists({ subcategorySlug = 'Boat & Yacht Cruises' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
