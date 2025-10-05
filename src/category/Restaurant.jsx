import React from 'react'
import RestaurantHero from '../assets/components/category-components/restaurant-components/RestaurantHero'
import RestaurantCategory from '../assets/components/category-components/restaurant-components/RestaurantCategory'
import FooterSection from '../assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet'

function Restaurant() {
  return (
      <>
      <Helmet>
        <title>Restaurants in Lagos | MyPal</title>
        <meta name="description" content="Discover the best restaurants in Lagos with MyPal. Explore a variety of cuisines, read reviews, and find your next dining experience." />
        <link rel="canonical" href="https://www.mypal.ng/category/restaurants" />
      </Helmet>
      <RestaurantHero />
      <RestaurantCategory />
      <FooterSection />
      </>
  )
}

export default Restaurant