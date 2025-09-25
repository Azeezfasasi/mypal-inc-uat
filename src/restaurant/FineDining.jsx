import React from 'react'
import FineDiningHero from '../assets/components/category-components/restaurant-components/FineDiningHero'
import FineDiningFilter from '../assets/components/category-components/restaurant-components/FineDiningFilter'
import FooterSection from '../assets/components/home-components/FooterSection'
import FineDiningLists from '../assets/components/category-components/restaurant-components/FineDiningLists'

function FineDining() {
  return (
    <>
      <FineDiningHero />
      <FineDiningFilter />
      <FineDiningLists />
      <FooterSection />
    </>
  )
}

export default FineDining