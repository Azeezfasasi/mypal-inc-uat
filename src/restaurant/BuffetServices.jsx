import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BuffetHero from '../assets/components/category-components/restaurant-components/BuffetHero'
import BuffetFilter from '../assets/components/category-components/restaurant-components/BuffetFilter'
import BuffetLists from '../assets/components/category-components/restaurant-components/BuffetList'
import { Helmet } from 'react-helmet'

function BuffetServices() {
  return (
    <>
      <Helmet>
        <title>Buffet Services in Lagos | MyPal</title>
        <meta name="description" content="Discover top buffet services in Lagos with MyPal. Explore a variety of cuisines, read reviews, and book your next buffet experience with ease." />
        <link rel="canonical" href="https://www.mypal.ng/restaurant/buffetservices" />
      </Helmet>
      <BuffetHero />
      <BuffetFilter />
      <BuffetLists />
      <FooterSection />
    </>
  )
}

export default BuffetServices