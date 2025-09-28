import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export default function AllBusinessDetails() {
  // Explorer state
  const [exploreId, setExploreId] = useState("");
  const [exploreData, setExploreData] = useState(null);
  const [exploreLoading, setExploreLoading] = useState(false);
  const [exploreError, setExploreError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [businessesByCategory, setBusinessesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        // 1️⃣ Fetch all segments and categories
        const segResp = await axios.get(`${API_BASE}/categories/all`, {
          headers: { "x-api-key": API_KEY },
        });
        const segments = Array.isArray(segResp.data?.data)
          ? segResp.data.data
          : [];

        if (!segments.length) {
          setError("No segments found.");
          setLoading(false);
          return;
        }

        // Flatten all categories from all segments
        const allCategories = segments.flatMap(seg => seg.categories || []);
        setCategories(allCategories);

        // 2️⃣ Fetch businesses for each category (by slug)
        const categoryResults = {};
        for (const category of allCategories) {
          if (!category.slug) continue; // Skip categories without a valid slug
          try {
            const bizListResp = await axios.get(
              `${API_BASE}/categories/${category.slug}/businesses`,
              { headers: { "x-api-key": API_KEY } }
            );
            const bizList = Array.isArray(bizListResp.data?.data)
              ? bizListResp.data.data
              : [];

            // 3️⃣ Fetch details for each business
            const detailedBusinesses = await Promise.all(
              bizList.map(async (biz) => {
                try {
                  const bizDetailResp = await axios.get(
                    `${API_BASE}/businesses/${biz.id}`,
                    { headers: { "x-api-key": API_KEY } }
                  );
                  return bizDetailResp.data?.data || null;
                } catch (err) {
                  console.error(`Error fetching business ${biz.id}:`, err);
                  return null;
                }
              })
            );
            categoryResults[category.slug] = detailedBusinesses.filter(Boolean);
          } catch (err) {
            console.error(`Error fetching businesses for category ${category.name}:`, err);
            categoryResults[category.slug] = [];
          }
        }
        setBusinessesByCategory(categoryResults);
      } catch (err) {
        console.error("Error fetching segments:", err);
        setError(err.response?.data?.message || err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (API_BASE && API_KEY) {
      fetchAllData();
    } else {
      setError("Configuration Error: API_BASE or API_KEY missing.");
      setLoading(false);
    }
  }, []);


  // Explorer fetch function
  const handleExplore = async () => {
    if (!exploreId) return;
    setExploreLoading(true);
    setExploreError(null);
    setExploreData(null);
    try {
      const res = await axios.get(`${API_BASE}/businesses/${exploreId}`, {
        headers: { "x-api-key": API_KEY },
      });
      setExploreData(res.data);
    } catch (err) {
      setExploreError(err.response?.data?.message || err.message || "Unknown error");
    } finally {
      setExploreLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading all businesses…</p>;
  if (error) return <p className="text-center py-10 text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-10">All Business Categories & Details</h1>

      {/* Business Data Explorer */}
      <div className="mb-10 p-6 bg-gray-50 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Business Data Explorer</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Business ID"
            value={exploreId}
            onChange={e => setExploreId(e.target.value)}
            className="border rounded p-2 flex-1"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleExplore}
            disabled={exploreLoading || !exploreId}
          >Fetch Data</button>
        </div>
        {exploreLoading && <p className="text-gray-600">Loading business data…</p>}
        {exploreError && <p className="text-red-600">Error: {exploreError}</p>}
        {exploreData && (
          <pre className="bg-white border rounded p-4 overflow-x-auto text-xs max-h-96">{JSON.stringify(exploreData, null, 2)}</pre>
        )}
      </div>

      {/* ...existing code for categories and businesses... */}
      {categories.map((category) => {
        const businesses = businessesByCategory[category.slug] || [];

        return (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">{category.name}</h2>

            {businesses.length === 0 ? (
              <p className="text-gray-600 mb-4">No businesses found for this category.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {businesses.map((biz) => (
                  <div key={biz.id} className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-2">{biz.business_name}</h3>
                    <p className="text-gray-600 mb-2">{biz.description || "No description"}</p>
                    {biz.image_url && (
                      <img src={biz.image_url} alt={biz.business_name} className="w-full h-48 object-cover mb-2 rounded" />
                    )}
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Location:</strong> {biz.city}, {biz.state}, {biz.country}
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Rating:</strong> {biz.average_rating ?? "N/A"} ⭐
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                      <strong>Total Reviews:</strong> {biz.total_reviews ?? 0}
                    </p>

                    {biz.operating_days?.length > 0 && (
                      <div className="mt-2">
                        <strong>Operating Days:</strong>
                        <ul className="list-disc pl-6 text-sm text-gray-600">
                          {biz.operating_days.map((day, idx) => (
                            <li key={idx}>{day}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {biz.blackout_days?.length > 0 && (
                      <div className="mt-2">
                        <strong>Blackout Days:</strong>
                        <ul className="list-disc pl-6 text-sm text-gray-600">
                          {biz.blackout_days.map((day, idx) => (
                            <li key={idx}>{day}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {biz.reviews?.length > 0 && (
                      <div className="mt-3">
                        <strong>Reviews:</strong>
                        <ul className="space-y-2 text-sm">
                          {biz.reviews.map((review, idx) => (
                            <li key={idx} className="border p-2 rounded">
                              <p><strong>{review.user_name}</strong>: {review.comment}</p>
                              <p>Rating: {review.rating}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {biz.attractions?.length > 0 && (
                      <div className="mt-3">
                        <strong>Attractions:</strong>
                        <ul className="list-disc pl-6 text-sm text-gray-600">
                          {biz.attractions.map((attr, idx) => (
                            <li key={idx}>{attr}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {biz.tripadvisor_rating && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>TripAdvisor Rating:</strong> {biz.tripadvisor_rating}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
