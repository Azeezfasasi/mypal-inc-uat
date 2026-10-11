import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function ShortLetList({ subcategorySlug = 'Short-let Homes & Beach Houses' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
