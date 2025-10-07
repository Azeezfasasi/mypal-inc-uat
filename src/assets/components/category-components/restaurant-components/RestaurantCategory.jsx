import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Commet } from "react-loading-indicators";

export default function RestaurantCategory() {
  const [subCategories, setSubCategories] = useState([]);
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

        // ✅ response.data is an array
        const categoriesArray = Array.isArray(response.data)
          ? response.data
          : response.data.data;

        const restaurantCategory = categoriesArray.find(
          (cat) => cat.slug === "restaurants"
        );

        if (restaurantCategory) {
          setSubCategories(restaurantCategory.categories || []);
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [API_BASE, API_KEY]);

  // if (loading) return <div>Loading restaurant categories…</div>;
  if (loading) {
  return (
    <div className="flex justify-center items-center py-20">
      <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
    </div>
  );
}

  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="container mx-auto">
        {/* <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6"> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-6 items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
          {subCategories.map((category) => (
            <Link
              key={category.id}
              to={`/restaurant/${category.name
                .toLowerCase()
                .replace(/\s+/g, "")}`}
              className="relative w-full h-[300px] md:h-[563px] max-w-lg overflow-hidden rounded-[10px] shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {/* Image */}
              <img
                src={category.image_url}
                alt={category.name}
                className="w-full h-full object-cover rounded-[20px]"
              />

              {/* Text overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h2 className="text-white text-3xl sm:text-4xl font-extrabold text-center tracking-wide leading-tight drop-shadow-lg">
                  {category.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


