import { useQuery, useQueries } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchCategories = async (API_URL, API_KEY) => {
  if (!API_URL || !API_KEY) throw new Error('Missing API_URL or API_KEY');
  try {
    const resp = await axios.get(`${API_URL}/categories/all`, {
      params: { api_key: API_KEY },
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
    });
    return resp.data;
  } catch (err) {
    // surface useful debug info
    const status = err?.response?.status;
    const data = err?.response?.data;
    throw new Error(`Failed to fetch categories: ${status || 'network'} ${JSON.stringify(data)}`);
  }
};

const fetchCategoryBusinesses = async ({ apiUrl, catId, query, apiKey }) => {
  try {
    const resp = await axios.get(`${apiUrl}/business-categories/${catId}/businesses`, {
      params: { search: query || '', api_key: apiKey, limit: 10 },
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
    });
    const j = resp.data;
    if (Array.isArray(j.data)) return j.data;
    if (j.data && Array.isArray(j.data.items)) return j.data.items;
    return [];
  } catch (err) {
    // If the server returns 400 for validation, treat as empty; otherwise return null to indicate failure
    const status = err?.response?.status;
    if (status === 400) return [];
    return null;
  }
};

const fetchAllBusinesses = async (apiUrl, apiKey, query) => {
  try {
    const resp = await axios.get(`${apiUrl}/businesses/all`, {
      params: { search: query || '', api_key: apiKey, limit: 50 },
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
    });
    const j = resp.data;
    if (Array.isArray(j.data)) return j.data;
    if (j.data && Array.isArray(j.data.items)) return j.data.items;
    return [];
  } catch (err) {
    const status = err?.response?.status;
    // The API returns 400 for very short/invalid queries (server validation). Treat as empty so hook can fall back.
    if (status === 400) {
      console.warn('[useCategorySearch] businesses/all returned 400 (query too short or invalid)', { query });
      return [];
    }
    return null;
  }
};

const fetchCategoryBusinessesNoSearch = async ({ apiUrl, catId, apiKey }) => {
  try {
    const resp = await axios.get(`${apiUrl}/business-categories/${catId}/businesses`, {
      params: { api_key: apiKey, limit: 50 },
      timeout: 8000,
      headers: { 'Content-Type': 'application/json' },
    });
    const j = resp.data;
    if (Array.isArray(j.data)) return j.data;
    if (j.data && Array.isArray(j.data.items)) return j.data.items;
    return [];
  } catch (err) {
    const status = err?.response?.status;
    if (status === 400) return [];
    return null;
  }
};

export default function useCategorySearch({ apiUrl, apiKey, query }) {
  // Fetch categories first
  const categoriesQuery = useQuery({
    queryKey: ['categories', 'all'],
    queryFn: () => fetchCategories(apiUrl, apiKey),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    enabled: !!apiKey,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = categoriesQuery;

  const categories = categoriesData && Array.isArray(categoriesData.data) ? categoriesData.data : [];

  // Minimum query length to avoid server-side validation errors (400) for very short queries.
  const MIN_QUERY_LENGTH = 3;
  const canRunServerSearch = !!apiKey && !!query && query.length >= MIN_QUERY_LENGTH;

  // Prepare category IDs to query (prioritize those with total_businesses > 0)
  const categoriesToQuery = [];
  for (const seg of categories) {
    if (!seg.categories || !Array.isArray(seg.categories)) continue;
    for (const c of seg.categories) {
      if (c.total_businesses && c.total_businesses > 0) categoriesToQuery.push(c.id);
    }
  }
  if (!categoriesToQuery.length) {
    for (const seg of categories) {
      if (!seg.categories || !Array.isArray(seg.categories)) continue;
      for (const c of seg.categories) categoriesToQuery.push(c.id);
    }
  }

  // Build a single queries array for all category IDs and call useQueries once.
  const queries = categoriesToQuery.map((catId) => ({
    queryKey: ['categoryBusinesses', catId, query],
    queryFn: () => fetchCategoryBusinesses({ apiUrl, catId, query, apiKey }),
  enabled: canRunServerSearch,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
  }));

  // First, try the /businesses/all endpoint which is paginated and supports search.
  const businessesAllQuery = useQuery({
    queryKey: ['businessesAll', query],
    queryFn: () => fetchAllBusinesses(apiUrl, apiKey, query),
    // Only enable the global indexed search when the query is long enough to avoid 400 errors.
  enabled: canRunServerSearch,
    staleTime: 1000 * 60 * 2,
    cacheTime: 1000 * 60 * 10,
  });

  const queriesResults = useQueries({ queries });

  const results = [];
  // make a consistent reference to the businesses/all data and whether it has results
  const allBusinessesData = businessesAllQuery.data || [];
  const allHasResults = Array.isArray(allBusinessesData) && allBusinessesData.length > 0;
  // Use businessesAllQuery's fetching state here (consolidated)
  let isFetching = categoriesLoading || businessesAllQuery.isFetching;

  // If businesses/all returned results, prefer those (it's globally indexed over all businesses)
  if (allHasResults) {
    results.push(...allBusinessesData);
  } else {
    // Otherwise aggregate per-category results
    queriesResults.forEach((r) => {
      if (r.data && Array.isArray(r.data)) results.push(...r.data);
      if (r.isFetching) isFetching = true;
    });
  }

  // Client-side fallback state: if server-side queries return nothing, fetch per-category lists
  // without server search and filter locally by the query string.
  const [fallbackResults, setFallbackResults] = useState(null);
  const [didRunFallback, setDidRunFallback] = useState(false);
  const [fallbackLoading, setFallbackLoading] = useState(false);

  // Build a quick map of category metadata for debugging
  const categoryMeta = {};
  for (const seg of categories) {
    if (!seg.categories || !Array.isArray(seg.categories)) continue;
    for (const c of seg.categories) {
      categoryMeta[c.id] = { name: c.name, segment: seg.name, slug: seg.slug, total: c.total_businesses || 0 };
    }
  }

  // Debug: log which categories were queried and how many items each returned
  try {
    const perCategoryCounts = queriesResults.map((r, idx) => {
      const catId = categoriesToQuery[idx];
      const count = r.data && Array.isArray(r.data) ? r.data.length : (r.data && Array.isArray(r.data.items) ? r.data.items.length : 0);
      return { catId, count, status: r.status, name: categoryMeta[catId]?.name, segment: categoryMeta[catId]?.segment };
    });
    // Only log when there are queries or results
    if (perCategoryCounts.length) {
      // Use console.info so it's easy to see in browser console or terminal where logs appear
      console.info('[useCategorySearch] per-category counts:', perCategoryCounts);
    }
  } catch (e) {
    // don't break on logging errors
    console.warn('[useCategorySearch] debug logging failed', e);
  }

  // If server-wide search (/businesses/all) returned results, we already returned above.
  // Otherwise, if per-category server-side searches also returned nothing, run client-side fallback.
  useEffect(() => {
    const needFallback = !allHasResults && results.length === 0 && categoriesToQuery.length > 0 && !!query;
    if (!needFallback || didRunFallback) return;

    let cancelled = false;
    (async () => {
      setDidRunFallback(true);
      setFallbackLoading(true);
      const agg = [];
      for (const catId of categoriesToQuery) {
        try {
          const items = await fetchCategoryBusinessesNoSearch({ apiUrl, catId, apiKey });
          if (items && Array.isArray(items)) agg.push(...items);
        } catch {
          // ignore per-category errors
        }
        if (agg.length >= 200) break;
      }

      if (cancelled) return;

      // client-side filter: match query against business_name, description, category.name, experiences
      const q = (query || '').toLowerCase();
      const filtered = agg.filter((b) => {
        if (!b) return false;
        const name = (b.business_name || b.name || '').toLowerCase();
        const desc = (b.description || '').toLowerCase();
        const catName = (b.category && b.category.name) ? b.category.name.toLowerCase() : '';
        const experiences = Array.isArray(b.experiences) ? b.experiences.map(e => (e.experience_name || '').toLowerCase()).join(' ') : '';
        // include fine dining menu names
        const menus = Array.isArray(b.fine_dining_menus) ? b.fine_dining_menus.map(m => (m.name || '').toLowerCase()).join(' ') : '';
        // include serviceCategory names
        const services = Array.isArray(b.serviceCategory) ? b.serviceCategory.map(s => (s.name || '').toLowerCase()).join(' ') : '';
        // also include tableManagement types if present
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

      setFallbackResults(filtered);
      setFallbackLoading(false);
    })();

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, apiKey, apiUrl, categoriesToQuery.length]);

  // If the broader all-businesses query returned results, prefer it and log it
  if (allHasResults) {
    try {
      console.info('[useCategorySearch] businesses/all returned', allBusinessesData.length, 'results');
    } catch {
      /* ignore logging errors */
    }
    return {
      results: allBusinessesData,
    isLoading: businessesAllQuery.isFetching || categoriesLoading,
      categories,
      isCategoriesLoading: categoriesLoading,
    };
  }

  // Final selection: prefer all-businesses results, then server-side per-category results, then client-side fallback.
  const finalResults = allHasResults ? allBusinessesData : (results.length ? results : (fallbackResults || []));
  const finalLoading = allHasResults ? (businessesAllQuery.isFetching || categoriesLoading) : (isFetching || fallbackLoading);

  return {
    results: finalResults,
    isLoading: finalLoading,
    categories,
    isCategoriesLoading: categoriesLoading,
  };
}
