import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BeautyHealthHero from '../assets/components/category-components/accommodation-component/BeautyHealthHero'
import BeautyHealthCategory from '../assets/components/category-components/accommodation-component/BeautyHealthCategory'
import { Helmet } from 'react-helmet'

function BeautyHealth() {
  return (
      <>
      <Helmet>
        <title>Beauty and Health Services | MyPal</title>
        <meta name="description" content="Discover top beauty and health services in Lagos with MyPal. From salons to wellness centers, find the best places to pamper yourself." />
        <meta name="keywords" content="MyPal, beauty services, health services, Lagos, salons, wellness centers" />
        <link rel="canonical" href="https://www.mypal-inc.com/category/beauty-health" />
      </Helmet>
      <BeautyHealthHero />
      <BeautyHealthCategory />
      <FooterSection />
      </>
  )
}

export default BeautyHealth