import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import MobilityHero from '../assets/components/category-components/mobility-components/MobilityHero'
import MobilityCategory from '../assets/components/category-components/mobility-components/MobilityCategory'
import { Helmet } from 'react-helmet'

function Mobility() {
  return (
      <>
      <Helmet>
        <title>Mobility Services | MyPal</title>
        <meta name="description" content="Explore a wide range of mobility services including in-city rides, luxury rides, and household logistics. Find the perfect transportation solution for your needs with MyPal." />
        <meta name="keywords" content="Mobility services, In-city rides, Luxury rides, Household logistics, Transportation solutions, Car rentals, Ride-sharing, Moving services, Delivery services, MyPal mobility" />
        <link rel="canonical" href="https://www.mypal-inc.com/category/mobility" />
      </Helmet>
      <MobilityHero />
      <MobilityCategory />
      <FooterSection />
      </>
  )
}

export default Mobility