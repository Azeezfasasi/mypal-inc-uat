import React, { useState } from 'react';
import searchIcon from '../../images/search.svg';
import locationIcon from '../../images/location.svg';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';

export default function SearchBusiness({ onSearchResults }) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  const MIN_QUERY_LENGTH = 3;

  const handleSearch = async () => {
    if (!query && !location) return;

    // minimal guard to avoid server-side 400s for trivial queries
    if (!query || query.length < MIN_QUERY_LENGTH) {
      alert(`Type at least ${MIN_QUERY_LENGTH} characters to search`);
      return;
    }

    setLoading(true);
    try {
      // 1) Fetch categories/segments
      let segments = [];
      try {
        const catsResp = await axios.get(`${API_URL}/categories/all`, {
          headers: API_KEY ? { 'x-api-key': API_KEY } : { 'Content-Type': 'application/json' },
          timeout: 8000,
        });
        const catsData = catsResp.data;
        segments = Array.isArray(catsData.data) ? catsData.data : (Array.isArray(catsData) ? catsData : []);
      } catch (err) {
        console.warn('[SearchBusiness] categories/all failed, falling back to previous method', err?.message || err);
        // if categories can't be fetched, return empty results
        onSearchResults && onSearchResults([]);
        setLoading(false);
        return;
      }

      // flatten categories into objects with id + parentSlug
      const cats = [];
      for (const seg of segments) {
        const parentSlug = seg.slug || (seg.name ? String(seg.name).toLowerCase().replace(/[^a-z0-9]+/g, '-') : null);
        if (!seg.categories || !Array.isArray(seg.categories)) continue;
        for (const c of seg.categories) {
          cats.push({ id: c.id, slug: c.slug || null, parentSlug });
        }
      }

      if (!cats.length) {
        onSearchResults && onSearchResults([]);
        setLoading(false);
        return;
      }

      // 2) Batched parallel per-category searches against /categories/{parentSlug}/businesses
      const agg = [];
      const paramNames = ['search', 'query', 'q'];
      const CONCURRENCY = 6;
      const chunk = (arr, size) => {
        const out = [];
        for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
        return out;
      };

      const batches = chunk(cats, CONCURRENCY);
      for (const batch of batches) {
        const promises = batch.map(async (cat) => {
          const { id, parentSlug } = cat || {};
          if (!parentSlug) return [];
          try {
            for (const param of paramNames) {
              try {
                const resp = await axios.get(`${API_URL}/categories/${parentSlug}/businesses`, {
                  params: { categoryId: id, [param]: query || '', limit: 50 },
                  headers: API_KEY ? { 'x-api-key': API_KEY } : { 'Content-Type': 'application/json' },
                  timeout: 8000,
                });
                const j = resp.data;
                const items = Array.isArray(j.data) ? j.data : (j.data && Array.isArray(j.data.items) ? j.data.items : []);
                if (items && items.length) return items;
              } catch (err) {
                const status = err?.response?.status;
                if (status === 400) {
                  console.info('[SearchBusiness] per-category returned 400', { id, parentSlug, param, query, body: err?.response?.data });
                  continue;
                }
                console.info('[SearchBusiness] per-category search error', { id, parentSlug, param, err });
                continue;
              }
            }
          } catch (err) {
            console.info('[SearchBusiness] per-category outer error', { cat, err });
          }
          return [];
        });

        const settled = await Promise.allSettled(promises);
        for (const s of settled) {
          if (s.status === 'fulfilled' && Array.isArray(s.value) && s.value.length) agg.push(...s.value);
        }
        if (agg.length >= 500) break;
      }

      // 3) Fallback: if no server-side per-category results, fetch per-category lists and filter locally
      if (!agg.length) {
        for (const cat of cats) {
          const { id, parentSlug } = cat || {};
          if (!parentSlug) continue;
          try {
            const resp = await axios.get(`${API_URL}/categories/${parentSlug}/businesses`, {
              params: { categoryId: id, limit: 50 },
              headers: API_KEY ? { 'x-api-key': API_KEY } : { 'Content-Type': 'application/json' },
              timeout: 8000,
            });
            const j = resp.data;
            if (Array.isArray(j.data)) agg.push(...j.data);
            else if (j.data && Array.isArray(j.data.items)) agg.push(...j.data.items);
          } catch {
            // ignore per-category errors
          }
          if (agg.length >= 500) break;
        }
      }

      // 4) Client-side filter
      const q = (query || '').toLowerCase();
      const filtered = agg.filter((b) => {
        if (!b) return false;
        const name = (b.business_name || b.name || '').toLowerCase();
        const desc = (b.description || '').toLowerCase();
        const catName = (b.category && b.category.name) ? b.category.name.toLowerCase() : '';
        const experiences = Array.isArray(b.experiences) ? b.experiences.map(e => (e.experience_name || '').toLowerCase()).join(' ') : '';
        const menus = Array.isArray(b.fine_dining_menus) ? b.fine_dining_menus.map(m => (m.name || '').toLowerCase()).join(' ') : '';
        const services = Array.isArray(b.serviceCategory) ? b.serviceCategory.map(s => (s.name || '').toLowerCase()).join(' ') : '';
        const tableTypes = Array.isArray(b.tableManagements) ? b.tableManagements.map(t => (t.type || '').toLowerCase()).join(' ') : '';

        return (
          name.includes(q) ||
          desc.includes(q) ||
          catName.includes(q) ||
          experiences.includes(q) ||
          menus.includes(q) ||
          services.includes(q) ||
          tableTypes.includes(q)
        );
      });

      // dedupe by id and return
      const map = new Map();
      for (const b of filtered) if (b && b.id) map.set(b.id, b);
      const result = Array.from(map.values());
      if (!result.length) alert(`No results found for "${query}".`);
      onSearchResults && onSearchResults(result);
      setLoading(false);
      return;
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert('Failed to fetch search results. Please check your API key or network.');
      onSearchResults && onSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full md:w-[95%] p-4 md:p-6 rounded-2xl shadow-xl backdrop-blur-md bg-white/20 border border-white/30 flex flex-row justify-center items-center">
      <div className="w-full flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={searchIcon} alt="search" />
          <input
            type="search"
            placeholder="What are you looking for"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Location Input */}
        <div className="w-full md:w-[40%] flex-1 flex items-center space-x-2 p-3 md:p-4 rounded-[10px] bg-[rgba(255,255,255,0.34)] border-[rgba(255,255,255,0.41)] border h-[72px] text-white shadow-inner" style={{ backdropFilter: 'blur(8.7px)' }}>
          <img src={locationIcon} alt="location" />
          <input
            type="search"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Explore Button */}
        <button
          onClick={handleSearch}
          className="w-full md:w-[20%] px-10 py-3 md:py-4 bg-[#DB3A06] hover:bg-orange-700 text-white font-semibold rounded-[10px] transition-colors duration-300 shadow-lg cursor-pointer flex items-center justify-center"
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? (
            <>
              <ClipLoader
                color="#ffffff"
                loading={loading}
                size={30}
                aria-label="Loading Spinner"
              />
              <span className="ml-2">Searching...</span>
            </>
          ) : (
            'Explore'
          )}
        </button>
      </div>
    </div>
  );
}
