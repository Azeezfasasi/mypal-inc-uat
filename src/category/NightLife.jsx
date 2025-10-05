import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import NightLifeHero from '../assets/components/category-components/accommodation-component/NightLifeHero'
import NightLifeCategory from '../assets/components/category-components/accommodation-component/NightlifeCategory'
import { Helmet } from 'react-helmet'

function NightLife() {
  return (
      <>
      <Helmet>
        <title>Nightlife in Lagos | MyPal</title>
        <meta name="description" content="Discover the vibrant nightlife in Lagos with MyPal. Explore top clubs, bars, and lounges, read reviews, and find the best spots to enjoy your night out." />
        <link rel="canonical" href="https://www.mypal.ng/category/nightlife" />
      </Helmet>
      <NightLifeHero />
      <NightLifeCategory />
      <FooterSection />
      </>
  )
}

export default NightLife