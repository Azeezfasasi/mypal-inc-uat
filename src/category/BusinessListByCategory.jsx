import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BusinessListByCategory({ categoryId }) {
  console.log('BusinessListByCategory mounted. categoryId:', categoryId);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchBusinesses() {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${API_BASE}/business-categories/${categoryId}/businesses`;
        const response = await axios.get(endpoint, {
          headers: { 'x-api-key': API_KEY },
        });
        const dataArray = Array.isArray(response.data?.data?.data)
          ? response.data.data.data
          : [];
        setBusinesses(dataArray);
      } catch (err) {
        console.error('API error:', err);
        setError(err.response?.data?.message || err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    if (API_BASE && API_KEY && categoryId) fetchBusinesses();
    else setError('Configuration Error: API_BASE, API_KEY, or Category ID missing.');
  }, [API_BASE, API_KEY, categoryId]);

  if (loading) return <p>Loading businesses...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!businesses.length) return <p>No businesses found for this category.</p>;

  return (
    <div>
      <h2>Businesses in Category</h2>
      <ul>
        {businesses.map(biz => (
          <li key={biz.id}>
            <strong>{biz.business_name}</strong> <br />
            ID: {biz.id}
          </li>
        ))}
      </ul>
    </div>
  );
}
