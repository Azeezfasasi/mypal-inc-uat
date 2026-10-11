import React from 'react';
import CategoryBusinessList from '../CategoryBusinessList';

export default function PacksRecreationLists({ subcategorySlug = 'Parks & Recreation' }) {
  return <CategoryBusinessList category={subcategorySlug} />;
}
