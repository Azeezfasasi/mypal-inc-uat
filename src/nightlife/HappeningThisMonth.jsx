import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import HappeningHero from '../assets/components/category-components/nightlife-components/HappeningHero'
import HappeningList from '../assets/components/category-components/nightlife-components/HappeningList'
import { Helmet } from 'react-helmet'

export default function HappeningThisMonth() {
  return (
    <>
      <Helmet>
        <title>Happening This Month in Lagos | MyPal</title>
        <meta name="description" content="Discover the most exciting events and happenings in Lagos this month with MyPal. Stay updated on concerts, festivals, and more." />
        <link rel="canonical" href="https://www.mypal.ng/nightlife/happeningthismonth" />
      </Helmet>
      <HappeningHero />
      <HappeningList subcategorySlug="Happening this month" />
      <FooterSection />
    </>
  )
}
