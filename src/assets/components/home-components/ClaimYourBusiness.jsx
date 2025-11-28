import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ClaimYourBusiness({ onClose }) {
  const [form, setForm] = useState({
    businessName: '',
    businessEmail: '',
    phone: '',
    category: '',
    city: '',
    state: '',
    country: ''
  });
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Environment variables
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`, {
          headers: {
            'X-API-Key': API_KEY,
            'Accept': 'application/json'
          },
          timeout: 5000
        });

        const data = response.data;
        
        // Handle different response structures
        let categoriesList = [];
        if (Array.isArray(data.data)) {
          categoriesList = data.data;
        } else if (Array.isArray(data)) {
          categoriesList = data;
        }

        setCategories(categoriesList);
        setLoadingCategories(false);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories. Please refresh the page.');
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [API_BASE_URL, API_KEY]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(''); // Clear error when user starts typing
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!form.businessName || !form.businessEmail || !form.phone) {
      setError('Please fill in all required fields (Business Name, Email, and Phone).');
      return;
    }

    if (!form.category) {
      setError('Please select a category.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.businessEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      // The form.category now stores the category ID directly
      const categoryId = form.category;

      if (!categoryId) {
        setError('Invalid category selected.');
        setSubmitting(false);
        return;
      }

      // Prepare payload according to API spec
      const payload = {
        business_name: form.businessName.trim(),
        business_email: form.businessEmail.trim(),
        business_phone_number: form.phone.trim(),
        category_id: categoryId,
        city: form.city.trim() || '',
        state: form.state.trim() || '',
        country: form.country.trim() || 'Nigeria'
      };

      // Make API request
      const response = await axios.post(
        `${API_BASE_URL}/businesses/onboarding/self-service`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          timeout: 10000
        }
      );

      // Success
      if (response.status === 200 || response.status === 201) {
        setSuccess(true);
        setForm({
          businessName: '',
          businessEmail: '',
          phone: '',
          category: '',
          city: '',
          state: '',
          country: ''
        });

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose?.();
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting claim:', err);

      let errorMsg = 'Failed to submit your claim. ';

      if (err.response?.status === 400) {
        // Handle validation errors from backend
        const messages = err.response.data?.message;
        if (Array.isArray(messages)) {
          errorMsg = messages.join(', ');
        } else if (typeof messages === 'string') {
          errorMsg = messages;
        } else {
          errorMsg += 'Please check your information and try again.';
        }
      } else if (err.response?.status === 409) {
        errorMsg = 'This business is already registered.';
      } else if (err.response?.status === 500) {
        errorMsg = 'Server error. Please try again later.';
      } else if (err.code === 'ECONNABORTED') {
        errorMsg = 'Request timeout. Please check your connection and try again.';
      } else {
        errorMsg += 'Please check your connection and try again.';
      }

      setError(errorMsg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">Claim your business</h3>
      <p className="text-sm text-gray-500 mb-6">Fill this short form and our team will fast-track your onboarding.</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md text-sm text-green-700">
          ✓ Thanks — your request was received. We will contact you soon with further instructions.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Business Name<span className="text-red-500">*</span></label>
          <input
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
            placeholder="e.g. Sunshine Hotel"
            disabled={submitting}
          />
        </div> 

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Business Email Address<span className="text-red-500">*</span></label>
            <input
              name="businessEmail"
              value={form.businessEmail}
              onChange={handleChange}
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              placeholder="Your email address"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone Number<span className="text-red-500">*</span></label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              placeholder="+234 XXXXXXXX"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category<span className="text-red-500">*</span></label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              disabled={submitting || loadingCategories}
            >
              <option value="">
                {loadingCategories ? 'Loading categories...' : 'Select category'}
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">City</label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              placeholder="E.g. Lagos"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">State / Province</label>
            <input
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              placeholder="E.g. Lagos State"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Country</label>
            <input
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
              placeholder="E.g. Nigeria"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            disabled={submitting || success || loadingCategories}
            className="px-6 py-2 bg-[#DB3A06] text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? 'Submitting...' : success ? 'Submitted ✓' : 'Submit claim'}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-6 py-2 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
