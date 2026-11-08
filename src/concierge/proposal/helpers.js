import { CATEGORY_IMAGES } from '../images';

/** Item photo, falling back to a category photo when the API has none */
export const itemImage = (item) => item?.image_url || item?.images?.[0] || CATEGORY_IMAGES[item?.category] || CATEGORY_IMAGES.OTHER;

/** Google Maps link for an item location (coordinates when known, else the address) */
export const mapsUrl = (location) => {
  if (!location) return null;
  const { latitude, longitude, address, city } = location;
  const query = latitude && longitude ? `${latitude},${longitude}` : [address, city].filter(Boolean).join(', ');
  return query ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}` : null;
};
