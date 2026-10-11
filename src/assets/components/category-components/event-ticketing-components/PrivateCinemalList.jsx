import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function PrivateCinemaList({ subcategorySlug = 'Private Cinemas' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
