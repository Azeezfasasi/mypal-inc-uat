import React, { useEffect, useState } from 'react';
import axios from 'axios';
import blogplaceholder from '../../images/blogplaceholder.png';
import { Link } from 'react-router-dom';
import { Commet } from "react-loading-indicators";

const HomeBlog = () => {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const API_KEY = import.meta.env.VITE_API_KEY || '';

  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function fetchBlogs() {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE.replace(/\/+$/g, '')}/blogs/published`;
        const res = await axios.get(url, {
          headers: { 'x-api-key': API_KEY },
          params: { page: 1, limit: 8 },
        });
        if (!mounted) return;
        // Normalize response — the API returns { data: { data: [ ... ], meta: { ... } } }
        const payload = res.data || {};
        let items = [];
        if (Array.isArray(payload)) items = payload;
        else if (Array.isArray(payload.data)) items = payload.data;
        else if (Array.isArray(payload.data?.data)) items = payload.data.data;
        else if (Array.isArray(payload.results)) items = payload.results;

        if (Array.isArray(items) && items.length > 0) {
          const mapped = items.slice(0, 8).map((b) => ({
            image: b.featured_image_url || b.image || b.thumbnail || blogplaceholder ,
            title: b.title || b.name || 'Untitled',
            description: b.excerpt || b.description || b.summary || '',
            slug: b.slug || b.id || null,
            link: b.slug ? `/blog/${b.slug}` : `/blog-details`,
          }));
          setBlogPosts(mapped);
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBlogs();
    return () => { mounted = false; };
  }, [API_BASE, API_KEY]);

  return (
    <section className="w-full bg-white py-8 px-4 md:px-8 lg:px-16">
      {/* Section header */}
      <div className="w-full flex flex-row gap-[40px] items-center justify-start relative mb-8">
      {/* Left Gradient Line */}
          <div className="hidden md:block border-t border-solid shrink-0 md:w-[20%] lg:w-[30%] h-0 relative -mt-px rotate-180"
          style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
          borderImageSlice: 1,}}
          ></div>

          {/* Title */}
          <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
              Blog
          </div>

          {/* Right Gradient Line */}
          <div className="hidden md:block border-t border-solid shrink-0 md:w-[20%] lg:w-[30%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
          ></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">Our Blog</h2> */}
            <p className="mt-2 text-gray-600 max-w-xl">Tools and strategies modern teams need to help their companies grow.</p>
          </div>
          <div className="hidden md:block">
            <Link to="/blog-lists" className="inline-flex items-center px-4 py-2 bg-[#ce4015] text-white rounded-md hover:opacity-95">See All</Link>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <article key={i} className="animate-pulse bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </article>
          ))}

          {!loading && blogPosts.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">No blog posts available.</div>
          )}

          {!loading && blogPosts.slice(0, 3).map((post, index) => (
            <article key={index} className="bg-white rounded-2xl shadow hover:shadow-lg border border-gray-100 overflow-hidden transition-shadow duration-200">
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title || 'Blog post image'}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder; }}
                />
              </div>
              <div className="p-5 md:p-6">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  <Link to={post.link} className="hover:text-[#ce4015]">{post.title.split(' ').slice(0, 12).join(' ')}{post.title.split(' ').length > 12 ? '…' : ''}</Link>
                </h3>
                <p className="text-sm text-gray-600 mb-4">{post.description.split(' ').slice(0, 20).join(' ')}{post.description.split(' ').length > 20 ? '…' : ''}</p>
                <div className="flex items-center justify-between">
                  <Link to={post.link} className="text-[#ce4015] font-medium">Read More</Link>
                  <span className="text-xs text-gray-400">{/* placeholder for date or tag */}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile view button */}
        <div className="mt-8 flex justify-center md:hidden">
          <Link to="/blog-lists" className="px-4 py-2 bg-[#ce4015] text-white rounded-md">View All Posts</Link>
        </div>

        {/* Loading & error */}
        {loading && (
          <div className="flex justify-center items-center py-10">
            <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
          </div>
        )}

        {error && (
          <div className="mt-6 text-center text-sm text-red-600">Failed to load posts</div>
        )}
      </div>
    </section>
  );
};

export default HomeBlog;
