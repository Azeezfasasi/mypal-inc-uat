import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function BeachesLists({ subcategorySlug = 'Beaches & Resorts' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
