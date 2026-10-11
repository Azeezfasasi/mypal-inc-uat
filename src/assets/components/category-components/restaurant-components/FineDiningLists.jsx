import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function FineDiningLists({ subcategorySlug = 'Fine Dining' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
