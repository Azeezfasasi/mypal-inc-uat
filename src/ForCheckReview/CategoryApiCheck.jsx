import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryApiCheck() {
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
      <h1 className="text-red-600 text-[24px] font-bold border border-solid border-red-600 py-2 pl-2">All Categories API DATA</h1>
      <ul>
        {categories.map((mainCat) => (
          <li key={mainCat.id}>
            <strong>{mainCat.name}</strong> – {mainCat.description}
            {mainCat.categories && mainCat.categories.length > 0 && (
              <ul>
                {mainCat.categories.map((subCat) => (
                  <li key={subCat.id}>
                    {subCat.name} (ID: {subCat.id})
                    {subCat.image_url && (
                      <img
                        src={subCat.image_url}
                        alt={subCat.name}
                        style={{ width: "60px", marginLeft: "10px" }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
