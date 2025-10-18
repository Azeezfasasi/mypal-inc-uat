import React, { useState } from 'react';
import axios from 'axios';

export default function BlogApiCheck() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const API_KEY = import.meta.env.VITE_API_KEY || '';

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    sort: 'createdAt',
    order: 'DESC',
    search: '',
    status: '',
    featured: '',
    tags: '',
    categories: '',
    author_id: '',
    sort_by: 'published_at',
    sort_order: 'DESC',
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const paramDefs = [
    { key: 'page', type: 'number', desc: 'Pagination page (1-indexed)', default: 1 },
    { key: 'limit', type: 'number', desc: 'Number of items per page', default: 10 },
    { key: 'sort', type: 'string', desc: 'Sort field (e.g., createdAt)', default: 'createdAt' },
    { key: 'order', type: 'string', desc: 'Sort order (ASC or DESC)', default: 'DESC' },
    { key: 'search', type: 'string', desc: 'Search in title, excerpt, and content', default: '' },
    { key: 'status', type: 'string', desc: 'Filter by blog status (draft,published,archived)', default: '' },
    { key: 'featured', type: 'boolean', desc: 'Filter by featured blogs only', default: '' },
    { key: 'tags', type: 'string', desc: 'Filter by tags (comma-separated)', default: '' },
    { key: 'categories', type: 'string', desc: 'Filter by categories (comma-separated)', default: '' },
    { key: 'author_id', type: 'string', desc: 'Filter by author ID', default: '' },
    { key: 'sort_by', type: 'string', desc: 'Sort field (created_at, updated_at, published_at, view_count, title)', default: 'published_at' },
    { key: 'sort_order', type: 'string', desc: 'Sort order (ASC, DESC)', default: 'DESC' },
  ];

  async function callApi() {
    setLoading(true);
    setResponse(null);
    setError(null);

    try {
      const url = `${API_BASE.replace(/\/+$/g, '')}/blogs/published`;
      const res = await axios.get(url, {
        headers: { 'x-api-key': API_KEY },
        params: Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)),
      });
      setResponse(res.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">GET /v1/blogs/published — API Explorer</h2>

      <div className="mb-4">
        <div className="grid grid-cols-2 gap-3">
          {paramDefs.map((p) => (
            <div key={p.key} className="mb-2">
              <label className="block text-sm font-medium text-gray-700">{p.key}</label>
              <input
                className="mt-1 block w-full rounded-md border px-3 py-2"
                value={params[p.key] ?? ''}
                onChange={(e) => setParams({ ...params, [p.key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })}
              />
              <div className="text-xs text-gray-500">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <button onClick={callApi} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? 'Loading…' : 'Call API'}</button>
        <div className="text-sm text-gray-600">Using X-API-Key header from env</div>
      </div>

      <div>
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded">{JSON.stringify(error)}</div>
        )}
        {response && (
          <pre className="p-4 bg-gray-100 rounded overflow-auto text-sm">{JSON.stringify(response, null, 2)}</pre>
        )}
      </div>

    </div>
  );
}
