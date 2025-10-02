import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import FoodAndDrinkList from '../assets/components/category-components/nightlife-components/FoodAndDrinkList'
import BarsAndLaungesHero from '../assets/components/category-components/nightlife-components/BarsAndLaungesHero'
import BarsAndLoungesList from '../assets/components/category-components/nightlife-components/BarsAndLoungesList'

export default function BarsAndLaunge() {
  return (
    <>
      <BarsAndLaungesHero />
      <BarsAndLoungesList/>
      <FooterSection />
    </>
  )
}
