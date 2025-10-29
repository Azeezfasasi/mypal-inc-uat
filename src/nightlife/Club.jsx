import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ClubList from '../assets/components/category-components/nightlife-components/ClubList'
import ClubHero from '../assets/components/category-components/nightlife-components/ClubHero'
import { Helmet } from 'react-helmet-async'

export default function Club() {
  return (
    <>
      <Helmet>
        <title>Clubbing and Parties | MyPal</title>
        <meta name="description" content="Discover the best clubs in Lagos with MyPal. Explore top nightlife spots, read reviews, and find your perfect party destination." />
        <meta name="keywords" content="MyPal, clubs, nightlife, Lagos, party, entertainment" />
        <link rel="canonical" href="https://www.mypal-inc.com/nightlife/clubbing&parties" />
      </Helmet>
      <ClubHero />
      <ClubList subcategorySlug="Club" />
      <FooterSection />
    </>
  )
}
