import { useMemo } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

async function fetchCategories() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;
  if (!API_BASE || !API_KEY) return [];
  // set a reasonable timeout to avoid hanging requests
  const resp = await axios.get(`${API_BASE}/categories/all`, { headers: { 'x-api-key': API_KEY }, timeout: 8000 });
  let data = resp.data?.data ?? resp.data ?? [];
  if (data && data.data) data = data.data;
  if (!Array.isArray(data)) data = Array.isArray(Object.values(data)) ? Object.values(data) : [];
  return data;
}

export default function useCategories() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories-all'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
    retry: 1,
  });

  // Debug: log all available categories
  useMemo(() => {
    if (data && Array.isArray(data)) {
      console.log('📦 All Categories from API:', data);
      const allNames = data.map(c => c.name).join(', ');
      console.log('Available category names:', allNames);
      
      // Also log nested categories
      data.forEach(cat => {
        if (Array.isArray(cat.categories)) {
          const nestedNames = cat.categories.map(nc => nc.name).join(', ');
          console.log(`Nested under "${cat.name}": ${nestedNames}`);
        }
      });
    }
  }, [data]);

  const findBySlug = useMemo(() => {
    const categories = data || [];

    const normalize = (s) => (s ? String(s).trim().toLowerCase() : '');
    const slugify = (s) => normalize(s).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return (input) => {
      if (!input) return null;
      const raw = String(input).trim();
      const normInput = normalize(raw);
      const slugInput = slugify(raw);

      // try top-level: check slug, exact name (case-insensitive), or slugified name
      const top = categories.find((c) => {
        const cSlug = c.slug || '';
        const cName = c.name || '';
        return (
          cSlug === raw ||
          normalize(cSlug) === normInput ||
          normalize(cName) === normInput ||
          slugify(cName) === slugInput
        );
      });
      if (top) return top;

      // search nested categories: same matching rules
      for (const main of categories) {
        if (Array.isArray(main.categories)) {
          const found = main.categories.find((sc) => {
            const sSlug = sc.slug || '';
            const sName = sc.name || '';
            return (
              sSlug === raw ||
              normalize(sSlug) === normInput ||
              normalize(sName) === normInput ||
              slugify(sName) === slugInput
            );
          });
          if (found) return Object.assign({}, found, { _parentSlug: main.slug || (main.name && slugify(main.name)) || null });
        }
      }

      return null;
    };
  }, [data]);

  return { categories: data, loading: isLoading, error: isError ? error : null, findBySlug };
}
