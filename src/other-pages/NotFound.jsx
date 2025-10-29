import React from 'react';
import { Link } from 'react-router-dom';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import FooterSection from '../assets/components/home-components/FooterSection';

export default function NotFound() {
  return (
    <>
    <ServicesHeader />
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full bg-white border border-gray-200 shadow-lg rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10 md:p-12 flex flex-col justify-center">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">404</h1>
          <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-gray-800">Page not found</h2>
          <p className="mt-4 text-gray-600">We can’t seem to find the page you’re looking for. It may have been moved or deleted, or the URL is incorrect.</p>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <Link to="/" className="inline-block px-6 py-3 bg-[#ce4015] text-white rounded-md font-medium shadow hover:opacity-95">Go back home</Link>
            <Link to="/blogs" className="inline-block px-6 py-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">Browse blog</Link>
          </div>

          <p className="mt-6 text-sm text-gray-400">If you think this is an error, <a href="mailto:hello@mypal-inc.com" className="text-[#ce4015] underline">contact us</a> and we'll help you find what you need.</p>
        </div>

        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#fff7f2] to-white p-6">
          <svg width="320" height="240" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="max-w-full h-auto">
            <rect x="0" y="0" width="320" height="240" rx="16" fill="#FEF3EB" />
            <g transform="translate(40,36)">
              <path d="M64 8c25.464 0 46 20.536 46 46s-20.536 46-46 46S18 79.464 18 54 38.536 8 64 8z" fill="#FFD6BF" />
              <rect x="110" y="14" width="86" height="60" rx="8" fill="#fff" stroke="#FFE1CF" />
              <path d="M26 132c22-18 58-28 94-28s72 10 94 28v26H26v-26z" fill="#FFE7D6" />
              <circle cx="52" cy="52" r="6" fill="#fff" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <FooterSection />
    </>
  );
}