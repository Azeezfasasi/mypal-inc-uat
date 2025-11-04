import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import FoodAndDrinkList from '../assets/components/category-components/nightlife-components/FoodAndDrinkList'
import BarsAndLaungesHero from '../assets/components/category-components/nightlife-components/BarsAndLaungesHero'
import BarsAndLoungesList from '../assets/components/category-components/nightlife-components/BarsAndLoungesList'
import { Helmet } from 'react-helmet'

export default function BarsAndLaunge() {
  return (
    <>
      <Helmet>
        <title>Bars and Lounges in Lagos | MyPal</title>
        <meta name="description" content="Discover the best bars and lounges in Lagos with MyPal. Explore top-rated venues, read reviews, and find your perfect spot for a night out." />
        <meta name="keywords" content="MyPal, bars, lounges, Lagos, nightlife" />
        <link rel="canonical" href="https://www.mypal-inc.com/nightlife/bars&lounges" />
      </Helmet>
      <BarsAndLaungesHero />
      <BarsAndLoungesList subcategorySlug="Bars & Lounges" />
      <FooterSection />
    </>
  )
}
