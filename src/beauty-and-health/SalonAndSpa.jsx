import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import SalonAndSpaHero from '../assets/components/category-components/salon-and-spa-component/SalonAndSpaHero'
import SalonList from '../assets/components/category-components/salon-and-spa-component/SalonList'
import { Helmet } from 'react-helmet'

export default function SalonAndSpa() {
  return (
    <>
      <Helmet>
        <title>Spa and Skin Care | MyPal</title>
        <meta name="description" content="Discover top-rated salon and spa services in Lagos with MyPal. Book appointments, read reviews, and pamper yourself with the best beauty and wellness experiences." />
        <meta name="keywords" content="MyPal, salon services, spa services, Lagos, beauty, wellness" />
        <link rel="canonical" href="https://www.mypal-inc.com/beautyhealth/spa&skincare" />
      </Helmet>
      <SalonAndSpaHero />
      <SalonList />
      <FooterSection />
    </>
  )
}
