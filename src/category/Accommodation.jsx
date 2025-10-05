import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import AccommodationHero from '../assets/components/category-components/accommodation-component/AccommodationHero'
import AccommodationCategory from '../assets/components/category-components/accommodation-component/AccommodationCategory'
import { Helmet } from 'react-helmet'

function Accommodation() {
  return (
      <>
      <Helmet>
        <title>Accommodation in Lagos | MyPal</title>
        <meta name="description" content="Discover the best accommodation options in Lagos with MyPal. From luxury hotels to budget-friendly stays, find your perfect home away from home." />
        <link rel="canonical" href="https://www.mypal.ng/category/accommodation" />
      </Helmet>
      <AccommodationHero />
      <AccommodationCategory />
      <FooterSection />
      </>
  )
}

export default Accommodation