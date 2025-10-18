import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import FooterSection from '../assets/components/home-components/FooterSection';
import { Commet } from "react-loading-indicators";
import blogplaceholder from '../assets/images/blogplaceholder.png';

export default function BlogPost() {
  const { slug } = useParams();
  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const API_KEY = import.meta.env.VITE_API_KEY || '';

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        const item = payload.data || payload;
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
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {post.featured_image_url && (
          <div className="mb-6 w-full h-64 overflow-hidden rounded-lg">
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = blogplaceholder; }}
            />
          </div>
        )}

        <div className="mb-4 text-sm text-gray-500">{post.author_name || ''} • {new Date(post.published_at || post.created_at).toLocaleDateString()}</div>
        <h1 className="text-3xl font-bold mb-4">{post.title || post.name}</h1>
        <p className="text-gray-600 mb-6">{post.excerpt || post.meta_description}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || post.content_html || post.content_rendered || '' }} />
      </div>
    </div>
    <FooterSection />
    </>
  );
}
