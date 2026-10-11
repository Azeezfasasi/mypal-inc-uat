import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function FoodAndDrinkList({ subcategorySlug = 'Food & Drinks' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
