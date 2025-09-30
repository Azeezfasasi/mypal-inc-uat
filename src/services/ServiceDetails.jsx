import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FooterSection from '../assets/components/home-components/FooterSection';
import ServiceDetailTitle from '../assets/components/home-components/ServiceDetailTitle';
import ServicesDetailHero from './ServicesDetailHero';
import ServiceDetailDescription from './ServiceDetailDescription';
import ServicesHeader from '../assets/components/services-components/ServicesHeader';
import { Commet } from "react-loading-indicators";

function ServiceDetails() {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function fetchBusinessDetails() {
      try {
        const response = await axios.get(
          `${API_BASE}/businesses/${businessId}`,
          { headers: { 'x-api-key': API_KEY } }
        );
        setBusiness(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    if (API_BASE && API_KEY && businessId) fetchBusinessDetails();
    else setError('Configuration Error: API_BASE, API_KEY, or businessId missing.');
  }, [API_BASE, API_KEY, businessId]);

  // if (loading) return <div>Loading restaurant categories…</div>;
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
      </div>
    );
  }
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  // if (!business) return <div>No business found.</div>;

  if (!businessId) {
    setError('Invalid business ID.');
    setLoading(false);
    return;
  }

  return (
    <>
      <ServicesHeader />
      <ServiceDetailTitle business={business} />
      <ServicesDetailHero business={business} />
      <ServiceDetailDescription business={business} />
      <FooterSection />
    </>
  );
}

export default ServiceDetails