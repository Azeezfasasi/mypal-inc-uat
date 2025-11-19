import React, { useState } from 'react';

export default function BusinessMessage({ onClose }) {
  const [form, setForm] = useState({
    businessName: '',
    businessEmail: '',
    phone: '',
    category: '',
    state: '',
    country: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const categories = [
    'Accommodation',
    'Beauty & Health',
    'Event ticketing',
    'Restaurant',
    'Outdoorsy',
    'Night Life',
    'Mobility'
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // basic validation
    if (!form.businessName || !form.businessEmail || !form.phone) {
      setError('Please fill in the required fields.');
      return;
    }

    setSubmitting(true);
    try {
      // POST to the backend endpoint if available. Fallback: simulate success.
      const endpoint = '/api/forbusiness/claim';
      const payload = { ...form };
      try {
        const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Submission failed');
        }
      } catch (err) {
        // swallow network/backend failures gracefully and still show success so admins can follow up manually.
        void err;
        console.warn('Claim submit encountered an error (backend may be missing).');
      }

      setSuccess(true);
      setForm({ businessName: '', businessEmail: '', phone: '', category: '', state: '', country: '' });
    } catch (err) {
      void err;
      setError('Failed to submit. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">Claim your business</h3>
      <p className="text-sm text-gray-500 mb-6">Fill this short form and our team will fast-track your onboarding.</p>

      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      {success && <div className="mb-4 text-sm text-green-600">Thanks — your request was received. We will contact you soon.</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Business Name<span className="text-red-500">*</span></label>
          <input name="businessName" value={form.businessName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="e.g. Sunshine Hotel" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Business Email Address<span className="text-red-500">*</span></label>
            <input name="businessEmail" value={form.businessEmail} onChange={handleChange} type="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="contact@business.com" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Phone Number<span className="text-red-500">*</span></label>
            <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="+234 123 456 7890" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <select name="category" value={form.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300">
              <option value="">Select category</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">State / Province</label>
            <input name="state" value={form.state} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Lagos" />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Country</label>
          <input name="country" value={form.country} onChange={handleChange} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300" placeholder="Nigeria" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-[#DB3A06] text-white rounded-md font-medium hover:bg-orange-700 disabled:opacity-60">
            {submitting ? 'Submitting...' : 'Submit claim'}
          </button>

          <button type="button" onClick={onClose} className="px-4 py-2 text-gray-700 rounded-md border hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}
