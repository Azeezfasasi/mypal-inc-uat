import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import FooterSection from '../assets/components/home-components/FooterSection';
import { Commet } from "react-loading-indicators";
import blogplaceholder from '../assets/images/blogplaceholder.png';
import blogplaceholder2 from '../assets/images/blogplaceholder2.png';
import ShareButtons from '../assets/components/blog-components/ShareButtons';
import { Toaster } from "react-hot-toast";
import { Avatar } from 'rsuite';

export default function BlogPost() {
  const { slug } = useParams();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const API_KEY = import.meta.env.VITE_API_KEY || '';

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postUrl = window.location.href; // current page URL

  useEffect(() => {
    let mounted = true;
    async function fetchPost() {
      setLoading(true);
      setError(null);
      try {
        const url = `${API_BASE.replace(/\/+$/g, '')}/blogs/slug/${encodeURIComponent(slug)}`;
        const res = await axios.get(url, { headers: { 'x-api-key': API_KEY } });
        if (!mounted) return;
        const payload = res.data || {};
        // normalize payload: some endpoints return { data: { data: [ { ... } ] } }
        // or { data: [ { ... } ] } or the item directly
        let item = payload.data?.data || payload.data || payload;
        // if item is an array (list), pick the first element (we requested a single post by slug)
        if (Array.isArray(item)) item = item[0] || null;
        setPost(item);

        // Increment view count if we have an id
        const postId = item?.id || item?._id || null;
        if (postId) {
          // fire-and-forget
          axios.patch(`${API_BASE.replace(/\/+$/g, '')}/blogs/${postId}/view`, {}, { headers: { 'x-api-key': API_KEY } }).catch(() => {});
        }
      } catch (err) {
        setError(err.response ? err.response.data : err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (slug) fetchPost();
    return () => { mounted = false; };
  }, [API_BASE, API_KEY, slug]);

  if (loading) return <div className="flex justify-center h-screen items-center py-20">
          <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
        </div>;
  if (error) return <div className="p-6 text-red-600">Failed to load post</div>;
  if (!post) return <div className="p-6">No post found</div>;

  return (
    <>
    <Helmet>
        <title>{post.title || post.name} | MyPal</title>
        <meta name="description" content="Detailed blog post on MyPal covering various topics to help you enhance your business and lifestyle." />
        <meta name="keywords" content="MyPal, Blog, Business Tips, Lifestyle, Hospitality, Travel, Accommodation, Mobility, Outdoor Activities" />
        <meta name="author" content="MyPal Team" />
    </Helmet>
    <ServicesHeader />
    <div className="min-h-screen bg-white py-8 px-4 mb-10">
      <div className="max-w-4xl mx-auto">
        {/* Blog top sections */}
        <div className="flex flex-col gap-3 items-start justify-center self-stretch relative mb-[30px] md:mb-[40px]">
          <div className="text-[#CE4015] text-center font-semibold text-[14px] md:text-[16px] leading-[20px] md:leading-[24px] relative self-stretch">
            Published {" "}
            {new Date(post.published_at || post.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
          <div className="text-gray-900 text-center font-semibold text-[36px] md:text-[48px] leading-[44px] md:leading-[60px] relative self-stretch"
            style={{ letterSpacing: 'var(--display-lg-semibold-letter-spacing, -0.02em)' }}>
            {post.title || post.name}
          </div>
          <div className="text-[#535862] text-center font-normal text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] relative self-stretch"
            style={{ letterSpacing: 'var(--display-lg-semibold-letter-spacing, -0.02em)' }}>
            {post.excerpt || post.meta_description}
          </div>

          {/* Blog Post Categories */}
          <div className="flex flex-wrap gap-1 md:gap-2 items-center justify-center relative self-stretch mt-5">
            {(() => {
              const cats = Array.isArray(post.categories) && post.categories.length > 0
                ? post.categories
                : (typeof post.category === 'string' && post.category.trim())
                  ? [post.category.trim()]
                  : ['General'];

              const colors = [
                'bg-orange-50 text-orange-600 ring-orange-200',
                'bg-blue-50 text-blue-600 ring-blue-200',
                'bg-pink-50 text-pink-600 ring-pink-200',
                'bg-green-50 text-green-600 ring-green-200',
                'bg-violet-50 text-violet-600 ring-violet-200'
              ];

              return cats.map((c, i) => (
                <span
                  key={c + i}
                  className={`px-3 mx-1 py-1 rounded-full text-[16px] md:text-[20px] leading-[28px] md:leading-[30px] font-medium ring-1 ${colors[i % colors.length]}`}
                >
                  {c}
                </span>
              ));
            })()}
          </div>
        </div>

        {/* Blog Image */}
        {(post.featured_image_url || blogplaceholder2) && (
          <div className="mb-6 w-full overflow-hidden rounded-lg">
            <img
              src={post.featured_image_url || blogplaceholder}
              alt={post.featured_image_alt || post.title}
              className="w-full h-[240px] md:h-[640px] object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder; }}
            />
          </div>
        )}

        {/* Blog Details */}
        <p className="text-gray-600 mb-6">{post.excerpt || post.meta_description}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || post.content_html || post.content_rendered || '' }} />

        {/* Blog Footer Section */}
        <div className='flex flex-col md:flex-row justify-between border-t gap-5 md:gap-0 border-gray-200 mt-[40px] pt-3'>
          <div className="flex items-center justify-start gap-2">
            <div>
              {/* Author avatar (defensive) */}
              <img
                src={post.author_avatar_url || post.author_avatar || post.author?.image || blogplaceholder2}
                alt={post.author_name || 'Author avatar'}
                className='rounded-full w-[56px] h-[56px] object-cover'
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder2; }}
              />
            </div>
            <div className="">
              <div className="text-[14px] leading-[20px] font-semibold text-[#181D27]">{post.author_name || ''}</div>
              <div className="text-[14px] leading-[20px] text-gray-400">
                {(
                  // prefer top-level author_title from the post when it contains non-whitespace
                  (typeof post.author_title === 'string' && post.author_title.trim())
                    ? post.author_title.trim()
                    // otherwise, try nested author object fields
                    : (post.author?.title || post.author?.role || 'Content Team')
                )}
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <ShareButtons postUrl={postUrl} />
          </div>

          {/* Toast container */}
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </div>
    </div>
    <FooterSection />
    </>
  );
}
