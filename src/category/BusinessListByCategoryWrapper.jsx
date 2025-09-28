import React from 'react';
import { useParams } from 'react-router-dom';
import BusinessListByCategory from './BusinessListByCategory';

export default function BusinessListByCategoryWrapper() {
  const { categoryId } = useParams();
  return <BusinessListByCategory categoryId={categoryId} />;
}
