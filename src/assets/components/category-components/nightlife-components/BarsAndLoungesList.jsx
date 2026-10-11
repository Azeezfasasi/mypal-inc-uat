import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function BarsAndLoungesList({ subcategorySlug = 'Bars & Lounges' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
