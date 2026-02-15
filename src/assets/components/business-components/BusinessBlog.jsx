import React, { useEffect, useState } from 'react';
import axios from 'axios';
import blogplaceholder from '../../images/blogplaceholder.png';
import { Link } from 'react-router-dom';
import { Commet } from "react-loading-indicators";

const BusinessBlog = () => {
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
    <>
    <div className="w-full bg-white py-0 lg:py-2 px-0 md:px-0 flex flex-col items-center mb-8">
        {/* Section Title */}
        <div className="w-[90%] flex flex-row gap-[40px] items-center justify-start relative mt-0 mb-10 mx-auto">
            {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
            style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,}}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto bebas-font">
                Business Blog
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
            ></div>
        </div>

        {/* Section Subtitle */}
        <div className='w-[90%] flex flex-col md:flex-row justify-between items-start mb-10'>
          <div className="flex flex-col gap-5 items-start justify-start relative">
            <div className="flex flex-col gap-3 items-start justify-start self-stretch shrink-0 relative">
              <div className="text-[#181d27] text-left text-[30px] md:text-[36px] font-semibold leading-[38px] md:leading-[44px] relative self-stretch bebas-font mont-normal-font"
                style={{ letterSpacing: 'var(--display-md-semibold-letter-spacing, -0.02em)' }}>
                Latest blog posts for businesses
              </div>
            </div>
            <div className="text-[#535862] text-left text-[18px] md:text-[20px] font-normal leading-[28px] md:leading-[30px] relative mont-normal-font">
              Tool and strategies modern teams need to help their companies grow.
            </div>
          </div>
          <div className="h-fit hidden md:flex justify-end bebas-font">
            <Link to="/blogs" className="px-4 py-2 bg-[#ce4015] text-white rounded-lg">View All Posts</Link>
          </div>
        </div>

      {/* Blog Posts Slider Container */}
      <div className="relative w-full ">
        <div
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 md:scroll-p-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogPosts.slice(0, 8).map((post, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 sm:w-96 snap-start bg-white rounded-2xl shadow-lg border border-gray-200"
            >
              {/* Post Image */}
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder; }}
                />
              </div>
              {/* Post Content */}
              <div className="p-4 sm:p-6">
                <Link to={post.link} className="text-[20px] md:text-2xl font-medium text-[#000000] mb-3 bebas-font">
                  {post.title.split(" ").slice(0, 10).join(" ")}...
                </Link>
                <p className="text-gray-600 mb-4 text-sm font-normal mont-normal-font">
                  {post.description.split(" ").slice(0, 15).join(" ")}...
                </p>
                <Link
                  to={post.link}
                  className="text-[#4D1402] text-xl font-normal underline bebas-font"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-20">
          <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
        </div>
      )}
      {error && (
        <div className="w-[90%] mt-4 mx-auto text-sm text-red-600">Failed to load posts</div>
      )}

      <div className="w-[90%] mt-6 mx-auto flex md:hidden justify-center">
        <Link to="/blogs" className="px-4 py-2 bg-[#ce4015] text-white rounded-lg">View All Posts</Link>
      </div>
    </div>
  </>
  );
};

export default BusinessBlog;
