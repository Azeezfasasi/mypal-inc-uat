import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryApiCheckWithBusinesses() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessesByCat, setBusinessesByCat] = useState({});
  const [loadingBiz, setLoadingBiz] = useState({});
  const [fullBizData, setFullBizData] = useState({});
  const [loadingFullBiz, setLoadingFullBiz] = useState({});

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

  const handleViewBusinesses = async (subCat, parentCat) => {
    if (!parentCat.slug || !subCat.id) return;
    setLoadingBiz((prev) => ({ ...prev, [subCat.id]: true }));
    try {
      const response = await axios.get(`${API_BASE}/categories/${parentCat.slug}/businesses?categoryId=${subCat.id}`, {
        headers: { "x-api-key": API_KEY },
      });
      console.log('Businesses API response:', response.data);
      let dataArr = response.data.data?.data;
      if (!Array.isArray(dataArr)) {
        if (dataArr == null) dataArr = [];
        else if (typeof dataArr === 'object') dataArr = Object.values(dataArr);
        else dataArr = [];
      }
      setBusinessesByCat((prev) => ({ ...prev, [subCat.id]: dataArr }));
    } catch (err) {
      console.error('Error fetching businesses:', err);
      setBusinessesByCat((prev) => ({ ...prev, [subCat.id]: [] }));
    } finally {
      setLoadingBiz((prev) => ({ ...prev, [subCat.id]: false }));
    }
  };

  const handleShowFullBizData = async (bizId) => {
    if (!bizId) return;
    setLoadingFullBiz((prev) => ({ ...prev, [bizId]: true }));
    try {
      const response = await axios.get(`${API_BASE}/businesses/${bizId}`, {
        headers: { "x-api-key": API_KEY },
      });
      setFullBizData((prev) => ({ ...prev, [bizId]: response.data }));
    } catch (err) {
      setFullBizData((prev) => ({ ...prev, [bizId]: { error: err.response ? err.response.data : err.message } }));
    } finally {
      setLoadingFullBiz((prev) => ({ ...prev, [bizId]: false }));
    }
  };

  if (loading) return <div>Loading categories…</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div>
      <h1 className="text-red-600 text-[24px] font-bold border border-solid border-red-600 py-2 pl-2">All Categories API DATA</h1>
      <details className="mb-4">
        <summary className="cursor-pointer font-semibold">Show Raw API Response</summary>
        <pre className="bg-gray-100 p-2 rounded text-xs max-h-96 overflow-x-auto">{JSON.stringify(categories, null, 2)}</pre>
      </details>
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
                    <button
                      className="ml-2 px-2 py-1 bg-blue-600 text-white rounded text-xs"
                      onClick={() => handleViewBusinesses(subCat, mainCat)}
                      disabled={loadingBiz[subCat.id]}
                    >
                      {loadingBiz[subCat.id] ? "Loading…" : "View Businesses"}
                    </button>
                    {/* Businesses List */}
                    {Array.isArray(businessesByCat[subCat.id]) && (
                      <ul className="mt-2 ml-4">
                        {businessesByCat[subCat.id].length === 0 ? (
                          <li className="text-gray-500">No businesses found.</li>
                        ) : (
                          businessesByCat[subCat.id].map((biz, idx) => (
                            biz && typeof biz === 'object' ? (
                              <li key={biz.id || idx} className="border p-2 mb-2 rounded">
                                <strong>{biz.business_name || biz.name || 'Unnamed Business'}</strong>
                                {biz.city && <span> – {biz.city}</span>}
                                {biz.state && <span>, {biz.state}</span>}
                                {biz.image_url && (
                                  <img src={biz.image_url} alt={biz.business_name || biz.name} style={{ width: "60px", marginLeft: "10px" }} />
                                )}
                                {biz.description && (
                                  <div className="text-xs text-gray-600">{biz.description}</div>
                                )}
                                {/* Show Full Data Button */}
                                {biz.id && (
                                  <button
                                    className="ml-2 px-2 py-1 bg-green-600 text-white rounded text-xs"
                                    onClick={() => handleShowFullBizData(biz.id)}
                                    disabled={loadingFullBiz[biz.id]}
                                  >
                                    {loadingFullBiz[biz.id] ? "Loading…" : "Show Full Data"}
                                  </button>
                                )}
                                {/* Full Data Output */}
                                {fullBizData[biz.id] && (
                                  <details className="mt-2">
                                    <summary className="cursor-pointer text-xs text-green-700">Full API Data</summary>
                                    <pre className="bg-gray-100 p-2 rounded text-xs max-h-96 overflow-x-auto">{JSON.stringify(fullBizData[biz.id], null, 2)}</pre>
                                  </details>
                                )}
                              </li>
                            ) : null
                          ))
                        )}
                      </ul>
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
