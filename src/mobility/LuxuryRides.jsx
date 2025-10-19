import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import LuxuryHero from '../assets/components/category-components/mobility-components/LuxuryHero'
import LuxuryLists from '../assets/components/category-components/mobility-components/LuxuryLists'
import { Helmet } from 'react-helmet'

function LuxuryRides() {
  return (
    <>
      <Helmet>
        <title>Luxury Rides in Lagos | MyPal</title>
        <meta name="description" content="Experience luxury rides in Lagos with MyPal. Book premium vehicles for a comfortable and stylish journey. Explore our top-rated luxury ride services now." />
        <link rel="canonical" href="https://www.mypal.ng/mobility/luxuryrides" />
      </Helmet>
      <LuxuryHero />
      <LuxuryLists subcategorySlug="Luxury on Demand" />
      <FooterSection />
    </>
  )
}

export default LuxuryRides