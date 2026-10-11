import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function FestivalAndCorporateList({ subcategorySlug = 'Festivals & Corporate Promotions' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
