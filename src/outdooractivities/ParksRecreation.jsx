import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ParkHero from '../assets/components/category-components/outdoor-components/ParkHero'
import PacksRecreationLists from '../assets/components/category-components/outdoor-components/ParksRecreationLists'

function ParksRecreation() {
  return (
    <>
      <ParkHero />
      <PacksRecreationLists />
      <FooterSection />
    </>
  )
}

export default ParksRecreation