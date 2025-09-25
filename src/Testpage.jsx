import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Testpage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${API_BASE}/categories/all`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });

        const catArray = response.data.data ?? response.data;
        setCategories(catArray);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [API_BASE, API_KEY]);

  if (loading) return <div>Loading categories…</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id ?? cat.slug}>
            {cat.name} {cat.slug && `(${cat.slug})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

