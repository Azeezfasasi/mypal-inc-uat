import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import MainstreamHero from '../assets/components/category-components/restaurant-components/MainStreamHero'
import MainstreamFilter from '../assets/components/category-components/restaurant-components/MainstreamFilter'
import MainstreamLists from '../assets/components/category-components/restaurant-components/MainstreamList'

export default function MainStream() {
  return (
    <>
      <MainstreamHero />
      <MainstreamFilter />
      <MainstreamLists />
      <FooterSection />
    </>
  )
}
