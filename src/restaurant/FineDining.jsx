import React from 'react'
import FineDiningHero from '../assets/components/category-components/restaurant-components/FineDiningHero'
import FooterSection from '../assets/components/home-components/FooterSection'
import FineDiningLists from '../assets/components/category-components/restaurant-components/FineDiningLists'
// import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

function FineDining() {
  // const [filter, setFilter] = useState('All');

  return (
    <>
      <Helmet>
        <title>Fine Dining Restaurants | MyPal</title>
        <meta name="description" content="Indulge in the finest dining experiences in Lagos with MyPal. Explore top-rated restaurants, read reviews, and make reservations effortlessly." />
        <meta name="keywords" content="MyPal, fine dining, restaurants, Lagos, dining, food, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/finedining" />
      </Helmet>
      <FineDiningHero />
      <FineDiningLists subcategorySlug="Fine Dining" />
      <FooterSection />
    </>
  )
}

export default FineDining