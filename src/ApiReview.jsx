import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllBusinesses() {
  const [allBusinesses, setAllBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // List all category IDs and names here
  const categories = [
    { id: "4a85050b-da46-4fb6-8bf0-6eee16858d00", name: "Fine Dining" },
    { id: "078b9583-a2b2-4a8b-8d48-4a90c17b36f8", name: "Buffet Services" },
    { id: "a43d3564-1964-4eca-9490-f1cfdc5e0d94", name: "Iconic Delicacies" },
    { id: "c194feb4-34c5-4222-9072-d523d5d67d2e", name: "Beaches and Resorts" },
    { id: "88fab941-04f1-440a-9494-50b96a34cbea", name: "Boat and Yacht" },
    { id: "a2b1ff38-9ac2-4643-93d4-5c7af05b25cf", name: "Accommodation" },
    { id: "00d0f1bf-bc6e-4f92-a6e6-1e6ee94319d8", name: "Beauty & Health" },
    { id: "a4c5f716-8fc5-4e71-9d12-9dd049b0244f", name: "Nightlife" },
  ];

  useEffect(() => {
    async function fetchAllBusinesses() {
      try {
        const results = await Promise.all(
          categories.map(async (cat) => {
            const response = await axios.get(
              `${API_BASE}/business-categories/${cat.id}/businesses`,
              { headers: { "x-api-key": API_KEY } }
            );

            const businesses = response.data.data?.data ?? [];
            return { categoryName: cat.name, businesses };
          })
        );
        setAllBusinesses(results);
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBusinesses();
  }, [API_BASE, API_KEY]);

  if (loading) return <div>Loading businesses…</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="space-y-10">
      {allBusinesses.map((catData) => (
        <div key={catData.categoryName}>
          <h2 className="text-xl font-bold mb-4">{catData.categoryName} Businesses</h2>
          {catData.businesses.length === 0 ? (
            <p>No businesses found.</p>
          ) : (
            <ul className="space-y-4">
              {catData.businesses.map((biz) => (
                <li key={biz.id} className="border p-3 rounded-md">
                  <strong>{biz.business_name}</strong> – {biz.description} <br />
                  Address: {biz.address || "Not specified"} <br />
                  Rating: {biz.average_rating || 0} ({biz.total_reviews || 0} reviews) <br />
                  {biz.image_url && (
                    <img
                      src={biz.image_url}
                      alt={biz.business_name}
                      style={{ width: "100px", marginTop: "5px" }}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
