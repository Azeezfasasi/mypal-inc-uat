import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function ClubList({ subcategorySlug = 'Clubbing & Parties' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
