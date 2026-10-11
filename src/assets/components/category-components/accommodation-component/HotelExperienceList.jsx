import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function HotelExperienceLists({ subcategorySlug = 'Hotel Experience' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
