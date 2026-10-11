import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function InCityLists({ subcategorySlug = 'In-City Rides' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
