import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function SalonList({ subcategorySlug = 'Spa & Skin Care' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
