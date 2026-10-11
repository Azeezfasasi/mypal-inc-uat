import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function BuffetLists({ subcategorySlug = 'Buffet services' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
