import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function BeachesAndResortAccomList({ subcategorySlug = 'Beach Resort Accommodation' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
