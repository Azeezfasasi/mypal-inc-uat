import React from 'react'
import FineDiningHero from '../assets/components/category-components/restaurant-components/FineDiningHero'
import FineDiningFilter from '../assets/components/category-components/restaurant-components/FineDiningFilter'
import FooterSection from '../assets/components/home-components/FooterSection'
import FineDiningLists from '../assets/components/category-components/restaurant-components/FineDiningLists'
// import { useState } from 'react'
import { Helmet } from 'react-helmet'

function FineDining() {
  // const [filter, setFilter] = useState('All');

  return (
    <>
      <Helmet>
        <title>Fine Dining Restaurants in Lagos | MyPal</title>
        <meta name="description" content="Indulge in the finest dining experiences in Lagos with MyPal. Explore top-rated restaurants, read reviews, and make reservations effortlessly." />
        <link rel="canonical" href="https://www.mypal.ng/restaurant/finedining" />
      </Helmet>
      <FineDiningHero />
      {/* <FineDiningFilter selectedFilter={filter} onChange={setFilter} /> */}
      <FineDiningLists />
      <FooterSection />
    </>
  )
}

export default FineDining