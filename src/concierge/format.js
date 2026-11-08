// Display helpers for concierge money and dates. Amounts are whole naira;
// dates are YYYY-MM-DD with no timezone, so they're read as local dates.

const nairaFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

/** "₦1,561,000"; null/undefined → "To be quoted" (never ₦0 for an unknown price) */
export const formatNaira = (amount, fallback = 'To be quoted') =>
  amount === null || amount === undefined || amount === '' ? fallback : nairaFormatter.format(Number(amount));

const parseDate = (value) => {
  if (!value) return null;
  const [y, m, d] = String(value).slice(0, 10).split('-').map(Number);
  return y && m && d ? new Date(y, m - 1, d) : null;
};

/** "12 Dec 2026" */
export const formatDate = (value) => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
};

/** "12 Dec" */
export const formatShortDate = (value) => {
  const date = parseDate(value);
  return date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';
};

/** "12 – 16 Dec 2026", or the full dates when the months differ */
export const formatDateRange = (from, to) => {
  const start = parseDate(from);
  const end = parseDate(to);
  if (!start || !end) return formatDate(from || to);
  if (start.getFullYear() === end.getFullYear() && start.getMonth() === end.getMonth()) {
    return `${start.getDate()} – ${formatDate(to)}`;
  }
  return `${formatShortDate(from)} – ${formatDate(to)}`;
};

/** ISO timestamp → "15 Nov 2026, 10:24 AM" */
export const formatDateTime = (value) => {
  const date = value ? new Date(value) : null;
  if (!date || Number.isNaN(date.getTime())) return '';
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/** Today in Lagos as YYYY-MM-DD — arrival can be today but not earlier */
export const todayInLagos = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Africa/Lagos' }).format(new Date());

export const nightsBetween = (from, to) => {
  const start = parseDate(from);
  const end = parseDate(to);
  return start && end ? Math.round((end - start) / 86_400_000) : 0;
};

/** Caption under a price, per the guide's rendering rules */
export const priceCaption = (item, nights) => {
  if (item.for_adults) return `for ${item.for_adults} adult${item.for_adults === 1 ? '' : 's'}`;
  if (item.pricing_basis === 'PER_PERSON') return 'per person';
  if (item.pricing_basis === 'PER_NIGHT') return nights ? `for ${nights} night${nights === 1 ? '' : 's'}` : 'per night';
  return '';
};

export const isUnpriced = (item) =>
  item.price_status === 'TO_BE_QUOTED' || item.line_total === null || item.line_total === undefined;

/** "+2349055557535" → "+234 905 555 7535" for display */
export const formatPhone = (phone) => {
  const digits = String(phone || '').replace(/[^\d+]/g, '');
  const match = digits.match(/^\+234(\d{3})(\d{3})(\d{4})$/);
  return match ? `+234 ${match[1]} ${match[2]} ${match[3]}` : phone || '';
};

export const whatsappLink = (phone, text) => {
  const number = String(phone || '').replace(/\D/g, '');
  return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
};
