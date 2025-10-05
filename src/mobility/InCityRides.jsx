import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import InCityHero from '../assets/components/category-components/mobility-components/InCityHero'
import InCityLists from '../assets/components/category-components/mobility-components/InCityLists'
import { Helmet } from 'react-helmet'

function InCityRides() {
  return (
    <>
      <Helmet>
        <title>In-City Rides in Lagos | MyPal</title>
        <meta name="description" content="Experience seamless in-city rides in Lagos with MyPal. Book reliable transportation services, read reviews, and explore your city with ease." />
        <link rel="canonical" href="https://www.mypal.ng/mobility/incityrides" />
      </Helmet>
      <InCityHero />
      <InCityLists />
      <FooterSection />
    </>
  )
}

export default InCityRides