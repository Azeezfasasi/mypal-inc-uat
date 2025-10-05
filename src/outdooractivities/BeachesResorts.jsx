import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BeachesResortsHero from '../assets/components/category-components/outdoor-components/BeachesResortsHero'
import BeachesLists from '../assets/components/category-components/outdoor-components/BeachesLists'
import { Helmet } from 'react-helmet'

function BeachesResorts() {
  return (
    <>
      <Helmet>
        <title>Beaches and Resorts in Lagos | MyPal</title>
        <meta name="description" content="Discover the best beaches and resorts in Lagos with MyPal. Find top-rated locations, read reviews, and plan your perfect getaway." />
        <link rel="canonical" href="https://www.mypal.ng/outdooractivities/beachesresorts" />
      </Helmet>
      <BeachesResortsHero />
      <BeachesLists />
      <FooterSection />
    </>
  )
}

export default BeachesResorts