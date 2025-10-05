import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import MainstreamHero from '../assets/components/category-components/restaurant-components/MainStreamHero'
import MainstreamFilter from '../assets/components/category-components/restaurant-components/MainstreamFilter'
import MainstreamLists from '../assets/components/category-components/restaurant-components/MainstreamList'
import { Helmet } from 'react-helmet'

export default function MainStream() {
  return (
    <>
      <Helmet>
        <title>Mainstream Restaurants in Lagos | MyPal</title>
        <meta name="description" content="Discover the best mainstream restaurants in Lagos with MyPal. Browse reviews, menus, and make reservations at top dining spots." />
        <link rel="canonical" href="https://www.mypal.ng/restaurant/mainstream" />
      </Helmet>
      <MainstreamHero />
      <MainstreamFilter />
      <MainstreamLists />
      <FooterSection />
    </>
  )
}
