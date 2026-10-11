import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function IconicLists({ subcategorySlug = 'Iconic Delicacies' }) {
  return <CategoryBusinessList category={subcategorySlug} imageFit="object-fill" />;
}
