import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BuffetHero from '../assets/components/category-components/restaurant-components/BuffetHero'
import BuffetLists from '../assets/components/category-components/restaurant-components/BuffetList'
import { Helmet } from 'react-helmet'

function BuffetServices() {
  return (
    <>
      <Helmet>
        <title>Buffet Services | MyPal</title>
        <meta name="description" content="Discover top buffet services in Lagos with MyPal. Explore a variety of cuisines, read reviews, and book your next buffet experience with ease." />
        <meta name="keywords" content="MyPal, buffet services, Lagos, dining, food, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/buffetservices" />
      </Helmet>
      <BuffetHero />
      <BuffetLists subcategorySlug="Buffet services" />
      <FooterSection />
    </>
  )
}

export default BuffetServices