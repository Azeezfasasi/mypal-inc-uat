import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ParkHero from '../assets/components/category-components/outdoor-components/ParkHero'
import PacksRecreationLists from '../assets/components/category-components/outdoor-components/ParksRecreationLists'
import { Helmet } from 'react-helmet-async'

function ParksRecreation() {
  return (
    <>
      <Helmet>
        <title>Parks and Recreation | MyPal</title>
        <meta name="description" content="Discover the best parks and recreational spots in Lagos with MyPal. Explore beautiful green spaces, enjoy outdoor activities, and find family-friendly locations for relaxation and fun." />
        <meta name="keywords" content="MyPal, parks and recreation, Lagos, outdoor activities, family-friendly, green spaces" />
        <link rel="canonical" href="https://www.mypal-inc.com/outdooractivities/parks&recreation" />
      </Helmet>
      <ParkHero />
      <PacksRecreationLists subcategorySlug="Parks & Recreation" />
      <FooterSection />
    </>
  )
}

export default ParksRecreation