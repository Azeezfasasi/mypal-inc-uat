import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function HouseholdLists({ subcategorySlug = 'Household Logistics' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
