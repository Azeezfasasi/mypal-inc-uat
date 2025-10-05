import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import SalonAndSpaHero from '../assets/components/category-components/salon-and-spa-component/SalonAndSpaHero'
import SalonList from '../assets/components/category-components/salon-and-spa-component/SalonList'
import { Helmet } from 'react-helmet'

export default function SalonAndSpa() {
  return (
    <>
      <Helmet>
        <title>Salon and Spa Services in Lagos | MyPal</title>
        <meta name="description" content="Discover top-rated salon and spa services in Lagos with MyPal. Book appointments, read reviews, and pamper yourself with the best beauty and wellness experiences." />
        <link rel="canonical" href="https://www.mypal.ng/beauty-and-health/salon-and-spa" />
      </Helmet>
      <SalonAndSpaHero />
      <SalonList />
      <FooterSection />
    </>
  )
}
