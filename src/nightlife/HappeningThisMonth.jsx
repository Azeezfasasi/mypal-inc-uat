import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import HappeningHero from '../assets/components/category-components/nightlife-components/HappeningHero'
import HappeningList from '../assets/components/category-components/nightlife-components/HappeningList'

export default function HappeningThisMonth() {
  return (
    <>
      <HappeningHero />
      <HappeningList />
      <FooterSection />
    </>
  )
}
