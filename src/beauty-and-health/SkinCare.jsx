import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import SkincareHero from '../assets/components/category-components/salon-and-spa-component/SkinCareHero'
import SkincareList from '../assets/components/category-components/salon-and-spa-component/SkinCareList'
import { Helmet } from 'react-helmet'

export default function SkinCare() {
  return (
    <>
      <Helmet>
        <title>Best Skin Care Services in Lagos | MyPal</title>
        <meta name="description" content="Discover top-rated skin care services in Lagos with MyPal. Explore a variety of treatments and read reviews to find the perfect skin care solution for you." />
        <link rel="canonical" href="https://www.mypal.ng/beauty-and-health/skincare" />
      </Helmet>
      <SkincareHero />
      <SkincareList subcategorySlug="Spa & Skin Care" />
      <FooterSection />
    </>
  )
}
