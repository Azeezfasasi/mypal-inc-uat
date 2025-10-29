import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import InCityHero from '../assets/components/category-components/mobility-components/InCityHero'
import InCityLists from '../assets/components/category-components/mobility-components/InCityLists'
import { Helmet } from 'react-helmet-async'

function InCityRides() {
  return (
    <>
      <Helmet>
        <title>In-City Rides | MyPal</title>
        <meta name="description" content="Experience seamless in-city rides in Lagos with MyPal. Book reliable transportation services, read reviews, and explore your city with ease." />
        <meta name="keywords" content="MyPal, in-city rides, Lagos, transportation, bus, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/mobility/in-cityrides" />
      </Helmet>
      <InCityHero />
      <InCityLists subcategorySlug="In-City Rides" />
      <FooterSection />
    </>
  )
}

export default InCityRides