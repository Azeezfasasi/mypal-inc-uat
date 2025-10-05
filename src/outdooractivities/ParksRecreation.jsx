import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ParkHero from '../assets/components/category-components/outdoor-components/ParkHero'
import PacksRecreationLists from '../assets/components/category-components/outdoor-components/ParksRecreationLists'
import { Helmet } from 'react-helmet'

function ParksRecreation() {
  return (
    <>
      <Helmet>
        <title>Parks and Recreation in Lagos | MyPal</title>
        <meta name="description" content="Discover the best parks and recreational spots in Lagos with MyPal. Explore beautiful green spaces, enjoy outdoor activities, and find family-friendly locations for relaxation and fun." />
        <link rel="canonical" href="https://www.mypal.ng/outdooractivities/parksrecreation" />
      </Helmet>
      <ParkHero />
      <PacksRecreationLists />
      <FooterSection />
    </>
  )
}

export default ParksRecreation