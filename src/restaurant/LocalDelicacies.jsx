import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BuffetFilter from '../assets/components/category-components/restaurant-components/BuffetFilter'
import BuffetLists from '../assets/components/category-components/restaurant-components/BuffetList'
import DelicaciesHero from '../assets/components/category-components/restaurant-components/DelicaciesHero'

function LocalDelicacies() {
  return (
    <>
      <DelicaciesHero />
      <BuffetFilter />
      <BuffetLists />
      <FooterSection />
    </>
  )
}

export default LocalDelicacies