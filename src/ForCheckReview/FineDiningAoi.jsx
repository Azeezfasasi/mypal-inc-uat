import React, { useEffect, useState } from "react";
import axios from "axios";

const cuisines = [
  "Chinese", "Italian", "Mexican", "Indian", "American", "Asian",
  "French", "Lebanese", "Nigerian", "Continental", "African",
  "Egyptian", "Spanish", "Brazilian", "Greek", "Caribbean", "Oriental"
];

const FineDiningAPIViewer = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [selectedCuisine, setSelectedCuisine] = useState(cuisines[0]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (cuisine) => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = API_BASE.endsWith("/v1") ? API_BASE : `${API_BASE}/v1`;
      const url = `${baseUrl}/fine-dining/by-cuisine`;

      console.log("Fetching from:", url);

      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
        },
        params: {
          cuisineCategoryName: cuisine, // dynamic cuisine param
        },
      });

      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when selectedCuisine changes
  useEffect(() => {
    fetchData(selectedCuisine);
  }, [selectedCuisine]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Fine Dining by Cuisine</h2>

      {/* Dropdown */}
      <select
        value={selectedCuisine}
        onChange={(e) => setSelectedCuisine(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        {cuisines.map((cuisine) => (
          <option key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>

      {/* Loading / Error / Data */}
      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <pre className="bg-black text-green-400 p-3 rounded-lg overflow-x-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default FineDiningAPIViewer;
