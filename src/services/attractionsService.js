/**
 * Attractions Service
 * Handles fetching default attractions based on business type
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Fetches default attractions for a given business type
 * @param {string} businessType - The type of business (e.g., 'fine-dining', 'beaches-resorts', etc.)
 * @returns {Promise<Array>} - Array of attraction objects
 */
/**
 * Maps category names to attraction type codes
 * Based on category business_type field
 */
const getCategoryCode = (categoryName) => {
  if (!categoryName) return null;
  
  const normalized = categoryName.toLowerCase().trim();
  
  // Mapping from category names to attraction codes
  // Only SHORTLET, HOTELEXPERIENCE, and BEACHESRESORTS have data in the API
  const mappings = {
    'short-let homes': 'SHORTLET',
    'short-let homes & beach houses': 'SHORTLET',
    'shortlet': 'SHORTLET',
    'hotel experience': 'HOTELEXPERIENCE',
    'hotelexperience': 'HOTELEXPERIENCE',
    'beaches & resorts': 'BEACHESRESORTS',
    'beaches & resort accommodation': 'BEACHESRESORTS',
    'beach resort accommodation': 'BEACHESRESORTS',
  };
  
  return mappings[normalized] || null;
};

/**
 * Fetches default attractions for a given business type
 * @param {string} businessType - The type of business (category name)
 * @returns {Promise<Array>} - Array of attraction objects
 */
export const fetchDefaultAttractions = async (businessType) => {
  try {
    const url = new URL(`${API_BASE_URL}/public/default-attractions`);
    
    // Try to map the category name to an attraction code
    const categoryCode = getCategoryCode(businessType);
    let isMapped = false;
    
    if (categoryCode) {
      url.searchParams.append('business_accommodation_type', categoryCode);
      isMapped = true;
      console.log(`Mapped category "${businessType}" to code: "${categoryCode}"`);
    } else {
      console.log(`No specific mapping found for category "${businessType}", returning empty attractions`);
      return {
        attractions: [],
        isMapped: false,
        categoryType: businessType
      };
    }

    const headers = {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    };
    
    console.log('Fetching attractions from:', url.toString());

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch attractions: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Attractions API Response:', data);
    
    const attractions = data?.data || data || [];
    console.log('Total attractions retrieved:', attractions.length);
    
    return {
      attractions: attractions,
      isMapped: isMapped,
      categoryType: businessType
    };
  } catch (error) {
    console.error('Error fetching default attractions:', error);
    return {
      attractions: [],
      isMapped: false,
      categoryType: businessType
    };
  }
};
