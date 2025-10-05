import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ShortLetList from '../assets/components/category-components/accommodation-component/ShortLetList'
import ShortLetHero from '../assets/components/category-components/accommodation-component/ShortLetHero'
import { Helmet } from 'react-helmet'


export default function ShortLets() {
  return (
    <>
      <Helmet>
        <title>Shortlet Accommodations in Lagos | MyPal</title>
        <meta name="description" content="Discover comfortable and affordable shortlet accommodations in Lagos with MyPal. Browse listings, read reviews, and book your stay today." />
        <link rel="canonical" href="https://www.mypal.ng/accommodation/shortlets" />
      </Helmet>
      <ShortLetHero />
      <ShortLetList />
      <FooterSection />
    </>
  )
}
