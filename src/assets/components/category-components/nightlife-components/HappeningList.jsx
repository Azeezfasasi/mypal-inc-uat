import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function HappeningList({ subcategorySlug = 'Happening this month' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
