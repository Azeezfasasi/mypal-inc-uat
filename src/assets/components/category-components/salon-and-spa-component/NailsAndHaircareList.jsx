import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function NailsAndHaircareList({ subcategorySlug = 'Nail & Hair Care' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
