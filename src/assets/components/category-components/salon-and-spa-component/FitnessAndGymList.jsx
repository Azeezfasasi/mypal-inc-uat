import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function FitnessAndGymList({ subcategorySlug = 'Fitness & Gym' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
