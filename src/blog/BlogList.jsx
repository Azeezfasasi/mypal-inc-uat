import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import FooterSection from '../assets/components/home-components/FooterSection';
import { Commet } from 'react-loading-indicators';
import blogplaceholder from '../assets/images/blogplaceholder.png';

export default function BlogList() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const API_KEY = import.meta.env.VITE_API_KEY || '';

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 9;
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('all'); // 'all' | 'featured'
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('published_at');
  const [sortOrder, setSortOrder] = useState('DESC');

  // Fetch helper
  async function fetchPosts({ page = 1, limit = 9, filter = 'all', search = '', sortBy = 'published_at', sortOrder = 'DESC' } = {}) {
    setLoading(true);
    setError(null);
    try {
      const base = filter === 'featured' ? '/blogs/featured' : '/blogs/published';
      const url = `${API_BASE.replace(/\/+$/g, '')}${base}`;
      const res = await axios.get(url, {
        headers: { 'x-api-key': API_KEY },
        params: { page, limit, search, sort_by: sortBy, sort_order: sortOrder },
      });

      const payload = res.data || {};
      const items = Array.isArray(payload.data?.data) ? payload.data.data : Array.isArray(payload.data) ? payload.data : Array.isArray(payload) ? payload : [];
      const meta = payload.data?.meta || payload.meta || {};

      setPosts(items);
      setTotalItems(meta.total || items.length || 0);
      setTotalPages(meta.total_pages || Math.max(1, Math.ceil((meta.total || items.length) / limit)));
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  }

  // initial + watch params
  useEffect(() => {
    setPage(1);
    fetchPosts({ page: 1, limit, filter, search, sortBy, sortOrder });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search, sortBy, sortOrder, limit]);

  useEffect(() => {
    fetchPosts({ page, limit, filter, search, sortBy, sortOrder });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const pages = useMemo(() => {
    const p = [];
    for (let i = 1; i <= totalPages; i++) p.push(i);
    return p;
  }, [totalPages]);

  // Responsive grid classes: 1-col mobile, 2-col sm, 3-col md
  return (
    <>
      <Helmet>
        <title>Blog Posts | MyPal</title>
      </Helmet>

      <ServicesHeader />

      <div className="min-h-screen bg-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Top controls */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-[#FCEDE6] text-[#DB3A06]' : 'bg-white border'}`}>
                View all
              </button>
              <button
                onClick={() => setFilter('featured')}
                className={`px-4 py-2 rounded ${filter === 'featured' ? 'bg-[#FCEDE6] text-[#DB3A06]' : 'bg-white border'}`}>
                Featured
              </button>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full md:w-64 px-3 py-2 border rounded"
              />

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border rounded">
                <option value="published_at">Most recent</option>
                <option value="view_count">Most viewed</option>
                <option value="reading_time_minutes">Shortest read</option>
              </select>

              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="px-3 py-2 border rounded">
                <option value="DESC">DESC</option>
                <option value="ASC">ASC</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="py-20 flex justify-center">
              <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
            </div>
          ) : error ? (
            <div className="text-red-600">Failed to load posts</div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, idx) => (
                  <article key={post.id || idx} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-300">
                    <Link to={post.slug ? `/blog/${post.slug}` : '/blog-details'} className="block">
                      <div className="h-48 w-full overflow-hidden">
                        <img
                          src={post.featured_image_url || post.featured_image || post.image || blogplaceholder}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder; }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs text-[#DB3A06] font-semibold">{post.categories?.[0] || (post.tags?.[0] || 'Post')}</div>
                          <div className="text-xs text-gray-400">{new Date(post.published_at || post.created_at).toLocaleDateString()}</div>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{post.excerpt || post.description || ''}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">{post.author_name || ''}</div>
                          <div className="text-sm text-[#4D1402] font-medium">Read more →</div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0">Showing page {page} of {totalPages} — {totalItems} posts</div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-2 border rounded disabled:opacity-50">Previous</button>
                  <div className="flex items-center space-x-1">
                    {pages.map((p) => (
                      <button key={p} onClick={() => setPage(p)} className={`px-3 py-2 rounded ${p === page ? 'bg-[#DB3A06] text-white' : 'border'}`}>{p}</button>
                    ))}
                  </div>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-2 border rounded disabled:opacity-50">Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <FooterSection />
    </>
  );
}
