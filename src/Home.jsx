import React from 'react'
import HeroSection from './assets/components/home-components/HeroSection'
import ExploreCategory from './assets/components/home-components/ExploreCategory'
import FeaturedExperiences from './assets/components/home-components/FeaturedExperiences'
import Faq from './assets/components/home-components/Faq'
import FooterSection from './assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet'

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | MyPal</title>
        <meta name="description" content="Discover the best local services and experiences with MyPal. From dining and nightlife to outdoor activities and beauty, find it all in one place." />
        <meta name="keywords" content="MyPal, local services, experiences, dining, nightlife, outdoor activities, beauty, health, accommodation, mobility" />
        <meta name="author" content="MyPal" />
      </Helmet>
      <HeroSection />
      <ExploreCategory />
      <FeaturedExperiences />
      <Faq />
      <FooterSection />
    </>
  )
}

export default Home

