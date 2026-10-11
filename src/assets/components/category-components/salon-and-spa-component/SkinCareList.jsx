import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function SkincareList({ subcategorySlug = 'Spa & Skin Care' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
