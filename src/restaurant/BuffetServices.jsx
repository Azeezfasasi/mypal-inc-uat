import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BuffetHero from '../assets/components/category-components/restaurant-components/BuffetHero'
import BuffetFilter from '../assets/components/category-components/restaurant-components/BuffetFilter'
import BuffetLists from '../assets/components/category-components/restaurant-components/BuffetList'

function BuffetServices() {
  return (
    <>
      <BuffetHero />
      <BuffetFilter />
      <BuffetLists />
      <FooterSection />
    </>
  )
}

export default BuffetServices