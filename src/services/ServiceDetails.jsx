import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterSection from '../assets/components/home-components/FooterSection';
import ServiceDetailTitle from '../assets/components/home-components/ServiceDetailTitle';
import ServicesDetailHero from './ServicesDetailHero';
import ServiceDetailDescription from './ServiceDetailDescription';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import { Commet } from "react-loading-indicators";
import { Helmet } from 'react-helmet';
import ServiceAttractions from './ServiceAttractions';

function ServiceDetails() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    let cancelled = false;
    async function fetchBusinessDetails() {
      // Reset when navigating from one business to another
      setLoading(true);
      setError(null);
      setBusiness(null);
      try {
        const response = await axios.get(
          `${API_BASE}/businesses/website/${businessId}`,
          { headers: { 'x-api-key': API_KEY } }
        );
        if (!cancelled) setBusiness(response.data.data);
      } catch (err) {
        console.error('Failed to load business details', err);
        if (!cancelled) {
          setError(err.response?.status === 404 ? 'not-found' : 'failed');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (API_BASE && API_KEY && businessId) {
      fetchBusinessDetails();
    } else {
      console.error('Business details: missing API config or business ID');
      setError('failed');
      setLoading(false);
    }
    return () => { cancelled = true; };
  }, [API_BASE, API_KEY, businessId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen py-20">
        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
      </div>
    );
  }
  if (error || !business) {
    // "Not found" for a 404 or an empty response; anything else is a load failure
    const notFound = error === 'not-found' || !error;
    return (
      <>
        <ServicesHeader />
        <div className="max-w-3xl mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl md:text-4xl text-gray-900 bebas-font">
            {notFound ? 'Business not found' : "We couldn't load this business"}
          </h1>
          <p className="mt-3 text-gray-600 mont-normal-font">
            {notFound
              ? 'It may have been removed, or the link is incorrect.'
              : 'Please check your connection and try again shortly.'}
          </p>
          <Link
            to="/"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-[#DB3A06] text-white mont-normal-font hover:bg-orange-700"
          >
            Back to home
          </Link>
        </div>
        <FooterSection />
      </>
    );
  }

  return (
    <>
    <Helmet>
        <title>{business ? `${business.business_name} | MyPal` : 'Service Details | MyPal'}</title>
        <meta name="description" content={business ? business.description || `Details and information about ${business.business_name}` : "Discover detailed information about our services on MyPal."} />
        <meta name="keywords" content="MyPal, service details, local services, business information, reviews, ratings" />
        <meta name="author" content="MyPal" />
    </Helmet>
      <ServicesHeader />
      <ServiceDetailTitle business={business} />
      <ServicesDetailHero business={business} />
      <ServiceDetailDescription business={business} />
      {/* <ServiceAttractions business={business} /> */}
      <FooterSection />
    </>
  );
}

export default ServiceDetails