import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ShortLetList from '../assets/components/category-components/accommodation-component/ShortLetList'
import ShortLetHero from '../assets/components/category-components/accommodation-component/ShortLetHero'
import { Helmet } from 'react-helmet-async'


export default function ShortLets() {
  return (
    <>
      <Helmet>
        <title>Shortlet Home & Beach House | MyPal</title>
        <meta name="description" content="Discover comfortable and affordable shortlet accommodations in Lagos with MyPal. Browse listings, read reviews, and book your stay today." />
        <meta name="keywords" content="MyPal, shortlet accommodations, Lagos, vacation rentals, affordable stays" />
        <link rel="canonical" href="https://www.mypal-inc.com/accommodation/short-lethomes&beachhouses" />
      </Helmet>
      <ShortLetHero />
      <ShortLetList subcategorySlug="Short-let Homes & Beach Houses" />
      <FooterSection />
    </>
  )
}
