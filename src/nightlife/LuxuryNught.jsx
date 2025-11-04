import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import LuxuryNightHero from '../assets/components/category-components/nightlife-components/LuxuryNightHero'
import LuxuryNightList from '../assets/components/category-components/nightlife-components/LuxuryNightList'
import { Helmet } from 'react-helmet'

export default function LuxuryNight() {
  return (
    <>
      <Helmet>
        <title>Luxury Nightlife Experiences | MyPal</title>
        <meta name="description" content="Experience the best of Lagos nightlife with MyPal. Discover luxury clubs, bars, and events for an unforgettable night out." />
        <meta name="keywords" content="MyPal, luxury nightlife, Lagos, clubs, bars, events" />
        <link rel="canonical" href="https://www.mypal-inc.com/nightlife/luxurynightlife" />
      </Helmet>
      <LuxuryNightHero />
      <LuxuryNightList subcategorySlug="Luxury Nightlife" />
      <FooterSection />
    </>
  )
}
