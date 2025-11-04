import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import OutdoorHero from '../assets/components/category-components/outdoor-components/OutdoorHero'
import OutdoorCategory from '../assets/components/category-components/outdoor-components/OutdoorCategory'
import { Helmet } from 'react-helmet'

function OutdoorActivities() {
  return (
      <>
      <Helmet>
        <title>Outdoor Activities | MyPal</title>
        <meta name="description" content="Discover exciting outdoor activities in Lagos with MyPal. Explore parks, beaches, and recreational spots for unforgettable experiences." />
        <meta name="keywords" content="outdoor activities, Lagos, MyPal, parks, beaches, recreational spots" />
        <link rel="canonical" href="https://www.mypal-inc.com/category/outdoor-activities" />
      </Helmet>
      <OutdoorHero />
      <OutdoorCategory />
      <FooterSection />
      </>
  )
}

export default OutdoorActivities