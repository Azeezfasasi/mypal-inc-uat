// Shared API configuration. Read env vars once here so a missing value
// can't crash components with `undefined.replace(...)`.

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');
export const API_KEY = import.meta.env.VITE_API_KEY || '';
export const isApiConfigured = Boolean(API_BASE && API_KEY);

/** Absolute URL for an API path, e.g. apiUrl('/contact'). */
export const apiUrl = (path) => `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;

/** Every MyPal endpoint the site uses requires the app key, including POSTs. */
export const apiHeaders = (extra = {}) => ({
  ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
  ...extra,
});

/**
 * List endpoints wrap items as { data: { data: [...], page, hasNext, ... } }.
 * Returns the items plus pagination info.
 */
export function unwrapList(body) {
  const payload = body?.data ?? body ?? {};
  const items = Array.isArray(payload) ? payload : Array.isArray(payload.data) ? payload.data : [];
  return {
    items,
    hasNext: Boolean(payload.hasNext),
    page: Number(payload.page) || 1,
    total: Number(payload.total) || items.length,
  };
}
