import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BeachesResortAccommodationHero from '../assets/components/category-components/accommodation-component/BeachesResortAccomHero'
import BeachesAndResortAccomList from '../assets/components/category-components/accommodation-component/BeachesAndResortAccomList'
import { Helmet } from 'react-helmet'


export default function BeachesResortAccommodation() {
  return (
    <>
      <Helmet>
        <title>Beaches & Resorts Accommodation in Lagos | MyPal</title>
        <meta name="description" content="Discover the best beaches and resorts accommodation in Lagos with MyPal. Find top-rated options, read reviews, and book your perfect getaway today." />
        <link rel="canonical" href="https://www.mypal.ng/accommodation/beaches-resorts" />
      </Helmet>
      <BeachesResortAccommodationHero />
      <BeachesAndResortAccomList />
      <FooterSection />
    </>
  )
}
