import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BeachesResortAccommodationHero from '../assets/components/category-components/accommodation-component/BeachesResortAccomHero'
import BeachesAndResortAccomList from '../assets/components/category-components/accommodation-component/BeachesAndResortAccomList'
import { Helmet } from 'react-helmet-async'


export default function BeachesResortAccommodation() {
  return (
    <>
      <Helmet>
        <title>Beaches & Resorts Accommodation | MyPal</title>
        <meta name="description" content="Discover the best beaches and resorts accommodation in Lagos with MyPal. Find top-rated options, read reviews, and book your perfect getaway today." />
        <meta name="keywords" content="MyPal, beaches, resorts, accommodation, Lagos" />
        <link rel="canonical" href="https://www.mypal-inc.com/accommodation/beachresortaccommodation" />
      </Helmet>
      <BeachesResortAccommodationHero />
      <BeachesAndResortAccomList subcategorySlug="Beach Resort Accommodation" />
      <FooterSection />
    </>
  )
}
