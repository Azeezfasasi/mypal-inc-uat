import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function ConcertAndShowsList({ subcategorySlug = 'Concerts & Shows' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
