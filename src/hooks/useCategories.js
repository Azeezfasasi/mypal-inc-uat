import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { apiHeaders, apiUrl, isApiConfigured } from '../lib/api';

async function fetchCategories() {
  // Surface missing config as an error rather than an empty category list
  if (!isApiConfigured) throw new Error('API is not configured (VITE_API_BASE_URL / VITE_API_KEY)');
  const resp = await axios.get(apiUrl('/categories/all'), { headers: apiHeaders(), timeout: 8000 });
  let data = resp.data?.data ?? resp.data ?? [];
  if (data && data.data) data = data.data;
  return Array.isArray(data) ? data : Object.values(data || {});
}

const normalize = (s) => (s ? String(s).trim().toLowerCase() : '');
const slugify = (s) => normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Segments have a slug; nested categories only have name and type (e.g. "Club")
const matches = (entry, raw) => {
  const normInput = normalize(raw);
  const slugInput = slugify(raw);
  return [entry.slug, entry.name, entry.type].some(
    (value) => value && (normalize(value) === normInput || slugify(value) === slugInput),
  );
};

export default function useCategories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories-all'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });

  const findBySlug = useMemo(() => {
    const categories = data || [];

    return (input) => {
      if (!input) return null;
      const raw = String(input).trim();

      const top = categories.find((c) => matches(c, raw));
      if (top) return { ...top, _isSegment: true, _matchedSlug: top.slug || slugify(raw) };

      for (const main of categories) {
        const found = (main.categories || []).find((sc) => matches(sc, raw));
        if (found) {
          return {
            ...found,
            _isSegment: false,
            _parentSlug: main.slug || slugify(main.name) || null,
            _matchedSlug: found.slug || slugify(raw),
          };
        }
      }

      return null;
    };
  }, [data]);

  return { categories: data, loading: isLoading, error: isError ? error : null, findBySlug };
}
