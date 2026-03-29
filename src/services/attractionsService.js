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
 * Fetches attractions/filters for a given business
 * @param {string} businessId - The ID of the business
 * @returns {Promise<Object>} - Object containing attractions array and metadata
 */
export const fetchDefaultAttractions = async (businessId) => {
  try {
    if (!businessId) {
      console.log('No business ID provided, returning empty attractions');
      return {
        attractions: [],
        isMapped: false,
      };
    }

    const url = `${API_BASE_URL}/filters/business/${businessId}`;
    
    const headers = {
      'X-API-Key': API_KEY,
      'Content-Type': 'application/json',
    };
    
    console.log('Fetching attractions from:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch attractions: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Attractions API Response:', data);
    
    // Navigate through nested data structure: data.data.data
    const attractions = data?.data?.data || [];
    console.log('Total attractions retrieved:', attractions.length);
    
    return {
      attractions: attractions,
      isMapped: attractions.length > 0,
    };
  } catch (error) {
    console.error('Error fetching attractions:', error);
    return {
      attractions: [],
      isMapped: false,
    };
  }
};
