import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import NailsAndHaircareHero from '../assets/components/category-components/salon-and-spa-component/NailsAndHaircareHero'
import NailsAndHaircareList from '../assets/components/category-components/salon-and-spa-component/NailsAndHaircareList'
import { Helmet } from 'react-helmet-async'

export default function NailsAndHairCare() {
  return (
    <>
      <Helmet>
        <title>Nails and Hair Care Services | MyPal</title>
        <meta name="description" content="Discover top-rated nails and hair care services in Lagos with MyPal. Browse reviews, view portfolios, and book your next beauty appointment with ease." />
        <meta name="keywords" content="MyPal, nails, hair care, Lagos, beauty services" />
        <link rel="canonical" href="https://www.mypal-inc.com/beautyhealth/nail&haircare" />
      </Helmet>
      <NailsAndHaircareHero />
      <NailsAndHaircareList subcategorySlug="Nail & Hair Care" />
      <FooterSection />
    </>
  )
}
