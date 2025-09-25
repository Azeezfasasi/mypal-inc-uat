import React from 'react'
import HeroSection from './assets/components/home-components/HeroSection'
import ExploreCategory from './assets/components/home-components/ExploreCategory'
import FeaturedExperiences from './assets/components/home-components/FeaturedExperiences'
import Faq from './assets/components/home-components/Faq'
import FooterSection from './assets/components/home-components/FooterSection'
// import { Helmet } from 'react-helmet'

function Home() {
  return (
    <>
      {/* <Helmet>
        <title>MyPal - Home</title>
      </Helmet> */}
      <HeroSection />
      <ExploreCategory />
      <FeaturedExperiences />
      <Faq />
      <FooterSection />
    </>
  )
}

export default Home

