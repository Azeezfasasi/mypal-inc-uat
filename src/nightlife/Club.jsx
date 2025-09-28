import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ClubList from '../assets/components/category-components/nightlife-components/ClubList'
import ClubHero from '../assets/components/category-components/nightlife-components/ClubHero'

export default function Club() {
  return (
    <>
      <ClubHero />
      <ClubList />
      <FooterSection />
    </>
  )
}
