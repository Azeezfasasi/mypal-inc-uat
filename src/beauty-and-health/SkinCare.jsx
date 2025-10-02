import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import SalonList from '../assets/components/category-components/salon-and-spa-component/SalonList'
import SkincareHero from '../assets/components/category-components/salon-and-spa-component/SkinCareHero'

export default function SkinCare() {
  return (
    <>
      <SkincareHero />
      <SalonList />
      <FooterSection />
    </>
  )
}
