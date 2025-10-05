import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ClubList from '../assets/components/category-components/nightlife-components/ClubList'
import ClubHero from '../assets/components/category-components/nightlife-components/ClubHero'
import { Helmet } from 'react-helmet'

export default function Club() {
  return (
    <>
      <Helmet>
        <title>Clubs in Lagos | MyPal</title>
        <meta name="description" content="Discover the best clubs in Lagos with MyPal. Explore top nightlife spots, read reviews, and find your perfect party destination." />
        <link rel="canonical" href="https://www.mypal.ng/nightlife/club" />
      </Helmet>
      <ClubHero />
      <ClubList />
      <FooterSection />
    </>
  )
}
