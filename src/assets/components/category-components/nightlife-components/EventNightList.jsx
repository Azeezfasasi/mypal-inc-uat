import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function EventNightList({ subcategorySlug = 'Events Nights' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
